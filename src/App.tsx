import React, { useEffect, useState } from 'react';
import './App.css';
import { AbakhusJS } from './core/abakhusjs';
import { AbakhusJSWallet } from './core/types';

function App() {
  const [wallet, setWallet] = useState<AbakhusJSWallet | undefined>(undefined);
  const [network, setNetwork] = useState(undefined);
  useEffect(() => {

    const initWeb3 = async() => {

      try {
        //Define qual rede acessar: secret ou ethereum
        const abakhusjs = new AbakhusJS('ethereum');    
        console.log("Kind: ", abakhusjs.toString());
        
        //Define a carteira digital: keplr para Cosmos e metamask para Ethereum
        const wallet: AbakhusJSWallet = await abakhusjs.getWallet();
        console.log("Wallet: ", wallet);

        //Objeto da rede escolhida
        // const networkProvider = abakhusjs.getNetworkProvider();

        setWallet(wallet);
        // setNetwork(networkProvider as undefined);
      } catch (e: any) {
        console.error(e.message);
        setWallet(undefined);
      }
    }
    initWeb3();
    
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          AbakhusJS: <br/>
          Chain: {wallet ? wallet.chainId : 'Loading wallet...'}
          <br/>
          Network: {network ? (network as any).walletAddress : 'Loading network...'}
        </p>
      </header>
    </div>
  );
}

export default App;
