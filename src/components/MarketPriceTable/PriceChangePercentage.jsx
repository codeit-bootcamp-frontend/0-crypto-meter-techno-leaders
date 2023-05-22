import shortenNumber from '/src/components/MarketPriceTable/utils/shortenNumber.js';
import styles from '/src/components/MarketPriceTable/MarketPriceTable.css';
import classNames from 'classnames';

const cn = classNames.bind(styles);

function PriceChangePercentage({ value }) {
  if (value === null) {
    return (
      <div className={cn('price-change-percentage')}>
        <span>-</span>
      </div>
    );
  }
  const roundedValue = Math.round(value * 100) / 100;
  let combinedClassName = cn('price-change-percentage', {
    negative: roundedValue < 0,
    positive: roundedValue > 0,
    zero: roundedValue === 0,
  });
  let priceChangePercentage = shortenNumber(roundedValue);
  return (
    <div className={combinedClassName}>
      <span>{priceChangePercentage}%</span>
    </div>
  );
}
export default PriceChangePercentage;
