const apiKey = import.meta.env.VITE_COINGECKO_KEY;

const fetchMarketData = async (page, currency) => {
  try {
    const response = await fetch(
      `https://pro-api.coingecko.com/api/v3/coins/markets?x_cg_pro_api_key=${apiKey}&vs_currency=${currency}&order=market_cap_desc&per_page=240&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default fetchMarketData;
