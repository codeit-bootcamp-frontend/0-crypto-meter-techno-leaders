import styles from '/src/components/MarketPriceTable2/MarketPriceTable.module.css';
import classNames from 'classnames/bind';
import formatPrice from '/src/components/MarketPriceTable/utils/formatPrice.js';

const cn = classNames.bind(styles);

const CoinTotalVolume = ({ totalVolume, currentPrice, symbol, currency }) => {
  const coinTotalVolume =
    !currentPrice && !totalVolume
      ? Math.round(totalVolume / currentPrice).toLocaleString(undefined, {
          maximumFractionDigits: 10,
        })
      : '0';
  return (
    <>
      {formatPrice(totalVolume, currency)}
      <div className={cn('coin-total-volume-container')}>
        <span className={cn('coin-total-volume')}>{coinTotalVolume}</span>
        <span className={cn('coin-total-volume-symbol')}>
          {symbol.toUpperCase()}
        </span>
      </div>
    </>
  );
};

export default CoinTotalVolume;
