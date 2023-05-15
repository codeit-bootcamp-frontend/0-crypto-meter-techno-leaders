import { useState, useEffect, useCallback } from 'react';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import '/src/components/MarketPriceTable.css';
import clsx from 'clsx';

function getPriceChangePercentageDiv(params) {
  const value = params.value.toFixed(2);
  let cellClassName = '';
  if (value < 0) {
    cellClassName = 'negative';
  } else if (value > 0) {
    cellClassName = 'positive';
  }
  const combinedClassName = clsx('price-change-percentage', cellClassName);
  return (
    <div className={combinedClassName}>
      <span>{value}</span>
    </div>
  );
}

function MarketPriceTable() {
  const [marketData, setMarketData] = useState([]);
  const [vsCurrency, setVsCurrency] = useState('krw');

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
    return vsCurrency === 'krw' ? '￦' : '$';
  };

  const formattedCurrency = (value) => {
    return getCurrency() + value.toLocaleString();
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

  const fetchData = useCallback(
    async (vsCurrency) => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vsCurrency}&order=market_cap_desc&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en`
        );
        const data = await response.json();
        const formattedData = data.map((item, index) => ({
          ...item,
          id: index + 1,
        }));
        setMarketData(formattedData);
      } catch (error) {
        console.error(error);
      }
    },
    [vsCurrency]
  );

  useEffect(() => {
    fetchData(vsCurrency);
  }, [vsCurrency]);

  return (
    <div className="body">
      <div className="market-price-table">
        <h2 className="market-price-table-title">전체 암호화폐 시세</h2>
        <button
          onClick={() => {
            vsCurrency === 'krw' ? setVsCurrency('usd') : setVsCurrency('krw');
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
          pageSizeOptions={[5]}
          checkboxSelection={false}
          disableRowSelectionOnClick={true}
          rowHeight={80}
          headerHeight={20}
        />
      </div>
    </div>
  );
}

export default MarketPriceTable;
