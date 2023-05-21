import React from 'react';
import { CurrencyProvider } from '/src/contexts/CurrencyContext';
import GNB from '/src/components/GNB/GNB';
import InputBoard from '/src/components/InputBoard/InputBoard';
import MainBoard from '/src/components/MainBoard/MainBoard';
import MarketPriceTable from '/src/components/MarketPriceTable/MarketPriceTable_api.jsx';
import '/src/App.css';

function App() {
  return (
    <CurrencyProvider value={'krw'}>
      <GNB />
      <InputBoard />
      <MainBoard />
      <MarketPriceTable />
    </CurrencyProvider>
  );
}

export default App;
