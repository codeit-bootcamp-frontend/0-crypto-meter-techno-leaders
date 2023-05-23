import shortenNumber from '/src/components/MarketPriceTable/utils/shortenNumber.js';
import styles from '/src/components/MarketPriceTable/MarketPriceTable.module.css';
import classNames from 'classnames/bind';

const cn = classNames.bind(styles);

const CoinTotalVolume = ({ totalVolume, currentPrice, symbol }) => {
  const coinTotalVolume = currentPrice && shortenNumber(Math.round(totalVolume / currentPrice))
  return (
    <div className={cn('coin-total-volume-container')}>
      <span className={cn('coin-total-volume')}>{currentPrice ? coinTotalVolume : '0'}</span>
      <span className={cn('coin-total-volume-symbol')}>
        {symbol.toUpperCase()}
      </span>
    </div>
  );
};

export default CoinTotalVolume;
