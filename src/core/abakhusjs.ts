import { EthereumClient } from "./ethereum";
import { CosmosClient } from "./cosmos";
import { SecretNetworkClient } from "secretjs";
import { WalletAbakhus } from './wallet';
import { AbakhusJSWallet } from "./types";


abstract class AbakhusJSAbstractFactory {
    public abstract createNetwork(networkType: string): CosmosClient | EthereumClient;
    public abstract toString(): string; 
    public abstract getWallet(): Promise<any>;   
    public abstract getNetworkProvider(): SecretNetworkClient | undefined;
}

export class AbakhusJS extends AbakhusJSAbstractFactory {
    public network: CosmosClient | EthereumClient;

    constructor(networkType: string) {
        super();
        this.network = this.createNetwork(networkType);
    }

    createNetwork(networkType: string) {
        if (networkType === 'secret') {
            return new CosmosClient();
        } else if (networkType === 'ethereum') {
            return new EthereumClient();
        } else {
            throw new Error('Invalid network type. Choose: secret or ethereum');
        }
    }

    public toString(): string {
        return this.network.toString();
    }

    public async getWallet(): Promise<any> {
        // Ethereum abre Metamask
        const wallet:AbakhusJSWallet = await this.network.getWallet();
        // const walletInstance = WalletAbakhus.getInstance<{ info: string; provider: string }>();
        // const wallet = walletInstance.getWallet(this.network);
        // // walletInstance.setWalletData({ info: 'EIP6963ProviderInfo', provider: 'EIP1193Provider' });
        if (wallet) {
            return wallet;
        } else {
            return Promise.reject(new Error('Wallet is undefined'));
        }
    }

    public getNetworkProvider(): SecretNetworkClient | undefined {
        return this.network.getNetworkProvider();
    }
}