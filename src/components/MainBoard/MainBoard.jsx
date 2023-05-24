import CoinChart from '/src/components/MainBoard/CoinChart';
import Divider from '/src/components/Divider';
import Toast from '/src/components/Toast/Toast';
import { useCurrency } from '/src/contexts/CurrencyContext';
import { formatDate } from '/src/utils/formatDate';
import styles from '/src/components/MainBoard/MainBoard.module.css';
import classNames from 'classnames/bind';
import kakaotalk from '/src/assets/images/kakaotalk.svg';
import facebook from '/src/assets/images/facebook.svg';
import share from '/src/assets/images/share.svg';
import { useState } from 'react';

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

  return `${formatDate(timeStamp)} 9시 기준`;
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
  const [toastOpen, setToastOpen] = useState(false);
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

  const cn = classNames.bind(styles);

  const handleCopyUrl = async () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setToastOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={cn('mainboard-container')}>
        <div className={cn('top-area')}>
          <div className={cn('crypto-info')}>
            <img className={cn('crypto-image')} src={values.imageUrl} />
            <span className={cn('crypto-name')}>{values.name}</span>
          </div>
          <div className={cn('share-link-container')}>
            <img src={kakaotalk} />
            <img src={facebook} />
            <img onClick={handleCopyUrl} src={share} />
          </div>
          {toastOpen && (
            <Toast
              onSetToast={setToastOpen}
              text="🧷클립 보드에 복사되었습니다."
            />
          )}
        </div>
        <Divider />
        <div className={cn('title-container')}>
          <h1 className={cn('precondition-title')}>
            {formatDate(values.selectedDate)}에{' '}
            {formatResultPrice(values.investment, currency)}으로 샀다면 오늘
          </h1>
          <h1 className={cn('result-title')}>
            <span className={cn(`${fluctuation}-emphasize`)}>
              {formatResultPrice(
                resultPrices[priceIndexMapper[currency]],
                currency
              )}
            </span>{' '}
            입니다.
          </h1>
          <p className={cn('base-date')}>({formatTimeStampNow()})</p>
        </div>
        <div className={cn('chart-wrapper')}>
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
