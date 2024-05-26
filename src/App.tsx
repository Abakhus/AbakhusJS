import React, { useEffect, useState } from 'react';
import './App.css';
import { AbakhusJS } from './core/abakhusjs';
import { Keplr } from '@keplr-wallet/types';

function App() {
  const [wallet, setWallet] = useState(undefined);
  const [network, setNetwork] = useState(undefined);
  useEffect(() => {

    const initWeb3 = async() => {
      const abakhusjs = new AbakhusJS('secret');
      console.log("Kind: ", abakhusjs.toString());
      const keplrWallet = await abakhusjs.getWallet();
      console.log("Wallet: ", keplrWallet);

      const networkProvider = abakhusjs.getNetworkProvider();

      setWallet(keplrWallet);
      setNetwork(networkProvider as undefined);
    }
    initWeb3();
    
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          AbakhusJS: <br/>
          Wallet: {wallet ? (wallet as any).chainId : 'Loading wallet...'}
          <br/>
          Network: {network ? (network as any).walletAddress : 'Loading network...'}
        </p>
      </header>
    </div>
  );
}

export default App;
