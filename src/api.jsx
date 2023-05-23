import { format } from 'date-fns';

const BASE_URL = 'https://pro-api.coingecko.com/api/v3';
const API_KEY = import.meta.env.VITE_COINGECKO_KEY;

export async function getCryptoHistory(cryptoId, date) {
  const formattedDate = format(date, 'dd-M-yyyy');
  const query = `x_cg_pro_api_key=${API_KEY}&date=${formattedDate}`;
  const response = await fetch(
    `${BASE_URL}/coins/${cryptoId}/history?${query}`
  );
  if (!response.ok) {
    throw new Error('암호화폐의 시세를 불러오지 못 했습니다');
  }
  const body = await response.json();
  return body;
}
