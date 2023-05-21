import React from 'react';
import '/src/App.css';
import InputBoard from '/src/components/InputBoard';
import MarketPriceTable from '/src/components/MarketPriceTable_api.jsx';

function App() {
  return (
    <React.StrictMode>
      <InputBoard />
      <MarketPriceTable />
    </React.StrictMode>
  );
}

export default App;
