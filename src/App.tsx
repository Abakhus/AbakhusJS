import React, { useEffect } from 'react';
import './App.css';
import { AbakhusJS } from './core/abakhusjs';

function App() {
  
  useEffect(() => {

    const initWeb3 = async() => {
      const abakhusjs = new AbakhusJS('secret');
      console.log("Kind: ", abakhusjs.toString());
      const wallet = await abakhusjs.getWallet();
      console.log("Wallet: ", wallet);
    }
    initWeb3();
    
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          AbakhusJS:  
        </p>
      </header>
    </div>
  );
}

export default App;
