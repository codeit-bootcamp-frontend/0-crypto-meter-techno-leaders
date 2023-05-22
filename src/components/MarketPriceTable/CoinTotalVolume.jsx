import shortenNumber from '/src/components/MarketPriceTable/utils/shortenNumber.js';

const CoinTotalVolume = ({ totalVolume, currentPrice, symbol }) => {
  const coinTotalVolume = shortenNumber(Math.round(totalVolume / currentPrice));
  return (
    <div className="coin-total-volume-container">
      <span className="coin-total-volume">{coinTotalVolume}</span>
      <span className="coin-total-volume-symbol">{symbol.toUpperCase()}</span>
    </div>
  );
};

export default CoinTotalVolume;
