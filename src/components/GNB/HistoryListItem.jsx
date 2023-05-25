import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames/bind';
import styles from '/src/components/GNB/HistoryListComponents.module.css';

const cn = classNames.bind(styles);

function HistoryItem({ datas }) {
  const {
    purchaseDate,
    investment,
    coinName,
    coinLogoURL,
    currentDate,
    currentValue,
  } = datas;

  const isMobile = useMediaQuery({
    query: '(max-width: 620px)',
  });

  return (
    <li className={cn('history-item')}>
      <div className={cn('image-wrapper')}>
        <img className={cn('coin-logo')} src={coinLogoURL} />
      </div>
      <div className={cn('content-container')}>
        <div>
          <p className={cn('history-info', 'past', 'gray')}>
            만약 {purchaseDate}에{' '}
            <span className={cn('bold')}>{investment}</span>원으로
          </p>
        </div>
        <div>
          {!isMobile && (
            <p className={cn('history-info', 'current', 'black')}>
              {coinName} 코인을 샀다면, {currentDate}에는{' '}
              <span className={cn('bold')}>{currentValue}</span>
              원입니다.
            </p>
          )}
          {isMobile && (
            <p className={cn('history-info', 'current', 'black')}>
              {coinName} 코인을 샀다면,
              <br />
              {currentDate}에는{' '}
              <span className={cn('bold')}>{currentValue}</span>
              원입니다.
            </p>
          )}
        </div>
      </div>
    </li>
  );
}

export default HistoryItem;
