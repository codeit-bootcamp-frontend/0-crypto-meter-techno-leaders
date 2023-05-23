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

  return (
    <li className={cn('history-item')}>
      <div>
        <img className={cn('coin-logo')} src={coinLogoURL} />
      </div>
      <div>
        <div>
          <p className={cn('history-info', 'gray')}>
            만약 {purchaseDate}에 {investment}원으로
          </p>
        </div>
        <div>
          <p className={cn('history-info', 'black')}>
            {coinName} 코인을 샀다면, {currentDate}에는 {currentValue}원입니다.
          </p>
        </div>
      </div>
    </li>
  );
}

export default HistoryItem;
