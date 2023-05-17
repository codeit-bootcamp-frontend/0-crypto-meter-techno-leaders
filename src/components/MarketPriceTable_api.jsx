import { useState, useEffect, useCallback, useRef } from 'react';
import * as React from 'react';
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import '/src/components/MarketPriceTable.css';
import clsx from 'clsx';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      style={{ margin: '3rem auto 0', color: 'red' }}
      color="primary"
      // variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      // @ts-expect-error
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
  );
}

function getPriceChangePercentageDiv(value) {
  const slicedValue = value.toFixed(2);
  const combinedClassName = clsx('price-change-percentage', {
    ['negative']: slicedValue < 0,
    ['positive']: slicedValue > 0,
  });
  return (
    <div className={combinedClassName}>
      <span>{slicedValue}</span>
    </div>
  );
}

function MarketPriceTable() {
  const [marketData, setMarketData] = useState([]);
  const [Currency, setCurrency] = useState('krw');
  const nextPage = useRef(1);

  const fetchDataFromApi = async (page) => {
    try {
      const response1 = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=krw&order=market_cap_desc&per_page=250&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`
      );
      const response2 = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`
      );
      const data1 = await response1.json();
      const data2 = await response2.json();
      const formattedData1 = data1.map((item, index) => ({
        ...item,
        id: marketData.krw ? index + marketData.krw.length + 1 : index + 1,
      }));
      const formattedData2 = data2.map((item, index) => ({
        ...item,
        id: marketData.krw ? index + marketData.krw.length + 1 : index + 1,
      }));

      marketData.length === 0
        ? setMarketData({
            krw: formattedData1,
            usd: formattedData2,
          })
        : setMarketData({
            krw: [...marketData.krw].concat(formattedData1),
            usd: [...marketData.usd].concat(formattedData2),
          });

      nextPage.current += 1;
    } catch (error) {
      console.error(error);
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
    return Currency === 'krw' ? '￦' : '$';
  };

  const formattedCurrency = (value) => {
    return getCurrency() + value.toLocaleString();
  };

  const handlePageChange = async (params) => {
    const { page, pageSize } = params;
    const currentPage = page + 1;
    const lastPage = Math.ceil(marketData.krw.length / pageSize);
    if (currentPage === lastPage) {
      await fetchDataFromApi(nextPage.current);
    }
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
            src={params.row.image}
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
        <span className="coin-price">{formattedCurrency(params.value)}</span>
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
          <span className="total-volume">
            {formattedCurrency(params.value)}
          </span>
          <div className="coin-total-volume-container">
            {formattedCoinTotalVolume(
              params.value,
              params.row.current_price,
              params.row.symbol
            )}
          </div>
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
      renderCell: getPriceChangePercentageDiv,
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
      renderCell: getPriceChangePercentageDiv,
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
      renderCell: getPriceChangePercentageDiv,
    },
  ];

  useEffect(() => {
    fetchDataFromApi(nextPage.current);
  }, []);

  return (
    <div className="body">
      <div className="market-price-table">
        <h2 className="market-price-table-title">전체 암호화폐 시세</h2>
        <button
          onClick={() => {
            Currency === 'krw' ? setCurrency('usd') : setCurrency('krw');
          }}
        >
          통화변경
        </button>
        <DataGrid
          style={{
            border: 'none',
            borderRadius: '0',
            borderTop: '1px solid #161c2f',
          }}
          rows={marketData}
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
