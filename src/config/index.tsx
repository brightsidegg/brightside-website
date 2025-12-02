import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum } from '@reown/appkit/networks'
import type { AppKitNetwork } from '@reown/appkit/networks'
// Get projectId from https://dashboard.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "42e31b2c5cf665df2286228248f3e7cf" // this is a public projectId only to use on localhost

if (!projectId) {
    throw new Error('Project ID is not defined')
  }
  
  export const networks = [mainnet, arbitrum] as [AppKitNetwork, ...AppKitNetwork[]]
  
  //Set up the Wagmi Adapter (Config)
  export const wagmiAdapter = new WagmiAdapter({
    ssr: true,
    projectId,
    networks
  })
  
  export const config = wagmiAdapter.wagmiConfig