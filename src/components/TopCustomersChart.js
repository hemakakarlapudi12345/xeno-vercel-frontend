import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopCustomersChart = ({ customers = [] }) => {
  const safeCustomers = Array.isArray(customers) ? customers : [];

  const data = {
    labels: safeCustomers.map(c => c.customer_email || 'Unknown'),
    datasets: [
      {
        label: 'Total Spent',
        data: safeCustomers.map(c => parseFloat(c.total_spent) || 0),

        backgroundColor: 'rgba(255,99,132,0.5)',
      },
    ],
  };

  return <Bar data={data} />;
};

export default TopCustomersChart;
