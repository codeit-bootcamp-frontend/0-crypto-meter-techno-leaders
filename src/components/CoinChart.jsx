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
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { formatDate } from '/src/formatDate';
import coinYearData from '/src/assets/coins_bitcoin_marketcharts.json';
import coinMonthData from '/src/assets/coins_bitcoin_marketcharts_month.json';
import coinWeekData from '/src/assets/coins_bitcoin_marketcharts_week.json';
import coinDayData from '/src/assets/coins_bitcoin_marketcharts_day.json';
import ChipBox from '/src/components/ChipBox';

function convertToChartData(data, period = 'year') {
  const chartData = [];
  data.forEach((elem) => {
    const formattedDate = millisecondsToDate(elem[0], period);
    const price = Math.round(elem[1]);
    chartData.push({ x: formattedDate, y: price });
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

function getCoinData(period) {
  let coinData;

  if (period === 'year' || period === 'all') {
    coinData = coinYearData.prices;
  } else if (period === 'month') {
    coinData = coinMonthData.prices;
  } else if (period === 'week') {
    coinData = coinWeekData.prices;
  } else if (period === 'day') {
    coinData = coinDayData.prices;
  }

  return coinData;
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

const getChartData = (canvas, data, fluctuation, period = 'year') => {
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
        data: convertToChartData(data, period),
      },
    ],
  };
};

const options = (period) => {
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
            return `￦${tooltipItem.formattedValue}`;
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

const values = ['all', 'year', 'month', 'week', 'day'];
const names = ['전체', '1년', '1달', '1주', '1일'];

function CoinChart({ id, fluctuation }) {
  const [selectedPeriod, setSelectedPeriod] = useState('year');
  const canvas = document.createElement('canvas');
  const data = getCoinData(selectedPeriod);
  const chartData = getChartData(canvas, data, fluctuation, selectedPeriod);
  return (
    <>
      <ChipBox
        values={values}
        names={names}
        activeValue={selectedPeriod}
        onChange={setSelectedPeriod}
      />
      <Line data={chartData} options={options(selectedPeriod)} />
    </>
  );
}

export default CoinChart;
