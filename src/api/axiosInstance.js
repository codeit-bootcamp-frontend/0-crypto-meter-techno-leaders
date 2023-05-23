import axios from 'axios';

const apiKey = import.meta.env.VITE_COINGECKO_KEY;

const axiosInstance = axios.create({
  baseURL: 'https://pro-api.coingecko.com/api/v3',
  headers: {
    'x-cg-pro-api-key': apiKey,
  },
});

export default axiosInstance;

// <axios 인스턴스 사용법>
// 필요한 api의 엔드포인트를 axiosInstance.get의 첫번째 인자에 넣고,필요한 쿼리를 두번째 인자의 params객체에 넣어 사용하시면 될 것 같습니다.>

// import axiosInstance from '/src/api/axiosInstance.js';
//
// const fetchMarketData = async (page, currency) => {
//   try {
//     const response = await axiosInstance.get(`/coins/markets`, {
//       params: {
//         vs_currency: currency,
//         order: 'market_cap_desc',
//         per_page: 240,
//         page: page,
//         sparkline: false,
//         price_change_percentage: '1h,24h,7d',
//         locale: 'en',
//       },
//     });
//     const data = response.data;
//     return data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };
