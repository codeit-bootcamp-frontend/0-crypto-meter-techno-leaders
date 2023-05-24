import { format } from 'date-fns';
import kakaotalk from '/src/assets/images/kakaotalk.svg';
import facebook from '/src/assets/images/facebook.svg';
import share from '/src/assets/images/share.svg';
import CoinChart from '/src/components/MainBoard/CoinChart';
import Divider from '/src/components/Divider';
import { useCurrency } from '/src/contexts/CurrencyContext';
import '/src/components/MainBoard/MainBoard.css';

const PREV_DATE = new Date('2022-05-12');

const DEFAULT_VALUES = {
  selectedDate: PREV_DATE,
  investment: 15000,
  name: 'Bitcoin',
  id: 'bitcoin',
  imageUrl:
    'https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579',
  // 오늘날짜(date 객체)도 받아올 예정
};

const DEFAULT_MARKET_PRICES = {
  prevKrw: 38327701.66106745,
  todayKrw: 35837757.44617293,
  prevUsd: 28913.48836365432,
  todayUsd: 26842.95249471792,
};

function formatTimeStampNow() {
  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  const timeStamp = today.getHours() < 9 ? new Date(today - oneDay) : today;

  return `${format(timeStamp, 'yyyy년 M월 d일')} 9시 기준`;
}

function formatResultPrice(price, currency) {
  if (currency === 'krw') {
    return price + '원';
  } else {
    return '$' + price;
  }
}

function calculateResultPrices(
  investment,
  currency,
  prevKrw,
  todayKrw,
  prevUsd,
  todayUsd
) {
  const resultPricesByCurrency = [];
  let purchasedCoinCnt;

  if (currency === 'krw') {
    purchasedCoinCnt = investment / prevKrw;
  } else {
    purchasedCoinCnt = investment / prevUsd;
  }

  resultPricesByCurrency.push(+(purchasedCoinCnt * todayKrw).toFixed(2));
  resultPricesByCurrency.push(+(purchasedCoinCnt * todayUsd).toFixed(2));

  return resultPricesByCurrency;
}

const priceIndexMapper = {
  krw: 0,
  usd: 1,
};

function MainBoard({
  values = DEFAULT_VALUES,
  prevKrw = DEFAULT_MARKET_PRICES.prevKrw,
  todayKrw = DEFAULT_MARKET_PRICES.todayKrw,
  prevUsd = DEFAULT_MARKET_PRICES.prevUsd,
  todayUsd = DEFAULT_MARKET_PRICES.todayUsd,
}) {
  const currency = useCurrency();
  const resultPrices = calculateResultPrices(
    values.investment,
    currency,
    prevKrw,
    todayKrw,
    prevUsd,
    todayUsd
  );
  const fluctuation =
    resultPrices[priceIndexMapper[currency]] - values.investment > 0
      ? 'increase'
      : 'decrease';

  return (
    <>
      <div className="mainboard-container">
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
        <div className="title-container">
          <h1 className="precondition">
            {format(values.selectedDate, 'yyyy년 M월 d일')}에{' '}
            {formatResultPrice(values.investment, currency)}으로 샀다면 오늘
          </h1>
          <h1 className="result">
            <span className={`${fluctuation}-emphasize`}>
              {formatResultPrice(
                resultPrices[priceIndexMapper[currency]],
                currency
              )}
            </span>{' '}
            입니다.
          </h1>
          <p className="base-date">({formatTimeStampNow()})</p>
        </div>
        <div className="chart-wrapper">
          <CoinChart
            id={values.id}
            currency={currency}
            fluctuation={fluctuation}
          />
        </div>
      </div>
    </>
  );
}

export default MainBoard;
