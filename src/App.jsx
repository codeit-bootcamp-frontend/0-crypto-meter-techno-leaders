import React from 'react';
import '/src/App.css';
import { CurrencyProvider } from '/src/contexts/CurrencyContext';
import GNB from '/src/components/GNB/GNB';
import InputBoard from '/src/components/InputBoard/InputBoard';
import MarketPriceTable from '/src/components/MarketPriceTable/MarketPriceTable_api.jsx';

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
