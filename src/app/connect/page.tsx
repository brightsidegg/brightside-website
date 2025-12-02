'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useAccount } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';
import { useApiKeySetup } from '@/hooks/useApiKeySetup';
import { useEffect, useState } from 'react';
import { encryptCredentials } from '@/utils/encryption';
import QRCode from 'qrcode';
import { Toaster, toast } from 'sonner';
import { Copy } from 'lucide-react';
import localFont from 'next/font/local';

const doodleFont = localFont({
  src: '../../font/Your Doodle Font.otf',
  display: 'swap',
});

export default function ConnectPage() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  
  const {
    isChecking,
    hasAccount,
    accountIndex,
    isGenerating,
    credentials,
    checkAccount,
    generateApiKey,
    error: lighterError
  } = useApiKeySetup();

  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [hasChecked, setHasChecked] = useState(false);
  const [encryptedData, setEncryptedData] = useState<string>('');

  // Auto-check account when wallet connects (only once)
  useEffect(() => {
    if (isConnected && address && !hasChecked && !isChecking) {
      setHasChecked(true);
      checkAccount();
    }
  }, [isConnected, address, hasChecked, isChecking, checkAccount]);

  // Reset check flag when wallet disconnects
  useEffect(() => {
    if (!isConnected) {
      setHasChecked(false);
    }
  }, [isConnected]);

  // Show error toasts
  useEffect(() => {
    if (lighterError) {
      toast.error(lighterError);
    }
  }, [lighterError]);

  // Generate QR code when credentials are available
  useEffect(() => {
    if (credentials) {
      const encrypted = encryptCredentials(credentials);
      setEncryptedData(encrypted);
      
      // Generate simple QR code without logo
      QRCode.toDataURL(encrypted, {
        width: 300,
        margin: 2,
        errorCorrectionLevel: 'M',
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
        .then((qrDataUrl) => {
          setQrCodeUrl(qrDataUrl);
        })
        .catch((err: Error) => {
          console.error('Failed to generate QR code:', err);
          toast.error('Failed to generate QR code');
        });
    } else {
      setQrCodeUrl('');
      setEncryptedData('');
    }
  }, [credentials]);

  const handleCopyQR = async () => {
    try {
      await navigator.clipboard.writeText(encryptedData);
      toast.success('QR Code copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1D2532] flex flex-col">
      <Toaster position="top-center" richColors />
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-lg w-full text-center">
          {/* Logos Section - Side by Side */}
          <div className="flex justify-center items-center gap-4 mb-8">
            {/* Brightside Logo */}
            <div className="flex items-center gap-2">
              <Image
                src="/brightSide_logo.png"
                alt="Brightside"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className={`text-[36px] text-[#fa5908] uppercase tracking-tight leading-[52px] ${doodleFont.className}`}>
                BRiGHTSiDE
              </span>
            </div>

            {/* Dots Separator */}
            <div className="flex gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
            </div>

            {/* Lighter Logo */}
            <div className="flex items-center gap-2">
              <Image
                src="/lighter.png"
                alt="Lighter"
                width={30}
                height={60}
                className="w-5 h-10"
              />
              <span className="text-2xl font-medium text-[#FF6401] font-sf-pro-rounded">
                Lighter
              </span>
            </div>
          </div>

          {/* Content based on state */}
          <div className="space-y-6">
            {/* Step 1: Not connected */}
            {!isConnected && (
              <>
                <h1 className="text-2xl font-sf-pro-rounded font-medium text-[#222222] mb-3 tracking-[-0.02em]">
                  Connect your Lighter Wallet
                </h1>
                <p className="text-base text-[#666666] font-sf-pro-rounded max-w-sm mx-auto mb-6 leading-relaxed">
                  If your wallet is already on Lighter, you can bring it into Brightside with just one tap.
                </p>
                <button
                  onClick={() => open()}
                  className="bg-[#16c75a] hover:bg-[#14b350] text-white font-sf-pro-rounded font-semibold text-lg px-20 py-4 rounded-full transition-all duration-200"
                >
                  Connect wallet
                </button>
              </>
            )}

            {/* Step 2: Connected but checking/generating */}
            {isConnected && !credentials && (
              <>
                <h1 className="text-2xl font-sf-pro-rounded font-medium text-[#222222] mb-3 tracking-[-0.02em]">
                  Sign the Message
                </h1>
                <p className="text-base text-[#666666] font-sf-pro-rounded max-w-sm mx-auto mb-6 leading-relaxed">
                  If your wallet is already on Lighter, you can bring it into Brightside with just one tap.
                </p>

                {isChecking ? (
                  <div className="flex items-center justify-center gap-3 py-4">
                    <div className="w-5 h-5 border-2 border-[#16c75a] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-[#666666] font-sf-pro-rounded">
                      Checking for Lighter account...
                    </p>
                  </div>
                ) : hasAccount ? (
                  <button
                    onClick={generateApiKey}
                    disabled={isGenerating}
                    className="bg-[#16c75a] hover:bg-[#14b350] text-white font-sf-pro-rounded font-semibold text-lg px-20 py-4 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mx-auto"
                  >
                    {isGenerating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Signing...</span>
                      </>
                    ) : (
                      'Approve Brightside'
                    )}
                  </button>
                ) : lighterError ? (
                  <div className="bg-red-50 border border-red-200 rounded-2xl px-6 py-4 max-w-md mx-auto">
                    <p className="text-sm text-red-600 font-sf-pro-rounded font-medium mb-1">
                      No Lighter Account Found
                    </p>
                    <p className="text-xs text-red-500 font-sf-pro-rounded">
                      Please deposit to Lighter perps first to create your account.
                    </p>
                  </div>
                ) : null}
              </>
            )}

            {/* Step 3: QR Code Generated */}
            {credentials && qrCodeUrl && (
              <>
                {/* QR Code Display */}
                <div className="flex justify-center mb-6">
                  <div className="bg-white p-4">
                    <img src={qrCodeUrl} alt="QR Code" className="w-60 h-60" />
                  </div>
                </div>

                <h1 className="text-2xl font-sf-pro-rounded font-medium text-[#222222] mb-3 tracking-[-0.02em]">
                  Scan the QR on your brightside
                </h1>
                <p className="text-base text-[#666666] font-sf-pro-rounded max-w-sm mx-auto mb-6 leading-relaxed">
                  If your wallet is already on Lighter, you can bring it into Brightside with just one tap.
                </p>

                {/* Copy QR Code Button */}
                <button
                  onClick={handleCopyQR}
                  className="bg-[#16c75a] hover:bg-[#14b350] text-white font-sf-pro-rounded font-semibold text-lg px-16 py-4 rounded-full transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
                >
                  <Copy className="w-[18px] h-[18px]" />
                  Copy QR Code
                </button>
              </>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

