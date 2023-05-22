import shortenNumber from '/src/components/MarketPriceTable/utils/shortenNumber.js';
import styles from '/src/components/MarketPriceTable/MarketPriceTable.css';
import classNames from 'classnames';

const cn = classNames.bind(styles);

const CoinTotalVolume = ({ totalVolume, currentPrice, symbol }) => {
  const coinTotalVolume =
    currentPrice !== 0
      ? shortenNumber(Math.round(totalVolume / currentPrice))
      : '0';
  return (
    <div className={cn('coin-total-volume-container')}>
      <span className={cn('coin-total-volume')}>{coinTotalVolume}</span>
      <span className={cn('coin-total-volume-symbol')}>
        {symbol.toUpperCase()}
      </span>
    </div>
  );
};

export default CoinTotalVolume;
