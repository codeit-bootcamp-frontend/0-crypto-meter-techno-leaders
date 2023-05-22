import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { formatDate } from '/src/utils/formatDate';
import ChipBox from '/src/components/MainBoard/ChipBox';

const apiKey = import.meta.env.VITE_COINGECKO_KEY;

function convertToChartData(data, currency, period) {
  const chartData = data?.map((elem) => {
    const formattedDate = millisecondsToDate(elem[0], period);
    let price;
    if (currency === 'krw') {
      price = Math.round(elem[1]);
    } else if (currency === 'usd') {
      price = +elem[1].toFixed(2);
    }

    return { x: formattedDate, y: price };
  });
  return chartData;
}

function hourMinuteString(hour, minute) {
  const amPm = hour < 12 ? '오전' : '오후';
  const formatHour = (hour % 13) + Math.floor(hour / 13);
  const formatMinute = minute < 10 ? '0' + String(minute) : minute;

  return `${amPm} ${formatHour}:${formatMinute}`;
}

function millisecondsToDate(milliseconds, type = 'year') {
  const date = new Date(milliseconds);
  const formattedDate = formatDate(date);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const formatHourMinute = hourMinuteString(hour, minute);

  if (type === 'all' || type === 'year' || type === 'month') {
    return formattedDate;
  } else if (type === 'week' || type === 'day') {
    return `${formattedDate} ${formatHourMinute}`;
  }
}

/* period에 따라 API 요청 */
async function getMarketChartData(id, currency, period) {
  const mapper = {
    all: {
      days: 'max',
      interval: 'daily',
    },
    year: {
      days: 365,
      interval: 'daily',
    },
    month: {
      days: 30,
      interval: 'daily',
    },
    week: {
      days: 7,
      interval: 'hourly',
    },
    day: {
      days: 1,
      interval: 'auto', // 5 minutes
    },
  };

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?x_cg_pro_api_key=${apiKey}&vs_currency=${currency}&days=${mapper[period].days}&interval=${mapper[period].interval}`
    );
    const marketChartData = await response.json();
    return marketChartData;
  } catch (error) {
    console.log(error);
    throw new Error();
  }
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  {
    id: 'tooltipLine',
    afterDraw: function (chart) {
      if (chart.tooltip._active && chart.tooltip._active.length) {
        const ctx = chart.ctx;
        const activePoint = chart.tooltip._active[0];
        const x = activePoint.element.x;
        const y = activePoint.element.y;
        const topY = chart.scales.y.top;
        const bottomY = chart.scales.y.bottom;
        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.moveTo(x, topY);
        ctx.lineTo(x, y - 50);
        ctx.moveTo(x, y + 5);
        ctx.lineTo(x, bottomY);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#262A38';
        ctx.stroke();
        ctx.restore();
      }
    },
  }
);

const getChartData = (canvas, data, currency, fluctuation, period = 'year') => {
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 411);
  if (fluctuation === 'increase') {
    gradient.addColorStop(0, 'rgba(0, 166, 97, 0.5)');
    gradient.addColorStop(0.5, 'rgba(9, 177, 76, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  } else {
    gradient.addColorStop(0, 'rgba(253, 73, 61, 1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  }
  const chartBoarderColor = fluctuation === 'increase' ? '#00A661' : '#FD493D';
  const pointBackgroundColor =
    fluctuation === 'increase' ? '#00A661' : '#FD493D';
  return {
    datasets: [
      {
        pointRadius: 0,
        fill: true,
        backgroundColor: gradient,
        borderColor: chartBoarderColor,
        borderWidth: 2,
        pointHoverBackgroundColor: pointBackgroundColor,
        pointHoverBorderWidth: 3,
        data: convertToChartData(data, currency, period),
      },
    ],
  };
};

const options = (period, currency) => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        yAlign: 'bottom',
        displayColors: false,
        callbacks: {
          label: function (tooltipItem) {
            if (currency === 'krw') return `￦${tooltipItem.formattedValue}`;
            else if (currency === 'usd')
              return `$${tooltipItem.formattedValue}`;
          },
        },
        titleColor: '#A2A7B7',
        bodyAlign: 'center',
      },
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          maxTicksLimit: 4,
          callback: function (index) {
            const label = this.getLabelForValue(index);
            if (period === 'all' || period === 'year') {
              if (label.slice(-3) === ' 1일') return label.slice(0, -3);
            } else if (period === 'month') {
              if (index !== 0 && index % 4 === 0) return label;
            } else if (period === 'week') {
              if (label.slice(-5, -3) === ' 0') return label.slice(0, -8);
            } else {
              if (Number(label.slice(-2)) < 5)
                return label.slice(13, -3) + '시';
            }
          },
        },
      },
      y: {
        ticks: {
          callback: function (value) {
            const label = this.getLabelForValue(value);
            const deletedComma = label.replaceAll(',', '');
            return `${deletedComma.slice(0, 1)},${deletedComma.slice(1, 4)}만`;
          },
        },
      },
    },
  };
};

const periodValues = ['all', 'year', 'month', 'week', 'day'];
const periodNames = ['전체', '1년', '1달', '1주', '1일'];

function CoinChart({ id, currency, fluctuation }) {
  const [selectedPeriod, setSelectedPeriod] = useState('year');
  const [coinData, setCoinData] = useState(null);
  const canvas = document.createElement('canvas');

  const chartData = getChartData(
    canvas,
    coinData,
    currency,
    fluctuation,
    selectedPeriod
  );

  const getAndSetCoinData = async (id, currency, period) => {
    let result;
    try {
      result = await getMarketChartData(id, currency, period);
    } catch (error) {
      return;
    }
    const { prices } = result;
    setCoinData(prices);
  };

  useEffect(() => {
    getAndSetCoinData(id, currency, selectedPeriod);
  }, [id, currency, selectedPeriod]);

  return (
    <>
      <ChipBox
        values={periodValues}
        names={periodNames}
        activeValue={selectedPeriod}
        onChange={setSelectedPeriod}
      />
      <Line data={chartData} options={options(selectedPeriod, currency)} />
    </>
  );
}

export default CoinChart;
