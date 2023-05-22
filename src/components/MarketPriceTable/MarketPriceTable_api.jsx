import { useState, useEffect, useRef } from 'react';
import { useCurrency } from '/src/contexts/CurrencyContext';
import { DataGrid } from '@mui/x-data-grid';
import styles from '/src/components/MarketPriceTable/MarketPriceTable.css';
import classNames from 'classnames/bind';
import CustomPagination from '/src/components/MarketPriceTable/CustomPagintion';
import fetchMarketData from '/src/components/MarketPriceTable/api/marketDataApi';
import Columns from '/src/components/MarketPriceTable/columns';
import SearchInput from '/src/components/MarketPriceTable/SearchInput';

const cn = classNames.bind(styles);

function MarketPriceTable() {
  const [marketData, setMarketData] = useState({});
  const nextPage = useRef(0);
  const currency = useCurrency();
  const tableColumns = Columns(currency);
  const [fetchingData, setFetchingData] = useState(false);
  const [searchText, setSearchText] = useState('');

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

  const handlePageChange = async (params) => {
    const { page, pageSize } = params;
    const currentPage = page + 1;
    const lastPage = Math.ceil((marketData[currency] || []).length / pageSize);

    if (currentPage === lastPage) {
      await loadPageData();
    }
  };

  const filterRows = (rows) => {
    return rows.filter((row) => {
      return row.name.toLowerCase().includes(searchText.toLowerCase());
    });
  };

  const handleInputChange = (value) => {
    setSearchText(value);
  };

  return (
    <div className={cn('market-price-table')}>
      <div className={cn('header')}>
        <h2 className={cn('header-title')}>전체 암호화폐 시세</h2>
        <SearchInput handleInputChange={handleInputChange} />
      </div>
      <div className={cn('datagrid-container')}>
        <DataGrid
          style={{
            border: 'none',
            borderRadius: '0',
            borderTop: '1px solid #161c2f',
            fontFamily: 'inherit',
            fontWeight: 'inherit',
          }}
          rows={filterRows(marketData[currency] || [])}
          columns={tableColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
          slots={{
            pagination: CustomPagination,
          }}
          checkboxSelection={false}
          disableRowSelectionOnClick={true}
          rowHeight={80}
          headerHeight={20}
          onPaginationModelChange={handlePageChange}
          disableColumnMenu={true}
        />
      </div>
    </div>
  );
}

export default MarketPriceTable;
