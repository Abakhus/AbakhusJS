import { CosmosClient } from "./cosmos";
import { EthereumClient } from "./ethereum";

export class WalletAbakhus<T> {
    private static instance: WalletAbakhus<any>;
    private walletData: T | null = null;

    private constructor() {}

    public static getInstance<T>(): WalletAbakhus<T> {
        if (!WalletAbakhus.instance) {
            WalletAbakhus.instance = new WalletAbakhus<T>();
        }
        return WalletAbakhus.instance;
    }

    public setWalletData(data: T): void {
        this.walletData = data;
    }

    public getWalletData(): T | null {
        return this.walletData;
    }

    public async getWallet(blockchain: EthereumClient | CosmosClient): Promise<any> {
        if (blockchain instanceof CosmosClient) {
            // Implementação específica para Cosmos
            const wallet = await this.getCosmosWallet();
            if (wallet) {
                return wallet;
            } else {
                return Promise.reject(new Error('Cosmos Wallet is undefined'));
            }
        } else if (blockchain instanceof EthereumClient) {
            // Implementação específica para Ethereum
            const wallet = await this.getEthereumWallet();
            if (wallet) {
                return wallet;
            } else {
                return Promise.reject(new Error('Ethereum Wallet is undefined'));
            }
        } else {
            return Promise.reject(new Error('Unsupported blockchain'));
        }
    }

    private async getCosmosWallet(): Promise<any> {
        // Implementação do método getWallet do arquivo cosmos.ts
        // Exemplo:
        // return await cosmosNetwork.getWallet();
        return 'Cosmos Keplr';
    }

    private async getEthereumWallet(): Promise<any> {
        // Implementação do método getWallet do arquivo ethereum.ts
        // Exemplo:
        // return await ethereumNetwork.getWallet();
        return 'Ethereum metamask';
    }
}