import { useState, useRef, useEffect } from 'react';
import fetchMarketData from '/src/components/MarketPriceTable/api/marketDataApi';
import { useCurrency } from '/src/contexts/CurrencyContext';
import formatPrice from '/src/components/MarketPriceTable/utils/formatPrice.js';
import PriceChangePercentage from '/src/components/MarketPriceTable/PriceChangePercentage';
import CryptoCard from '/src/components/MarketPriceTable/CryptoCard';

function MarketPriceTable() {
  const currency = useCurrency();
  const [marketData, setMarketData] = useState(null);
  const [fetchingData, setFetchingData] = useState(false);
  const nextPage = useRef(0);
  const [sortConfig, setSortConfig] = useState({
    column: '',
    direction: 'asc',
  });

  const handleSort = (columnName) => {
    setSortConfig((prevSortConfig) => {
      const direction =
        prevSortConfig.column === columnName &&
        prevSortConfig.direction === 'asc'
          ? 'desc'
          : 'asc';

      const sortedData = { ...marketData };

      sortedData[currency] = [...marketData[currency]].sort((a, b) => {
        const aValue = a[columnName];
        const bValue = b[columnName];
        if (aValue === null) return 1;
        if (bValue === null) return -1;
        if (aValue < bValue) {
          return direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return direction === 'asc' ? 1 : -1;
        }
        return 0;
      });

      setMarketData(sortedData);

      return {
        column: columnName,
        direction: direction,
      };
    });
  };

  const formatMarketData = (data, currency) => {
    const startIndex =
      marketData && marketData[currency] ? marketData[currency].length : 0;
    return data.map((item, index) => ({
      ...item,
      id: startIndex + index + 1,
    }));
  };

  const updateMarketData = (newData, currency, prevMarketData) => {
    const updatedData = { ...prevMarketData };
    if (!updatedData[currency]) {
      updatedData[currency] = newData;
    } else {
      updatedData[currency] = [...updatedData[currency], ...newData];
    }
    return updatedData;
  };

  const fetchAndUpdateMarketData = async (page, currency) => {
    try {
      const data = await fetchMarketData(page, currency);
      const formattedData = formatMarketData(data, currency);
      setMarketData((prevMarketData) =>
        updateMarketData(formattedData, currency, prevMarketData)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const loadPageData = async () => {
    if (fetchingData) return;
    setFetchingData(true);
    try {
      nextPage.current += 1;
      await fetchAndUpdateMarketData(nextPage.current, 'krw');
      await fetchAndUpdateMarketData(nextPage.current, 'usd');
    } catch (error) {
      console.log(error);
    } finally {
      setFetchingData(false);
    }
  };

  console.log(marketData);

  useEffect(() => {
    loadPageData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort('id')}>
            #
            {sortConfig.column === 'id' &&
              (sortConfig.direction === 'asc' ? '▲' : '▼')}
          </th>
          <th onClick={() => handleSort('name')}>
            화폐 이름
            {sortConfig.column === 'name' &&
              (sortConfig.direction === 'asc' ? '▲' : '▼')}
          </th>
          <th onClick={() => handleSort('current_price')}>
            가격
            {sortConfig.column === 'current_price' &&
              (sortConfig.direction === 'asc' ? '▲' : '▼')}
          </th>
          <th onClick={() => handleSort('market_cap')}>
            총 시가
            {sortConfig.column === 'market_cap' &&
              (sortConfig.direction === 'asc' ? '▲' : '▼')}
          </th>
          <th onClick={() => handleSort('total_volume')}>
            24시간 거래량
            {sortConfig.column === 'total_volume' &&
              (sortConfig.direction === 'asc' ? '▲' : '▼')}
          </th>
          <th
            onClick={() => handleSort('price_change_percentage_1h_in_currency')}
          >
            1시간 변동폭
            {sortConfig.column === 'price_change_percentage_1h_in_currency' &&
              (sortConfig.direction === 'asc' ? '▲' : '▼')}
          </th>
          <th
            onClick={() =>
              handleSort('price_change_percentage_24h_in_currency')
            }
          >
            24시간 변동폭
            {sortConfig.column === 'price_change_percentage_24h_in_currency' &&
              (sortConfig.direction === 'asc' ? '▲' : '▼')}
          </th>
          <th
            onClick={() => handleSort('price_change_percentage_7d_in_currency')}
          >
            7일 변동폭
            {sortConfig.column === 'price_change_percentage_7d_in_currency' &&
              (sortConfig.direction === 'asc' ? '▲' : '▼')}
          </th>
        </tr>
      </thead>
      <tbody>
        {marketData &&
          marketData[currency].map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <CryptoCard
                  name={item.value}
                  image={item.image}
                  symbol={item.symbol}
                />
              </td>
              <td>
                {item.total_volume !== null
                  ? formatPrice(item.current_price, currency)
                  : '-'}
              </td>
              <td>
                {item.market_cap !== null
                  ? formatPrice(item.market_cap, currency)
                  : '-'}
              </td>
              <td>
                {item.total_volume !== null
                  ? formatPrice(item.total_volume, currency)
                  : '-'}
              </td>
              <td>
                <PriceChangePercentage
                  value={item.price_change_percentage_1h_in_currency}
                />
              </td>
              <td>
                <PriceChangePercentage
                  value={item.price_change_percentage_24h_in_currency}
                />
              </td>
              <td>
                <PriceChangePercentage
                  value={item.price_change_percentage_7d_in_currency}
                />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default MarketPriceTable;
