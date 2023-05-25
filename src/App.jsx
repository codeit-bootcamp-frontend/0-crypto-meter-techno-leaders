import React, { useState } from 'react';
import { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import { CurrencyProvider } from '/src/contexts/CurrencyContext';
import GNB from '/src/components/GNB/GNB';
import InputBoard from '/src/components/InputBoard/InputBoard';
import MainBoard from '/src/components/MainBoard/MainBoard';
import MarketPriceTable from '/src/components/MarketPriceTable/MarketPriceTable_api.jsx';
import '/src/App.css';

registerLocale('ko', ko);

const TODAY = new Date();
const ONE_YEAR_AGO = new Date(
  TODAY.getFullYear() - 1,
  TODAY.getMonth(),
  TODAY.getDate()
);

const DEFAULT_VALUES = {
  currentDate: TODAY,
  selectedDate: ONE_YEAR_AGO,
  investment: 15000,
  cryptoName: 'Bitcoin',
};

function App() {
  const [values, setValues] = useState(DEFAULT_VALUES);

  const handleRestore = () => {
    setValues(DEFAULT_VALUES);
  };

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  return (
    <CurrencyProvider defaultValue={'krw'}>
      <GNB onRestore={handleRestore} />
      <InputBoard values={values} onChange={handleChange} />
      <MainBoard />
      <MarketPriceTable />
    </CurrencyProvider>
  );
}

export default App;
