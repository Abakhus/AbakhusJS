import { CreateClientOptions, SecretNetworkClient, Wallet } from "secretjs";
import { Window as KeplrWindow } from "@keplr-wallet/types";

declare global {
    interface Window extends KeplrWindow {}
}
  

export class CosmosClient {

    private wallet: Wallet | undefined;
    private options: CreateClientOptions | undefined;

    constructor() {
        try {
            
            console.log('CosmosClient::constructor');
            // TO-DO: colocar o .env para ser carregado
            console.log("Chain: ",process.env.CHAIN_ID);

            this.wallet = this.createWallet();
            this.options = this.createOptions(this.wallet);
        } catch (error: any) {
            console.error('Error in CosmosClient constructor:', error.message);
        }
    }

    getNetwork(): SecretNetworkClient {
        return new SecretNetworkClient(this.options!);
    }

    // Other methods specific to CosmosClient
    createOptions(wallet: Wallet): CreateClientOptions {
        return {
            url: process.env.GRPC_WEB_URL as string,
            chainId: process.env.CHAIN_ID as string,
            wallet: wallet,
            walletAddress: process.env.WALLET_MINTER,
        };
    }

    createWallet(): Wallet {
        return new Wallet(process.env.WALLET_MNEMONIC);
    }

    toString(): string {
        return "Cosmos::SecretNetwork";
    }

    async getWallet(): Promise<any | undefined> {
        try {
            if (typeof window !== 'undefined' && window.keplr) {
                await window.keplr.enable('pulsar-3');
                return window.keplr.getOfflineSignerOnlyAmino('pulsar-3');
            } else {
                console.log('Keplr wallet not installed!');
                return undefined;
            }
        } catch (e: any) {
            console.error('Error getting offline signer:', e.message);
            return undefined;
        }
    }

}