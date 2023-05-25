// import React, { useCallback, useEffect, useState } from 'react';
// import { registerLocale } from 'react-datepicker';
// import ko from 'date-fns/locale/ko';
// import { getCoinHistory } from '/src/api/api';
// import { CurrencyProvider } from '/src/contexts/CurrencyContext';
// import useAsync from '/src/hooks/useAsync';
// import GNB from '/src/components/GNB/GNB';
// import InputBoard from '/src/components/InputBoard/InputBoard';
// import MainBoard from '/src/components/MainBoard/MainBoard';
// import MarketPriceTable from '/src/components/MarketPriceTable/MarketPriceTable_api.jsx';
// import styles from '/src/App.module.css';
// import classNames from 'classnames/bind';

// registerLocale('ko', ko);

// const TODAY = new Date();
// const ONE_YEAR_AGO = new Date(
//   TODAY.getFullYear() - 1,
//   TODAY.getMonth(),
//   TODAY.getDate()
// );

// const DEFAULT_VALUES = {
//   currentDate: TODAY,
//   selectedDate: ONE_YEAR_AGO,
//   investment: 15000,
//   coinInfo: {
//     value: 'bitcoin',
//     label: 'Bitcoin',
//     image:
//       'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
//   },
// };

// function App() {
//   const [values, setValues] = useState(DEFAULT_VALUES);
//   const [history, setHistory] = useState([]);
//   const [isLoading, loadingError, getCoinHistoryAsync] =
//     useAsync(getCoinHistory);

//   const { currentDate, selectedDate, investment, coinInfo } = values;

//   const cn = classNames.bind(styles);

//   const handleRestore = () => {
//     setValues(DEFAULT_VALUES);
//   };

//   const handleChange = (name, value) => {
//     setValues((prevValues) => ({ ...prevValues, [name]: value }));
//   };

//   const handleLoad = useCallback(
//     async (queryOptions) => {
//       const result = await getCoinHistoryAsync(queryOptions);
//       if (!result) return;

//       // 뭔가를 더 만들것임
//     },
//     [getCoinHistoryAsync]
//   );

//   if (window.Kakao) {
//     const kakao = window.Kakao;
//     if (!kakao.isInitialized()) kakao.init('02f283abf9dc516c235b684800e7ae60');
//   }

//   useEffect(() => {
//     const jsonHistoryArray = localStorage.getItem('history');
//     const historyArray = JSON.parse(jsonHistoryArray);
//     setHistory(historyArray);
//   }, []); // 컴포넌트 마운트 시 로컬 스토리지에 저장되어 있던 데이터 불러오기

//   useEffect(() => {
//     if (history.length >= 30) {
//       history.pop();
//     }
//     history.unshift(values);
//     const copyHistory = JSON.parse(JSON.stringify(history));
//     setHistory(copyHistory);
//   }, [values]);

//   return (
//     <CurrencyProvider defaultValue={'krw'}>
//       <GNB onRestore={handleRestore} />
//       <div className={cn('main-container')}>
//         <InputBoard values={values} onChange={handleChange} />
//         <div className={cn('col')}>
//           <MainBoard />
//           <MarketPriceTable />
//         </div>
//       </div>
//     </CurrencyProvider>
//   );
// }

// export default App;

import React, { useCallback, useEffect, useState } from 'react';
import { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import { getCoinHistory } from '/src/api/api';
// import { CurrencyProvider } from '/src/contexts/CurrencyContext';
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

const YESTERDAY = new Date(
  TODAY.getFullYear(),
  TODAY.getMonth(),
  TODAY.getDate() - 1
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

const NEW_VALUES = {
  currentDate: TODAY,
  selectedDate: ONE_YEAR_AGO,
  investment: 16000,
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
  const currency = useCurrency();
  const cn = classNames.bind(styles);

  const handleRestore = () => {
    setValues(DEFAULT_VALUES);
  };

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleTest = () => {
    setValues(NEW_VALUES);
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
    // const { krw: prevKrw, usd: prevUsd } = await getCoinHistoryAsync(
    //   queryOptions
    // );

    const { krw: prevKrw, usd: prevUsd } = await getCoinHistoryAsync(
      queryOptions
    );
    if (loadingError) {
      return;
    }

    const { krw: todayKrw, usd: todayUsd } = await getCoinHistoryAsync({
      coinId,
      date: YESTERDAY,
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
    ); // 이슈) currency 접근 불가

    // 3. history item으로 저장하기 위한 새로운 객체 생성
    const valuesCopy = JSON.parse(JSON.stringify(values));
    const newItem = { ...valuesCopy, resultPrices }; // input 값들이 담긴 values와 result prices를 합친 새로운 객체

    // 기존 history 배열이 길이 30 이상인지 확인한 뒤, 새로 만든 item 객체를 unshift하여 return
    setHistory(() => {
      if (history.length >= 30) {
        history.pop();
      }
      history.unshift(newItem);
      const copyHistory = JSON.parse(JSON.stringify(history));
      return copyHistory;
    });
  }; // values(inputBoard에서 확인 버튼을 누르면 바뀌게 되므로)를 디펜던시에 추가

  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) kakao.init('02f283abf9dc516c235b684800e7ae60');
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
      <GNB onRestore={handleRestore} setHistory={setHistory} />
      <div className={cn('main-container')}>
        <InputBoard values={values} onChange={handleChange} />
        <div className={cn('col')}>
          <MainBoard />
          <MarketPriceTable />
        </div>
      </div>
      <button onClick={handleTest}>클릭!</button>
    </>
  );
}

export default App;
