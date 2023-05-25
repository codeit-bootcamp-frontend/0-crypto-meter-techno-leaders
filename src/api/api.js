import { format } from 'date-fns';

const BASE_URL = 'https://pro-api.coingecko.com/api/v3';
const API_KEY = import.meta.env.VITE_COINGECKO_KEY;
// const API_KEY_QUERY = `x_cg_pro_api_key=${API_KEY}`;
const API_KEY_QUERY = 'x_cg_pro_api_key=CG-ReEFUZC8FpbDTSJ6AmbKy3m1';

export async function getCoinsMarkets(
  page = 1,
  perPage = 100,
  vsCurrency = 'krw',
  order = 'market_cap_desc',
  priceChangePercentage = '1h%2C24h%2C7d'
) {
  const query = `${API_KEY_QUERY}&vs_currency=${vsCurrency}&order=${order}&per_page=${perPage}&page=${page}&price_change_percentage=${priceChangePercentage}`;
  const response = await fetch(
    `${BASE_URL}/coins/markets?${query}&sparkline=false&locale=en`
  );

  if (!response.ok) {
    throw new Error('암호화폐의 시세를 불러오지 못 했습니다');
  }

  const body = await response.json();
  return body;
}

export async function getCoinHistory({ coinId, date }) {
  console.log(coinId, date);
  const formattedDate = format(date, 'dd-M-yyyy');
  const query = `${API_KEY_QUERY}&date=${formattedDate}`;
  console.log(`${BASE_URL}/coins/${coinId}/history?${query}`);
  const response = await fetch(`${BASE_URL}/coins/${coinId}/history?${query}`);

  if (!response.ok) {
    throw new Error('암호화폐의 시세를 불러오지 못 했습니다');
  }

  const body = await response.json();
  const { market_data: marketData } = body;
  const { current_price: currentPrice } = marketData;
  const { krw, usd } = currentPrice;

  const priceData = { krw, usd };
  return priceData;
}
