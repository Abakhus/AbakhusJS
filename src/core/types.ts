export type AbakhusJSWallet = {
    address: string
    balance: any
    network: any
    chainId: string
    cosmos:{
        wallet: any
    },
    ethereum:{
        wallet: any
    }
  }