import { ethers } from "ethers"
import { AbakhusJSWallet } from "./types"

interface EIP6963ProviderInfo {
  rdns: string
  uuid: string
  name: string
  icon: string
}

interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo
  provider: EIP1193Provider
}

type EIP6963AnnounceProviderEvent = {
  detail: {
    info: EIP6963ProviderInfo
    provider: Readonly<EIP1193Provider>
  }
}

interface EIP1193Provider {
  isStatus?: boolean
  host?: string
  path?: string
  sendAsync?: (
    request: { method: string; params?: Array<unknown> },
    callback: (error: Error | null, response: unknown) => void
  ) => void
  send?: (
    request: { method: string; params?: Array<unknown> },
    callback: (error: Error | null, response: unknown) => void
  ) => void
  request: (request: {
    method: string
    params?: Array<unknown>
  }) => Promise<unknown>
}

declare global {
  interface WindowEventMap {
    "eip6963:announceProvider": CustomEvent
  }
}

export class EthereumClient {

    constructor() {
        console.log('EthereumClient::constructor');

    }

    // Other methods specific to EthereumClient
    getNetwork(): string {
        return "EthereumNetwork";
    }

    toString(): string {
        return "Ethereum::Ethereum";
    }
    // getWallet(): (wallet: EIP6963AnnounceProviderEvent["detail"]) => Promise<void> {
    //   console.log('Ethereum::GetWallet');
    //   const connectWithProvider = async (
    //     wallet: EIP6963AnnounceProviderEvent["detail"]
    //   ) => {
    //     try {
    //       await wallet.provider.request({ method: "eth_requestAccounts" })
    //     } catch (error) {
    //       console.error("Failed to connect to provider:", error)
    //     }
    //   }  
      
    //   return connectWithProvider;
    // }
    async getWallet(): Promise<any | undefined>{

      const ethereum = (window as any).ethereum;
      // Check if MetaMask is installed
      if (typeof ethereum !== "undefined") {
        try {
          // Request access to the user's MetaMask accounts
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          // Get the connected Ethereum address
          const address = accounts[0];
          // Create an ethers.js provider using the injected provider from MetaMask
          const provider = new ethers.BrowserProvider(ethereum);
          // Get the account balance
          const balance = await provider.getBalance(address);
          // Get the network ID from MetaMask
          const network = await provider.getNetwork();
          // Update state with the results
          
          let abakhusJSWallet: AbakhusJSWallet = {
            cosmos: { wallet: undefined },
            address: accounts[0],
            balance,
            network,
            chainId: network.name,
            ethereum: {
                wallet: provider
            }
        };

          return abakhusJSWallet;
        } catch (error: Error | any) {
          alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
        }
      } else {
        alert("MetaMask not installed");
      }
    }

    getNetworkProvider(): undefined {
        return undefined;
    }

}