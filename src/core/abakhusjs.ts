import { EthereumClient } from "./ethereum";
import { CosmosClient } from "./cosmos";
import { SecretNetworkClient } from "secretjs";


abstract class AbakhusJSAbstractFactory {
    public abstract createNetwork(networkType: string): CosmosClient | EthereumClient;
    public abstract toString(): string; 
    public abstract getWallet(): Promise<any | undefined>;   
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

    public getWallet(): Promise<any | undefined> {
        return this.network.getWallet();
    }

    public getNetworkProvider(): SecretNetworkClient | undefined {
        return this.network.getNetworkProvider();
    }

}
