import axiosInstance from '/src/api/axiosInstance.js';

const fetchMarketData = async (page, currency) => {
  try {
    const response = await axiosInstance.get(`/coins/markets`, {
      params: {
        vs_currency: currency,
        order: 'market_cap_desc',
        per_page: 200,
        page: page,
        sparkline: false,
        price_change_percentage: '1h,24h,7d',
        locale: 'en',
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default fetchMarketData;
