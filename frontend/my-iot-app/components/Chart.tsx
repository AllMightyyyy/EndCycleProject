'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { SensorData } from '@/types/SensorData';
import { useTheme } from '@mui/material/styles';

ChartJS.register(
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  data: SensorData[];
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  const theme = useTheme();

  const chartData = {
    labels: data.map((sensor) => new Date(sensor.timestamp)),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data.map((sensor) => sensor.temperature),
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
        yAxisID: 'y',
      },
      {
        label: 'Humidity (%)',
        data: data.map((sensor) => sensor.humidity),
        borderColor: theme.palette.secondary.main,
        backgroundColor: theme.palette.secondary.light,
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        type: 'time' as const,
        time: {
          unit: 'minute',
        },
        title: {
          display: true,
          text: 'Timestamp',
          color: theme.palette.text.primary,
        },
        ticks: {
          color: theme.palette.text.primary,
        },
        grid: {
          color: theme.palette.divider,
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Temperature (°C)',
          color: theme.palette.text.primary,
        },
        ticks: {
          color: theme.palette.text.primary,
        },
        grid: {
          color: theme.palette.divider,
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
          color: theme.palette.divider,
        },
        title: {
          display: true,
          text: 'Humidity (%)',
          color: theme.palette.text.primary,
        },
        ticks: {
          color: theme.palette.text.primary,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: theme.palette.text.primary,
        },
      },
      title: {
        display: true,
        text: 'Sensor Data',
        color: theme.palette.text.primary,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default Chart;
