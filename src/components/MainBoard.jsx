import CoinChart from '/src/components/CoinChart';
import coinPrices from '/src/assets/coins_bitcoin_marketcharts.json';

function MainBoard() {
  return (
    <div style={{ aspectRatio: 2 }}>
      <CoinChart data={coinPrices.prices} />
    </div>
  );
}

export default MainBoard;
