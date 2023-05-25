import React, { useCallback, useEffect, useState } from 'react';
import { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import { getCoinHistory } from '/src/api/api';
import { CurrencyProvider } from '/src/contexts/CurrencyContext';
import useAsync from '/src/hooks/useAsync';
import GNB from '/src/components/GNB/GNB';
import InputBoard from '/src/components/InputBoard/InputBoard';
import MainBoard from '/src/components/MainBoard/MainBoard';
import MarketPriceTable from '/src/components/MarketPriceTable2/MarketPriceTable.jsx';
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
  coinInfo: {
    value: 'bitcoin',
    label: 'Bitcoin',
    image:
      'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
  },
};

function App() {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [history, setHistory] = useState([]);
  const [isLoading, loadingError, getCoinHistoryAsync] =
    useAsync(getCoinHistory);

  const { currentDate, selectedDate, investment, coinInfo } = values;

  const cn = classNames.bind(styles);

  const handleRestore = () => {
    setValues(DEFAULT_VALUES);
  };

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleLoad = useCallback(
    async (queryOptions) => {
      const result = await getCoinHistoryAsync(queryOptions);
      if (!result) return;

      // 뭔가를 더 만들것임
    },
    [getCoinHistoryAsync]
  );

  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) kakao.init(import.meta.env.VITE_KAKAO_API_KEY);
  }

  useEffect(() => {
    const jsonHistoryArray = localStorage.getItem('history');
    const historyArray = JSON.parse(jsonHistoryArray);
    setHistory(historyArray);
  }, []); // 컴포넌트 마운트 시 로컬 스토리지에 저장되어 있던 데이터 불러오기

  useEffect(() => {
    if (history.length >= 30) {
      history.pop();
    }
    history.unshift(values);
    const copyHistory = JSON.parse(JSON.stringify(history));
    setHistory(copyHistory);
  }, [values]);

  return (
    <CurrencyProvider defaultValue={'krw'}>
      <GNB onRestore={handleRestore} />
      <div className={cn('main-container')}>
        {/* <InputBoard values={values} onChange={handleChange} /> */}
        <div className={cn('col')}>
          <MainBoard />
          <MarketPriceTable />
        </div>
      </div>
    </CurrencyProvider>
  );
}

export default App;
