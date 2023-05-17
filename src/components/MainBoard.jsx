import CoinChart from '/src/components/CoinChart';
import coinPrices from '/src/assets/coins_bitcoin_marketcharts.json';

const PREV_DATE = new Date('2022-05-12');

const DEFAULT_VALUES = {
  selectedDate: PREV_DATE,
  amount: 15000,
  crypto: 'Bitcoin',
};
  return (
    <div style={{ aspectRatio: 2 }}>
      <CoinChart data={coinPrices.prices} />
    </div>
  );
}

export default MainBoard;
