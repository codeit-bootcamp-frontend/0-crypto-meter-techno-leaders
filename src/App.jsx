import React, { useEffect, useState } from 'react';
import { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import { getCoinHistory } from '/src/api/api';
import useAsync from '/src/hooks/useAsync';
import GNB from '/src/components/GNB/GNB';
import InputBoard from '/src/components/InputBoard/InputBoard';
import MainBoard from '/src/components/MainBoard/MainBoard';
import MarketPriceTable from '/src/components/MarketPriceTable/MarketPriceTable_api.jsx';
import styles from '/src/App.module.css';
import classNames from 'classnames/bind';
import { useCurrency } from '/src/contexts/CurrencyContext';

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
  const [mainBoardValues, setMainBoardValues] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoading, loadingError, getCoinHistoryAsync] =
    useAsync(getCoinHistory);
  const currency = useCurrency();
  const cn = classNames.bind(styles);

  const handleRestore = () => {
    setValues(DEFAULT_VALUES);
  };

  function calcPrices(
    investment,
    currency,
    prevKrw,
    todayKrw,
    prevUsd,
    todayUsd
  ) {
    let purchasedCoinCnt;
    if (currency === 'krw') {
      purchasedCoinCnt = investment / prevKrw;
    } else {
      purchasedCoinCnt = investment / prevUsd;
    }

    const resultPricesByCurrency = {
      krw: +(purchasedCoinCnt * todayKrw).toFixed(2),
      usd: +(purchasedCoinCnt * todayUsd).toFixed(2),
    };

    return resultPricesByCurrency;
  }

  const handleLoad = async (queryOptions) => {
    const { coinId } = queryOptions;
    const { investment } = values;

    // 1. 과거/오늘 시세 리퀘스트
    const { krw: prevKrw, usd: prevUsd } = await getCoinHistoryAsync(
      queryOptions
    );
    if (loadingError) {
      return;
    }

    const { krw: todayKrw, usd: todayUsd } = await getCoinHistoryAsync({
      coinId,
      date: TODAY,
    });
    if (loadingError) {
      console.log(loadingError);
      return;
    }

    // 2. 결과 금액 계산
    const resultPrices = calcPrices(
      investment,
      currency,
      prevKrw,
      todayKrw,
      prevUsd,
      todayUsd
    );

    // 3. history item으로 저장하기 위한 새로운 객체 생성
    const valuesCopy = JSON.parse(JSON.stringify(values));
    const newItem = { ...valuesCopy, resultPrices }; // input 값들이 담긴 values와 result prices를 합친 새로운 객체

    // 기존 history 배열이 길이 30 이상인지 확인한 뒤, 새로 만든 item 객체를 unshift하여 return
    setHistory(() => {
      if (history.length >= 30) {
        history.pop();
      }
      history.unshift(newItem);
      setMainBoardValues(history[0]);
      const copyHistory = JSON.parse(JSON.stringify(history));
      return copyHistory;
    });
  }; // values(inputBoard에서 확인 버튼을 누르면 바뀌게 되므로)를 디펜던시에 추가

  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) kakao.init(import.meta.env.VITE_KAKAO_API_KEY);
  }

  useEffect(() => {
    handleLoad({ coinId: values.coinInfo.value, date: values.selectedDate });
  }, [values]); // inputBoard에서 버튼을 누르면 values 업데이트 -> 결과 금액 계산하고 여러 컴포와 연동

  useEffect(() => {
    const jsonHistoryArray = localStorage.getItem('history');
    const historyArray = JSON.parse(jsonHistoryArray);

    setHistory(historyArray);
  }, []); // 컴포넌트 마운트 시 로컬 스토리지에 저장되어 있던 데이터 불러오기

  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  return (
    <>
      <GNB onRestore={handleRestore} data={history} setHistory={setHistory} />
      <div className={cn('main-container')}>
        <InputBoard onChange={setValues} defaultValues={DEFAULT_VALUES} />
        <div className={cn('col')}>
          {mainBoardValues && <MainBoard values={mainBoardValues} />}
          <MarketPriceTable />
        </div>
      </div>
    </>
  );
}

export default App;
