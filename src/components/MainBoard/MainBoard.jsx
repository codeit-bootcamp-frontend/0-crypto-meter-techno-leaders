import { useState } from 'react';
import { useCurrency } from '/src/contexts/CurrencyContext';
import { format } from 'date-fns';
import kakaotalk from '/src/assets/images/kakaotalk.svg';
import facebook from '/src/assets/images/facebook.svg';
import share from '/src/assets/images/share.svg';
import CoinChart from '/src/components/MainBoard/CoinChart';
import Divider from '/src/components/Divider';
import Toast from '/src/components/Toast/Toast';
import styles from '/src/components/MainBoard/MainBoard.module.css';
import classNames from 'classnames/bind';

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

function MainBoard({ values = DEFAULT_VALUES }) {
  console.log(values);
  const [toastOpen, setToastOpen] = useState(false);
  const currency = useCurrency();
  const { coinInfo, investment, selectedDate, resultPrices } = values;
  const fluctuation =
    resultPrices[currency] - investment > 0 ? 'increase' : 'decrease';

  const cn = classNames.bind(styles);

  const handleCopyUrl = async () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setToastOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleShareFacebook = () => {
    const url = encodeURI(window.location.href);

    window.open('https://www.facebook.com/sharer/sharer.php?u=' + url);
  };

  const handleShareKakao = () => {
    const url = encodeURI(window.location.href);

    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '눈 떠보니 코인 부자인데요?',
        description: '1년 전 내가 10만원으로 비트코인을 샀다면?',
        imageUrl:
          'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80',
        link: {
          webUrl: url,
          mobileWebUrl: url,
        },
      },
      buttons: [
        {
          title: '자세히 보기',
          link: {
            webUrl: url,
            mobileWebUrl: url,
          },
        },
      ],
    });
  };

  return (
    <>
      <div className={cn('mainboard-container')}>
        <div className={cn('top-area')}>
          <div className={cn('crypto-info')}>
            <img className={cn('crypto-image')} src={coinInfo.image} />
            <span className={cn('crypto-name')}>{coinInfo.label}</span>
          </div>
          <div className={cn('share-link-container')}>
            <img onClick={handleShareKakao} src={kakaotalk} />
            <img onClick={handleShareFacebook} src={facebook} />
            <img onClick={handleCopyUrl} src={share} />
          </div>
          {toastOpen && (
            <Toast
              onSetToast={setToastOpen}
              text="🧷 클립 보드에 복사되었습니다."
            />
          )}
        </div>
        <Divider />
        <div className={cn('title-container')}>
          <h1 className={cn('precondition-title')}>
            {format(new Date(selectedDate), 'yyyy년 M월 d일')}에{' '}
            {formatResultPrice(investment, currency)}으로 샀다면 오늘
          </h1>
          <h1 className={cn('result-title')}>
            <span className={cn(`${fluctuation}-emphasize`)}>
              {formatResultPrice(resultPrices[currency], currency)}
            </span>{' '}
            입니다.
          </h1>
          <p className={cn('base-date')}>({formatTimeStampNow()})</p>
        </div>
        <div className={cn('chart-wrapper')}>
          <CoinChart
            id={coinInfo.value}
            currency={currency}
            fluctuation={fluctuation}
          />
        </div>
      </div>
    </>
  );
}

export default MainBoard;
