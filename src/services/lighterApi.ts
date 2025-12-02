/**
 * Lighter API Client
 * Handles communication with Lighter backend
 */

const LIGHTER_API_BASE = 'https://mainnet.zklighter.elliot.ai';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

class LighterApiClient {
  private static instance: LighterApiClient;

  private constructor() {}

  static getInstance(): LighterApiClient {
    if (!LighterApiClient.instance) {
      LighterApiClient.instance = new LighterApiClient();
    }
    return LighterApiClient.instance;
  }

  async getAccountPositions(l1Address: string): Promise<ApiResponse> {
    try {
      const response = await fetch(
        `${LIGHTER_API_BASE}/api/v1/accountsByL1Address?l1_address=${l1Address}`
      );
      
      if (!response.ok) {
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`
        };
      }

      const data = await response.json();
      // API returns { code, l1_address, sub_accounts }
      return {
        success: true,
        data: data.sub_accounts || []
      };
    } catch (error: any) {
      console.error('Failed to get account positions:', error);
      return {
        success: false,
        error: error.message || 'Failed to get account positions'
      };
    }
  }

  async getNextNonce(accountIndex: number, apiKeyIndex: number): Promise<ApiResponse<number>> {
    try {
      const response = await fetch(
        `${LIGHTER_API_BASE}/api/v1/nextNonce?account_index=${accountIndex}&api_key_index=${apiKeyIndex}`
      );
      
      if (!response.ok) {
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`
        };
      }

      const data = await response.json();
      return {
        success: true,
        data: data.nonce
      };
    } catch (error: any) {
      console.error('Failed to get nonce:', error);
      return {
        success: false,
        error: error.message || 'Failed to get nonce'
      };
    }
  }

  async sendTx(txType: number, txInfo: string): Promise<ApiResponse> {
    try {
      // Use FormData as per the React Native implementation
      const formData = new FormData();
      formData.append('tx_type', txType.toString());
      formData.append('tx_info', txInfo);
      formData.append('price_protection', 'false');

      // Note: sendTx explicitly uses /api/v1 path
      const response = await fetch(`${LIGHTER_API_BASE}/api/v1/sendTx`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });
      
      const data = await response.json();

      // Check for error code in response (even if status is 200)
      if (!response.ok || (data.code && data.code !== 200 && data.code < 30000)) {
        return {
          success: false,
          error: data.error || data.message || `HTTP ${response.status}: ${response.statusText}`
        };
      }

      return {
        success: true,
        data: data
      };
    } catch (error: any) {
      console.error('Failed to send transaction:', error);
      return {
        success: false,
        error: error.message || 'Failed to send transaction'
      };
    }
  }
}

export const lighterApi = LighterApiClient.getInstance();

