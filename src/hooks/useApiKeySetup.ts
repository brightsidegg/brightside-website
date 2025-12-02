/**
 * Lighter Account Hook
 * Checks for Lighter account and generates API keys
 */

import { useState, useCallback } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { wasmLoader } from '@/services/wasmLoader';
import { lighterApi } from '@/services/lighterApi';
import type { LighterCredentials } from '@/utils/encryption';

interface UseApiKeySetupReturn {
  // Account status
  isChecking: boolean;
  hasAccount: boolean;
  accountIndex: number | null;
  
  // Key generation
  isGenerating: boolean;
  credentials: LighterCredentials | null;
  
  // Actions
  checkAccount: () => Promise<void>;
  generateApiKey: () => Promise<void>;
  
  // Error
  error: string | null;
}

export function useApiKeySetup(): UseApiKeySetupReturn {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  
  const [isChecking, setIsChecking] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);
  const [accountIndex, setAccountIndex] = useState<number | null>(null);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [credentials, setCredentials] = useState<LighterCredentials | null>(null);
  
  const [error, setError] = useState<string | null>(null);

  // Check if user has a Lighter account
  const checkAccount = useCallback(async () => {
    if (!isConnected || !address) {
      setError('Wallet not connected');
      return;
    }

    try {
      setIsChecking(true);
      setError(null);
      
      console.log('🔍 Checking for Lighter account...');
      console.log('📍 L1 Address:', address);

      const accountsResponse = await lighterApi.getAccountPositions(address);
      
      if (accountsResponse.success && accountsResponse.data && accountsResponse.data.length > 0) {
        const account = accountsResponse.data[0];
        setAccountIndex(account.index);
        setHasAccount(true);
        console.log('✅ Lighter account found with index:', account.index);
      } else {
        setAccountIndex(null);
        setHasAccount(false);
        console.log('❌ No Lighter account found');
        setError('No Lighter account found. Please deposit to perps first.');
      }
    } catch (err: any) {
      console.error('❌ Failed to check account:', err);
      setError(err.message || 'Failed to check account');
      setHasAccount(false);
      setAccountIndex(null);
    } finally {
      setIsChecking(false);
    }
  }, [isConnected, address]);

  // Generate API key for existing account
  const generateApiKey = useCallback(async () => {
    if (!isConnected || !address) {
      setError('Wallet not connected');
      return;
    }

    if (!hasAccount || accountIndex === null) {
      setError('No Lighter account found');
      return;
    }

    try {
      setIsGenerating(true);
      setError(null);
      
      console.log('🔐 Starting API key generation...');

      // 1. Initialize WASM
      console.log('⏳ Initializing WASM module...');
      await wasmLoader.initialize();
      console.log('✅ WASM module ready');

      // 2. Generate temporary dummy private key
      const dummyPrivateKey = '0'.repeat(80);
      const apiKeyIndex = 2;
      const chainId = 304;

      console.log('🔧 Creating initial client...');
      wasmLoader.createClient(
        'https://mainnet.zklighter.elliot.ai',
        dummyPrivateKey,
        chainId,
        apiKeyIndex,
        accountIndex
      );

      // 3. Generate API key pair
      console.log('🔑 Generating API key pair...');
      const apiKeyPair = wasmLoader.generateAPIKey();
      console.log('✅ API key pair generated');

      // 4. Get next nonce
      console.log('🔢 Fetching next nonce...');
      const nonceResponse = await lighterApi.getNextNonce(accountIndex, apiKeyIndex);
      if (!nonceResponse.success || nonceResponse.data === undefined) {
        throw new Error(nonceResponse.error || 'Failed to get nonce');
      }
      const nonce = nonceResponse.data;

      // 5. Reinitialize client with actual API key
      console.log('🔄 Reinitializing client with actual API key...');
      wasmLoader.createClient(
        'https://mainnet.zklighter.elliot.ai',
        apiKeyPair.privateKey,
        chainId,
        apiKeyIndex,
        accountIndex
      );

      // 6. Sign the change API key transaction with WASM
      console.log('✍️ Signing change API key transaction...');
      const wasmSignature = wasmLoader.signChangePubKey(apiKeyPair.publicKey, nonce);

      if (wasmSignature.err) {
        throw new Error(`WASM signing failed: ${wasmSignature.err}`);
      }

      if (!wasmSignature.str) {
        throw new Error('No transaction data returned from WASM');
      }

      const txData = JSON.parse(wasmSignature.str);

      if (!txData.MessageToSign) {
        throw new Error('MessageToSign not found in transaction data');
      }

      const messageToSign = txData.MessageToSign;

      // 7. Sign with wallet (L1 signature)
      console.log('✍️ Signing message with wallet...');
      const l1Signature = await signMessageAsync({ message: messageToSign });

      // 8. Create full transaction payload
      const changeTxPayload: any = { ...txData };
      delete changeTxPayload.MessageToSign;
      changeTxPayload.L1Sig = l1Signature;

      // 9. Send transaction to Lighter API
      console.log('📤 Sending transaction to Lighter API...');
      const txType = 8;
      const txInfo = JSON.stringify(changeTxPayload);
      const sendTxResponse = await lighterApi.sendTx(txType, txInfo);

      if (!sendTxResponse.success) {
        throw new Error(sendTxResponse.error || 'Failed to send transaction');
      }

      console.log('✅ Transaction sent successfully');

      // 10. Create credentials object (NOT saving to localStorage)
      const creds: LighterCredentials = {
        apiKey: apiKeyPair.publicKey,
        apiSecret: apiKeyPair.privateKey,
        accountIndex: accountIndex.toString(),
        apiKeyIndex: apiKeyIndex.toString(),
        l1Address: address,
      };

      setCredentials(creds);
      console.log('🎉 API key generation complete!');
    } catch (err: any) {
      console.error('❌ API key generation failed:', err);
      setError(err.message || 'Failed to generate API key');
    } finally {
      setIsGenerating(false);
    }
  }, [isConnected, address, hasAccount, accountIndex, signMessageAsync]);

  return {
    isChecking,
    hasAccount,
    accountIndex,
    isGenerating,
    credentials,
    checkAccount,
    generateApiKey,
    error,
  };
}

