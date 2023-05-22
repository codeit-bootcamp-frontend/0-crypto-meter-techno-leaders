import clsx from 'clsx';
import shortenNumber from '/src/components/MarketPriceTable/utils/shortenNumber.js';

function PriceChangePercentage({ value }) {
  if (value === null) {
    return (
      <div className="price-change-percentage">
        <span>-</span>
      </div>
    );
  }
  const roundedValue = Math.round(value * 100) / 100;
  let combinedClassName = clsx('price-change-percentage', {
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
