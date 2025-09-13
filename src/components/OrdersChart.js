// src/components/OrdersChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const OrdersChart = ({ orders = [] }) => {
  // Ensure orders is always an array
  const safeOrders = Array.isArray(orders) ? orders : [];

  const data = {
    labels: safeOrders.map(o => o.order_date || ''),
    datasets: [
      {
        label: 'Orders Count',
        data: safeOrders.map(o => o.orders_count || 0),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        yAxisID: 'y1',
      },
      {
        label: 'Revenue',
        data: safeOrders.map(o => parseFloat(o.revenue) || 0),

        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
        yAxisID: 'y2',
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: { mode: 'index', intersect: false },
    stacked: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Orders & Revenue Over Time' },
    },
    scales: {
      y1: {
        type: 'linear',
        position: 'left',
        title: { display: true, text: 'Orders Count' },
      },
      y2: {
        type: 'linear',
        position: 'right',
        title: { display: true, text: 'Revenue ($)' },
        grid: { drawOnChartArea: false }, // avoid overlapping grids
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default OrdersChart;
