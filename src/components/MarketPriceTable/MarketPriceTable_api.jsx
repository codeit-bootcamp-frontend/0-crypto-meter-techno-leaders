import { useState, useEffect, useCallback, useRef } from 'react';
import * as React from 'react';
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import '/src/components/MarketPriceTable/MarketPriceTable.css';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import defaultImg from '/src/assets/no-image.jpg';
import clsx from 'clsx';

const apiKey = import.meta.env.VITE_COINGECKO_KEY;

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#00A661',
    },
  },
});

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <ThemeProvider theme={customTheme}>
      <Pagination
        style={{ margin: '3rem auto 0' }}
        color="primary"
        shape="rounded"
        page={page + 1}
        count={pageCount}
        renderItem={(props2) => (
          <PaginationItem
            {...props2}
            disableRipple
            style={{
              fontSize: '1.4rem',
              fontFamily: 'Pretendard',
              fontWeight: 500,
            }}
          />
        )}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    </ThemeProvider>
  );
}

function PriceChangePercentage({ value }) {
  if (value === null) {
    return (
      <div className="price-change-percentage">
        <span>-</span>
      </div>
    );
  }

  const roundedValue = Math.round(value * 100) / 100;

  let combinedClassName = clsx('price-change-percentage', {
    negative: roundedValue < 0,
    positive: roundedValue > 0,
    zero: roundedValue === 0,
  });

  let priceChangePercentage;
  if (roundedValue > 1000000000) {
    priceChangePercentage = `${Math.round(roundedValue / 1000000000)}B%`;
  } else if (roundedValue > 1000000) {
    priceChangePercentage = `${Math.round(roundedValue / 1000000)}M%`;
  } else if (roundedValue > 1000) {
    priceChangePercentage = `${Math.round(roundedValue / 1000)}K%`;
  } else {
    priceChangePercentage = `${roundedValue}%`;
  }

  return (
    <div className={combinedClassName}>
      <span>{priceChangePercentage}</span>
    </div>
  );
}

function MarketPriceTable() {
  const [marketData, setMarketData] = useState(null);
  const [currency, setCurrency] = useState('krw');
  const nextPage = useRef(1);

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
    if (updatedData[currency] === undefined) {
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

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await fetchAndUpdateMarketData(nextPage.current, 'krw');
        await fetchAndUpdateMarketData(nextPage.current, 'usd');
      } catch (error) {
        console.log(error);
      }
    };

    fetchInitialData();
  }, []);

  let fetchingData = false;

  const handlePageChange = async (params) => {
    const { page, pageSize } = params;
    const currentPage = page + 1;
    const lastPage = Math.ceil(marketData.krw.length / pageSize);

    if (currentPage === lastPage) {
      if (!fetchingData) {
        fetchingData = true;
        try {
          nextPage.current += 1;
          await fetchAndUpdateMarketData(nextPage.current, 'krw');
          await fetchAndUpdateMarketData(nextPage.current, 'usd');
        } catch (error) {
          console.log(error);
        } finally {
          fetchingData = false;
        }
      }
    }
  };

  const formattedCoinTotalVolume = (totalVolume, currentPrice, symbol) => {
    const coinTotalVolume = totalVolume / currentPrice;
    return (
      <>
        <span className="coin-total-volume">
          {parseInt(coinTotalVolume.toFixed()).toLocaleString()}
        </span>
        <span className="coin-total-volume-symbol">{symbol.toUpperCase()}</span>
      </>
    );
  };

  const getCurrency = () => {
    return currency === 'krw' ? '￦' : '$';
  };

  const changeCurrency = () => {
    currency === 'krw' ? setCurrency('usd') : setCurrency('krw');
  };

  const formattedCurrency = (value) => {
    return (
      getCurrency() +
      value.toLocaleString(undefined, { maximumFractionDigits: 10 })
    );
  };

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 40,
      headerClassName: 'custom-header',
      renderCell: (params) => <span className="coin-id">{params.value}</span>,
    },
    {
      field: 'name',
      headerName: '화폐 이름',
      width: 186,
      editable: false,
      headerClassName: 'custom-header',
      renderCell: (params) => (
        <div className="coin-name-container">
          <img
            className="coin-image"
            src={
              params.row.image !== 'missing_large.png'
                ? params.row.image
                : defaultImg
            }
            alt={params.value}
          />
          <div className="coin-description">
            <span className="coin-name">{params.value}</span>
            <span className="coin-symbol">{params.row.symbol}</span>
          </div>
        </div>
      ),
    },
    {
      field: 'current_price',
      headerName: '가격',
      width: 243,
      editable: false,
      headerAlign: 'right',
      align: 'right',
      headerClassName: 'custom-header',
      renderCell: (params) => (
        <span className="coin-price">
          {params.value && formattedCurrency(params.value)}
        </span>
      ),
    },
    {
      field: 'market_cap',
      headerName: '총 시가',
      width: 214,
      editable: false,
      headerAlign: 'right',
      align: 'right',
      headerClassName: 'custom-header',
      renderCell: (params) => (
        <span className="market-cap">{formattedCurrency(params.value)}</span>
      ),
    },
    {
      field: 'total_volume',
      headerName: '24시간 거래량',
      width: 214,
      editable: false,
      headerAlign: 'right',
      align: 'right',
      headerClassName: 'custom-header',
      renderCell: (params) => (
        <div className="total-volume-container">
          {params.value !== null ? (
            <>
              <span className="total-volume">
                {params.value && formattedCurrency(params.value)}
              </span>
              <div className="coin-total-volume-container">
                {formattedCoinTotalVolume(
                  params.value,
                  params.row.current_price,
                  params.row.symbol
                )}
              </div>
            </>
          ) : (
            <div className="total-volume">-</div>
          )}
        </div>
      ),
    },
    {
      field: 'price_change_percentage_1h_in_currency',
      headerName: '1시간 변동폭',
      type: 'number',
      width: 135,
      editable: false,
      headerAlign: 'right',
      align: 'right',
      headerClassName: 'custom-header',
      renderCell: (params) => PriceChangePercentage(params),
    },
    {
      field: 'price_change_percentage_24h_in_currency',
      headerName: '24시간 변동폭',
      type: 'number',
      width: 135,
      editable: false,
      headerAlign: 'right',
      align: 'right',
      headerClassName: 'custom-header',
      renderCell: (params) => PriceChangePercentage(params),
    },
    {
      field: 'price_change_percentage_7d_in_currency',
      headerName: '7일 변동폭',
      type: 'number',
      width: 135,
      editable: false,
      headerAlign: 'right',
      align: 'right',
      headerClassName: 'custom-header',
      renderCell: (params) => PriceChangePercentage(params),
    },
  ];

  return (
    <div className="body">
      <button style={{ fontSize: '2rem' }} onClick={changeCurrency}>
        {currency === 'krw' ? '원화' : '달러'}
      </button>
      <div className="market-price-table">
        <h2 className="market-price-table-title">전체 암호화폐 시세</h2>
        <DataGrid
          style={{
            border: 'none',
            borderRadius: '0',
            borderTop: '1px solid #161c2f',
          }}
          rows={(marketData && marketData[currency]) || []}
          columns={columns}
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
        />
      </div>
    </div>
  );
}

export default MarketPriceTable;