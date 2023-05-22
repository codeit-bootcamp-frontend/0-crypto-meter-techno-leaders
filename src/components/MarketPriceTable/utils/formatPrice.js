import currencyUnits from '/src/components/MarketPriceTable/constants/currencyUnits.js';

function formatPrice(value, currency) {
  const formattedPrice = !value.toString().includes('e')
    ? value.toLocaleString(undefined, { maximumFractionDigits: 10 })
    : value;
  return currencyUnits[currency] + formattedPrice;
}

export default formatPrice;
