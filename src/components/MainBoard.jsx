import CoinChart from '/src/components/CoinChart';
import coinPrices from '/src/assets/coins_bitcoin_marketcharts.json';
import '/src/components/MainBoard.css';
import Divider from '/src/components/Divider';

const PREV_DATE = new Date('2022-05-12');

const DEFAULT_VALUES = {
  selectedDate: PREV_DATE,
  amount: 15000,
  crypto: 'Bitcoin',
  thumb:
    'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579',
};

function formatDate(date, setHour = false) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();

  const formattedDate = `${year}년 ${month}월 ${day}일`;

  return setHour ? `${formattedDate} ${hour}시` : formattedDate;
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
}) {
  const todayCurrency = coinPrices.prices[coinPrices.prices.length - 1][1];
  const resultPrice = calculateResultPrice(
    values.amount,
    prevCurrency,
    todayCurrency
  );
  const fluctuation = resultPrice - values.amount > 0 ? 'increase' : 'decrease';
  return (
    <>
      <div className="mainboard-wrapper">
        <div className="crypto-info">
          <img src={values.thumb} />
          <span className="crypto-name">{values.crypto}</span>
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
          <p className="base-date">
            (
            {formatDate(
              new Date(coinPrices.prices[coinPrices.prices.length - 1][0]),
              true
            )}{' '}
            기준)
          </p>
        </div>
        <div className="chart-wrapper">
          <CoinChart data={coinPrices.prices} fluctuation={fluctuation} />
        </div>
      </div>
    </>
  );
}

export default MainBoard;
