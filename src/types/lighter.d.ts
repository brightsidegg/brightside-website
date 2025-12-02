// Type declarations for Lighter WASM functions
// These functions are injected globally by the WASM module

declare global {
  // Go runtime for WASM
  class Go {
    importObject: WebAssembly.Imports;
    run(instance: WebAssembly.Instance): Promise<void>;
  }

  // WASM-generated functions
  function GenerateAPIKey(seed: string): {
    str: string;
    privateKey: string;
    publicKey: string;
    err?: string;
  };

  function CreateClient(
    url: string,
    privateKey: string,
    chainId: number,
    apiKeyIndex: number,
    accountIndex: number
  ): { err?: string };

  function CheckClient(
    apiKeyIndex: number,
    accountIndex: number
  ): { err?: string };

  function SignChangePubKey(
    pubKey: string,
    nonce: number
  ): {
    str: string;
    err?: string;
  };

  function CreateAuthToken(deadline: number): {
    str: string;
    err?: string;
  };

  function SignCreateOrder(
    marketIndex: number,
    clientOrderIndex: number,
    baseAmount: number,
    price: number,
    isAsk: number,
    orderType: number,
    timeInForce: number,
    reduceOnly: number,
    triggerPrice: number,
    orderExpiry: number,
    nonce: number
  ): { str: string; err?: string };

  function SignCancelOrder(
    marketIndex: number,
    index: number,
    nonce: number
  ): { str: string; err?: string };

  function SignWithdraw(
    usdcAmount: number,
    nonce: number
  ): { str: string; err?: string };
}

export {};

