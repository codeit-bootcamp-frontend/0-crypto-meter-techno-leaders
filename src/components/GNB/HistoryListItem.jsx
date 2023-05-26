import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames/bind';
import styles from '/src/components/GNB/HistoryListComponents.module.css';
import { useCurrency } from '/src/contexts/CurrencyContext';
import { format } from 'date-fns';

const cn = classNames.bind(styles);

function HistoryItem({ datas }) {
  const currency = useCurrency();

  const { coinInfo, currentDate, investment, resultPrices, selectedDate } =
    datas;

  const current = new Date(currentDate);
  const selected = new Date(selectedDate);

  const currentDateWithoutTime = format(current, 'yyyy년 M월 d일');
  const selectedDateWithoutTime = format(selected, 'yyyy년 M월 d일');

  const dollarInvestment = investment / 1000;
  const fluctuation = resultPrices['krw'] >= investment;

  const isMobile = useMediaQuery({
    query: '(max-width: 620px)',
  });

  return (
    <li className={cn('history-item')}>
      <div className={cn('image-wrapper')}>
        <img className={cn('coin-logo')} src={coinInfo.image} />
      </div>
      <div className={cn('content-container')}>
        <div>
          <p className={cn('history-info', 'past', 'gray')}>
            만약 {selectedDateWithoutTime}에 {currency == 'usd' && '$'}
            <span className={cn('bold')}>
              {currency === 'krw' ? investment : dollarInvestment}
            </span>
            {currency === 'krw' && '원'}으로
          </p>
        </div>
        <div>
          {!isMobile && (
            <p className={cn('history-info', 'current', 'black')}>
              {coinInfo.label} 코인을 샀다면, {currentDateWithoutTime}
              에는{' '}
              <span
                className={cn(
                  'bold',
                  { increase: fluctuation },
                  { decrease: !fluctuation }
                )}
              >
                {currency == 'usd' && '$'}
                {Math.floor(resultPrices[currency])}
                {currency == 'usd' && ' '}
                {currency === 'krw' && '원 '}
              </span>
              입니다.
            </p>
          )}
          {isMobile && (
            <p className={cn('history-info', 'current', 'black')}>
              {coinInfo.label} 코인을 샀다면,
              <br />
              {currentDateWithoutTime}에는
              <span
                className={cn(
                  'bold',
                  { increase: fluctuation },
                  { decrease: !fluctuation }
                )}
              >
                {' '}
                {currency == 'usd' && '$'}
                {resultPrices[currency]}
                {currency === 'krw' && '원'}
              </span>
              입니다.
            </p>
          )}
        </div>
      </div>
    </li>
  );
}

export default HistoryItem;
