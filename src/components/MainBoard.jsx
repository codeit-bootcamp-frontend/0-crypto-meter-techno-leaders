import CoinChart from '/src/components/CoinChart';
import '/src/components/MainBoard.css';
import Divider from '/src/components/Divider';
import { formatDate } from '/src/formatDate';
import kakaotalk from '/src/assets/images/kakaotalk.svg';
import facebook from '/src/assets/images/facebook.svg';
import share from '/src/assets/images/share.svg';

const PREV_DATE = new Date('2022-05-12');

const DEFAULT_VALUES = {
  selectedDate: PREV_DATE,
  amount: 15000,
  name: 'Bitcoin',
  id: 'bitcoin',
  imageUrl:
    'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579',
};

function formatTimeStampNow() {
  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  const timeStamp = today.getHours() < 9 ? new Date(today - oneDay) : today;
  const year = timeStamp.getFullYear();
  const month = timeStamp.getMonth() + 1;
  const day = timeStamp.getDate();

  return `${year}년 ${month}월 ${day}일 9시 기준`;
}

function formatResultPrice(amount, currency) {
  if (currency === 'krw') {
    return amount + '원';
  } else {
    return '$' + amount;
  }
}

function calculateResultPrice(amount, prevMPrice, todayMPrice) {
  return ((amount / prevMPrice) * todayMPrice).toFixed(2);
}

function MainBoard({
  values = DEFAULT_VALUES,
  currency = 'krw',
  prevCurrency = 38327701.66106745,
  todayCurrency = 35916698.02103988,
}) {
  const resultPrice = calculateResultPrice(
    values.amount,
    prevCurrency,
    todayCurrency
  );
  const fluctuation = resultPrice - values.amount > 0 ? 'increase' : 'decrease';
  return (
    <>
      <div className="mainboard-wrapper">
        <div className="top-area">
          <div className="crypto-info">
            <img className="crypto-image" src={values.imageUrl} />
            <span className="crypto-name">{values.name}</span>
          </div>
          <div className="share-link-container">
            <img src={kakaotalk} />
            <img src={facebook} />
            <img src={share} />
          </div>
        </div>
        <Divider />
        <div className="title-wrapper">
          <h1 className="precondition">
            {formatDate(values.selectedDate)}에{' '}
            {formatResultPrice(values.amount, currency)}으로 샀다면 오늘
          </h1>
          <h1 className="result">
            <span className={`${fluctuation}-emphasize`}>
              {formatResultPrice(resultPrice, currency)}
            </span>{' '}
            입니다.
          </h1>
          <p className="base-date">({formatTimeStampNow()})</p>
        </div>
        <div className="chart-wrapper">
          <CoinChart coinId={values.id} fluctuation={fluctuation} />
        </div>
      </div>
    </>
  );
}

export default MainBoard;
