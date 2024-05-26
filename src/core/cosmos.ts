import { CreateClientOptions, SecretNetworkClient, Wallet } from "secretjs";
import { Window as KeplrWindow, OfflineAminoSigner } from "@keplr-wallet/types";

declare global {
    interface Window extends KeplrWindow {}
}
  

export class CosmosClient {

    private wallet: OfflineAminoSigner | undefined;
    
    constructor() {
        try {
            
            console.log('CosmosClient::constructor');
            // TO-DO: colocar o .env para ser carregado
            console.log("Chain: ",process.env.CHAIN_ID);

            // this.wallet = this.createWallet();
        } catch (error: any) {
            console.error('Error in CosmosClient constructor:', error.message);
        }
    }

    getNetwork(): SecretNetworkClient {
        return new SecretNetworkClient(this.createOptions());
    }

    // Other methods specific to CosmosClient
    createOptions(): CreateClientOptions {
        return {
            url: 'https://lcd.pulsar-3.secretsaturn.net', //process.env.GRPC_WEB_URL as string,
            chainId: 'pulsar-3', //process.env.CHAIN_ID as string,
            wallet: this.wallet,
            encryptionUtils: window.getEnigmaUtils!(process.env.CHAIN_ID as string),
            walletAddress: '', //TO-DO
        };
    }

    // createWallet(): Wallet {
    //     return new Wallet(process.env.WALLET_MNEMONIC);
    // }

    toString(): string {
        return "Cosmos::SecretNetwork";
    }

    async getWallet(): Promise<any | undefined> {
        try {
            if (typeof window !== 'undefined' && window.keplr) {
                await window.keplr.enable('pulsar-3');
                this.wallet = window.keplr.getOfflineSignerOnlyAmino('pulsar-3');
                return this.wallet;
            } else {
                console.log('Keplr wallet not installed!');
                return undefined;
            }
        } catch (e: any) {
            console.error('Error getting offline signer:', e.message);
            return undefined;
        }
    }

    getNetworkProvider(): SecretNetworkClient | undefined {
        const networkProvider = new SecretNetworkClient(this.createOptions());
        return networkProvider;
    }
}