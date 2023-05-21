import React from 'react';
import '/src/App.css';
import { CurrencyProvider } from '/src/contexts/CurrencyContext';
import GNB from '/src/components/GNB/GNB';
import InputBoard from '/src/components/InputBoard';
import MarketPriceTable from '/src/components/MarketPriceTable_api.jsx';

function App() {
  return (
    <CurrencyProvider value={'krw'}>
      <GNB />
      <InputBoard />
      <MarketPriceTable />
    </CurrencyProvider>
  );
}

export default App;
