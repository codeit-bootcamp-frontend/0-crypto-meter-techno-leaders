import React, { useState } from 'react';
import { registerLocale } from 'react-datepicker';
import { CurrencyProvider } from '/src/contexts/CurrencyContext';
import ko from 'date-fns/locale/ko';
import GNB from '/src/components/GNB/GNB';
import InputBoard from '/src/components/InputBoard/InputBoard';
import MainBoard from '/src/components/MainBoard/MainBoard';
import MarketPriceTable from '/src/components/MarketPriceTable/MarketPriceTable_api.jsx';
import styles from '/src/App.module.css';
import classNames from 'classnames/bind';

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

  const cn = classNames.bind(styles);

  const handleRestore = () => {
    setValues(DEFAULT_VALUES);
  };

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) kakao.init(import.meta.env.VITE_KAKAO_API_KEY);
  }

  return (
    <CurrencyProvider defaultValue={'krw'}>
      <GNB onRestore={handleRestore} />
      <div className={cn('main-container')}>
        <InputBoard values={values} onChange={handleChange} />
        <div className={cn('col')}>
          <MainBoard />
          <MarketPriceTable />
        </div>
      </div>
    </CurrencyProvider>
  );
}

export default App;
