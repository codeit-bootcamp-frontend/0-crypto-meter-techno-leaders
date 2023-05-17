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
import { Line } from 'react-chartjs-2';

function convertToChartData(data) {
  const chartData = [];
  data.forEach((elem) => {
    const formattedDate = millisecondsToDate(elem[0]);
    const price = Math.round(elem[1]);
    chartData.push({ x: formattedDate, y: price });
  });
  return chartData;
}

function millisecondsToDate(milliseconds) {
  const date = new Date(milliseconds);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedDate = `${year}년 ${month}월 ${day}일`;
  return formattedDate;
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

const getChartData = (canvas, data) => {
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 411);
  gradient.addColorStop(0, 'rgba(0, 166, 97, 0.3)');
  gradient.addColorStop(0.5, 'rgba(9, 177, 76, 0.3)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  return {
    datasets: [
      {
        pointRadius: 0,
        fill: true,
        backgroundColor: gradient,
        borderColor: '#00A661',
        borderWidth: 2,
        pointHoverBackgroundColor: '#00A661',
        pointHoverBorderWidth: 3,
        data: convertToChartData(data),
      },
    ],
  };
};
const options = {
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
        callback: function (value) {
          const label = this.getLabelForValue(value);
          if (label.slice(-3) === ' 1일') {
            return label.slice(0, -3);
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

function CoinChart({ data }) {
  const canvas = document.createElement('canvas');
  const chartData = getChartData(canvas, data);
  return <Line data={chartData} options={options} />;
}

export default CoinChart;
