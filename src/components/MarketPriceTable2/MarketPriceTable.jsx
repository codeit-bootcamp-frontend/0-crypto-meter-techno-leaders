import { useState, useRef, useEffect } from 'react';
import fetchMarketData from '/src/components/MarketPriceTable/api/marketDataApi';
import { useCurrency } from '/src/contexts/CurrencyContext';
import formatPrice from '/src/components/MarketPriceTable/utils/formatPrice.js';
import PriceChangePercentage from '/src/components/MarketPriceTable2/PriceChangePercentage';
import CryptoCard from '/src/components/MarketPriceTable2/CryptoCard';
import ReactPaginate from 'react-paginate';
import styles from '/src/components/MarketPriceTable2/MarketPriceTable.module.css';
import classNames from 'classnames/bind';
import orderAsc from '/src/assets/images/orderAscending.svg';
import orderDes from '/src/assets/images/orderDesending.svg';
import orderNone from '/src/assets/images/orderNone.svg';
import CoinTotalVolume from '/src/components/MarketPriceTable2/CoinTotalVolume';
// import Pagination from '/src/components/MarketPriceTable2/Pagenation.jsx';

const cn = classNames.bind(styles);

function MarketPriceTable() {
  const currency = useCurrency();
  const [marketData, setMarketData] = useState(null);
  const [fetchingData, setFetchingData] = useState(false);
  const nextPage = useRef(0);
  const [currentPage, setCurrentPage] = useState(0); //현재 선택된 페이지
  const itemsPerPage = 20;
  const [sortConfig, setSortConfig] = useState({
    column: '',
    direction: 'asc',
  });

  // 현재 페이지에 해당하는 데이터 추출
  // const getDataForCurrentPage = () => {
  //   const startIndex = currentPage * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  //   return data.slice(startIndex, endIndex);
  // };

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

  useEffect(() => {
    loadPageData();
  }, []);

  // 현재 페이지에 해당하는 데이터 추출
  const getDataForCurrentPage = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return marketData[currency].slice(startIndex, endIndex);
  };

  // 페이지 변경될 때마다 호출(+1 = 지금 선택된 페이지)
  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
    console.log(selected);
  };

  // console.log(Math.ceil(marketData[currency].length / 10));
  // console.log(marketData);

  return (
    <div className={cn('market-price-table-wrapper')}>
      <h2 className={cn('header-title')}>전체 암호화폐 시세</h2>
      <div className={cn('market-price-table-container')}>
        <table className={cn('market-price-table')}>
          <thead>
            <tr>
              <th onClick={() => handleSort('id')}>
                #
                <img
                  src={
                    sortConfig.column === 'id'
                      ? sortConfig.direction === 'asc'
                        ? orderAsc
                        : orderDes
                      : orderNone
                  }
                  className={cn('order-img')}
                  alt="Sort Icon"
                />
              </th>
              <th onClick={() => handleSort('name')}>
                화폐 이름
                <img
                  src={
                    sortConfig.column === 'name'
                      ? sortConfig.direction === 'asc'
                        ? orderAsc
                        : orderDes
                      : orderNone
                  }
                  className={cn('order-img')}
                  alt="Sort Icon"
                />
              </th>
              <th onClick={() => handleSort('current_price')}>
                가격
                <img
                  src={
                    sortConfig.column === 'current_price'
                      ? sortConfig.direction === 'asc'
                        ? orderAsc
                        : orderDes
                      : orderNone
                  }
                  className={cn('order-img')}
                  alt="Sort Icon"
                />
              </th>
              <th onClick={() => handleSort('market_cap')}>
                총 시가
                <img
                  src={
                    sortConfig.column === 'market_cap'
                      ? sortConfig.direction === 'asc'
                        ? orderAsc
                        : orderDes
                      : orderNone
                  }
                  className={cn('order-img')}
                  alt="Sort Icon"
                />
              </th>
              <th onClick={() => handleSort('total_volume')}>
                24시간 거래량
                <img
                  src={
                    sortConfig.column === 'total_volume'
                      ? sortConfig.direction === 'asc'
                        ? orderAsc
                        : orderDes
                      : orderNone
                  }
                  className={cn('order-img')}
                  alt="Sort Icon"
                />
              </th>
              <th
                onClick={() =>
                  handleSort('price_change_percentage_1h_in_currency')
                }
              >
                1시간 변동폭
                <img
                  src={
                    sortConfig.column ===
                    'price_change_percentage_1h_in_currency'
                      ? sortConfig.direction === 'asc'
                        ? orderAsc
                        : orderDes
                      : orderNone
                  }
                  className={cn('order-img')}
                  alt="Sort Icon"
                />
              </th>
              <th
                onClick={() =>
                  handleSort('price_change_percentage_24h_in_currency')
                }
              >
                24시간 변동폭
                <img
                  src={
                    sortConfig.column ===
                    'price_change_percentage_24h_in_currency'
                      ? sortConfig.direction === 'asc'
                        ? orderAsc
                        : orderDes
                      : orderNone
                  }
                  className={cn('order-img')}
                  alt="Sort Icon"
                />
              </th>
              <th
                onClick={() =>
                  handleSort('price_change_percentage_7d_in_currency')
                }
              >
                7일 변동폭
                <img
                  src={
                    sortConfig.column ===
                    'price_change_percentage_7d_in_currency'
                      ? sortConfig.direction === 'asc'
                        ? orderAsc
                        : orderDes
                      : orderNone
                  }
                  className={cn('order-img')}
                  alt="Sort Icon"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {marketData &&
              getDataForCurrentPage().map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <CryptoCard
                      name={item.name}
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
                    {item.total_volume !== null ? (
                      <CoinTotalVolume
                        totalVolume={item.total_volume}
                        currentPrice={item.current_price}
                        symbol={item.symbol}
                        currency={currency}
                      />
                    ) : (
                      // ? formatPrice(item.total_volume, currency)
                      '-'
                    )}
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
      </div>
      <ReactPaginate
        pageCount={
          marketData && Math.ceil(marketData[currency].length / itemsPerPage)
        }
        pageRangeDisplayed={10}
        marginPagesDisplayed={0}
        breakLabel={''}
        previousLabel={'<'}
        nextLabel={'>'}
        onPageChange={handlePageChange}
        containerClassName={cn('pagination-ul')}
        activeClassName={cn('current-page')}
        previousClassName={cn('pageLabel-btn')}
        nextClassName={cn('pageLabel-btn')}
      />
    </div>
  );
}

export default MarketPriceTable;
