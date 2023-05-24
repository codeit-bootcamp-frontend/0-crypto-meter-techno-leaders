import { format } from 'date-fns';

const BASE_URL = 'https://pro-api.coingecko.com/api/v3';
const API_KEY = import.meta.env.VITE_COINGECKO_KEY;
const API_KEY_QUERY = `x_cg_pro_api_key=${API_KEY}`;

export async function getCoinsMarkets(
  currency = 'krw',
  order = 'market_cap_desc',
  perPage = '200',
  page = '1'
) {
  const query = `${API_KEY_QUERY}&vs_currency=${currency}&order=${order}&per_page=${perPage}&page=${page}`;
  const response = await fetch(
    `${BASE_URL}/coins/markets?${query}&sparkline=false&locale=en`
  );

  if (!response.ok) {
    throw new Error('암호화폐의 시세를 불러오지 못 했습니다');
  }

  const body = await response.json();
  return body;
}

export async function getCoinsHistory(coinId, date) {
  const formattedDate = format(date, 'dd-M-yyyy');
  const query = `${API_KEY_QUERY}&date=${formattedDate}`;
  const response = await fetch(`${BASE_URL}/coins/${coinId}/history?${query}`);

  if (!response.ok) {
    throw new Error('암호화폐의 시세를 불러오지 못 했습니다');
  }

  const body = await response.json();
  return body;
}
