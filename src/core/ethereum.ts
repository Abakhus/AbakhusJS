
export class EthereumClient {

    constructor() {
        console.log('EthereumClient::constructor');

    }

    // Other methods specific to EthereumClient
    getNetwork(): string {
        return "EthereumNetwork";
    }

    toString(): string {
        return "Ethereum::Optmism";
    }
    getWallet(): Promise<any | undefined> {
        return Promise.resolve(undefined);
    }

    getNetworkProvider(): undefined {
        return undefined;
    }
}
