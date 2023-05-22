import React from 'react';
import PriceChangePercentage from '/src/components/MarketPriceTable/PriceChangePercentage';
import CoinTotalVolume from '/src/components/MarketPriceTable/CoinTotalVolume';
import CryptoCard from '/src/components/MarketPriceTable/CryptoCard';
import formatPrice from '/src/components/MarketPriceTable/utils/formatPrice.js';

const columns = (currency) => [
  {
    field: 'id',
    headerName: '#',
    width: 40,
    headerClassName: 'custom-header',
    renderCell: (params) => <span className="coin-id">{params.value}</span>,
    frozen: true,
  },
  {
    field: 'name',
    headerName: '화폐 이름',
    width: 186,
    editable: false,
    headerClassName: 'custom-header',
    renderCell: (params) => (
      <CryptoCard
        name={params.value}
        image={params.row.image}
        symbol={params.row.symbol}
      />
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
        {params.value !== null ? formatPrice(params.value, currency) : '-'}
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
      <span className="market-cap">
        {params.value !== null ? formatPrice(params.value, currency) : '-'}
      </span>
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
              {params.value && formatPrice(params.value, currency)}
            </span>
            <CoinTotalVolume
              totalVolume={params.value}
              currentPrice={params.row.current_price}
              symbol={params.row.symbol}
            />
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
    renderCell: (params) => <PriceChangePercentage value={params.value} />,
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
    renderCell: (params) => <PriceChangePercentage value={params.value} />,
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
    renderCell: (params) => <PriceChangePercentage value={params.value} />,
  },
];

export default columns;
