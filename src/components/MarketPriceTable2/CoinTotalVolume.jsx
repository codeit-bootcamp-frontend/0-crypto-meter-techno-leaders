import styles from '/src/components/MarketPriceTable2/MarketPriceTable.module.css';
import classNames from 'classnames/bind';
import formatPrice from '/src/components/MarketPriceTable/utils/formatPrice.js';

const cn = classNames.bind(styles);

const CoinTotalVolume = ({ totalVolume, currentPrice, symbol, currency }) => {
  const getCoinTotalVolume = () => {
    if (!currentPrice || !totalVolume) {
      return '0';
    } else {
      return Math.round(totalVolume / currentPrice).toLocaleString({
        maximumFractionDigits: 10,
      });
    }
  };

  return (
    <>
      {formatPrice(totalVolume, currency)}
      <div className={cn('coin-total-volume-container')}>
        <span className={cn('coin-total-volume')}>{getCoinTotalVolume()}</span>
        <span className={cn('coin-total-volume-symbol')}>
          {symbol.toUpperCase()}
        </span>
      </div>
    </>
  );
};

export default CoinTotalVolume;
