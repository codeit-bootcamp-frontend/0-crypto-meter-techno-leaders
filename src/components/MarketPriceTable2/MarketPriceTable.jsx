import { useState, useRef, useEffect } from 'react';
import { useCurrency } from '/src/contexts/CurrencyContext';
import formatPrice from '/src/components/MarketPriceTable/utils/formatPrice.js';
import PriceChangePercentage from '/src/components/MarketPriceTable2/PriceChangePercentage';
import CryptoCard from '/src/components/MarketPriceTable2/CryptoCard';
import styles from '/src/components/MarketPriceTable2/MarketPriceTable.module.css';
import classNames from 'classnames/bind';
import orderAsc from '/src/assets/images/orderAscending.svg';
import orderDes from '/src/assets/images/orderDesending.svg';
import orderNone from '/src/assets/images/orderNone.svg';
import CoinTotalVolume from '/src/components/MarketPriceTable2/CoinTotalVolume';
import { useMediaQuery } from 'react-responsive';
import { getCoinsMarkets } from '/src/api/api2';
import Pagination from 'react-js-pagination';
import { getCoinsGlobal } from '/src/api/api2';

const cn = classNames.bind(styles);

function MarketPriceTable() {
  const [marketData, setMarketData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const isSmallScreen = useMediaQuery({ maxWidth: 570 });
  const currency = useCurrency();
  const PER_PAGE = 20;
  const [totalData, setTotalData] = useState(0);
  const [sortConfig, setSortConfig] = useState({
    column: '',
    direction: 'asc',
  });

  const handleLoad = async () => {
    const { data } = await getCoinsGlobal();
    const { active_cryptocurrencies } = data;
    setTotalData(active_cryptocurrencies);
  };

  const initArray = (length) => {
    return new Array(length).fill(null);
  };

  const formatMarketData = (pageData, page) => {
    const startIndex = page * PER_PAGE - PER_PAGE;
    return pageData.map((item, index) => ({
      ...item,
      id: startIndex + index + 1,
    }));
  };

  const updateMarketData = async (page) => {
    const pageData_krw = await getCoinsMarkets(page, PER_PAGE, 'krw');
    const pageData_usd = await getCoinsMarkets(page, PER_PAGE, 'usd');
    const formatedPageData_krw = formatMarketData(pageData_krw, page);
    const formatedPageData_usd = formatMarketData(pageData_usd, page);

    setMarketData((prevMarketData) => {
      const updatedData = { ...prevMarketData };
      updatedData['krw'][page - 1] = formatedPageData_krw;
      updatedData['usd'][page - 1] = formatedPageData_usd;
      console.log(updatedData);
      return updatedData;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleLoad();
      await updateMarketData(currentPage);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const totalPage = Math.ceil(totalData / 20);
    setMarketData({ krw: initArray(totalPage), usd: initArray(totalPage) });
  }, [totalData]);

  console.log(marketData);

  const handleSort = (columnName) => {
    setSortConfig((prevSortConfig) => {
      const isSameColumn = prevSortConfig.column === columnName;
      const direction = isSameColumn
        ? prevSortConfig.direction === 'asc'
          ? 'desc'
          : 'asc'
        : 'asc';

      setMarketData((prevMarketData) => {
        const currentPageData = prevMarketData[currency][currentPage - 1];

        const sortedData = currentPageData.slice().sort((a, b) => {
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

        const updatedData = { ...prevMarketData };
        updatedData[currency][currentPage - 1] = sortedData;

        return updatedData;
      });

      return { column: columnName, direction };
    });
  };

  const handlePageChange = async (selected) => {
    setCurrentPage(selected);
    await updateMarketData(selected);
  };

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
                    sortConfig?.column === 'id'
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
                    sortConfig?.column === 'name'
                      ? sortConfig?.direction === 'asc'
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
                    sortConfig?.column === 'current_price'
                      ? sortConfig?.direction === 'asc'
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
                    sortConfig?.column === 'market_cap'
                      ? sortConfig?.direction === 'asc'
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
                    sortConfig?.column === 'total_volume'
                      ? sortConfig?.direction === 'asc'
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
                    sortConfig?.column ===
                    'price_change_percentage_1h_in_currency'
                      ? sortConfig?.direction === 'asc'
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
                    sortConfig?.column ===
                    'price_change_percentage_24h_in_currency'
                      ? sortConfig?.direction === 'asc'
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
                    sortConfig?.column ===
                    'price_change_percentage_7d_in_currency'
                      ? sortConfig?.direction === 'asc'
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
            {marketData[currency]?.[currentPage - 1]?.map((item) => (
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
                  {item.current_price !== null
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
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={20}
        totalItemsCount={totalData}
        pageRangeDisplayed={isSmallScreen ? 5 : 6}
        prevPageText={'‹'}
        nextPageText={'›'}
        onChange={handlePageChange}
        innerClass={cn('pagination')}
        itemClass={cn('pagination-item')}
        activeClass={cn('active-pagination-item')}
        linkClass={cn('pagination-link')}
        activeLinkClass={cn('active-pagination-link')}
      />
    </div>
  );
}

export default MarketPriceTable;
