// components/AdminDashboard/AnalyticsChart.js

import React from 'react';
import { Bar, Line, Doughnut, Radar } from 'react-chartjs-2';
import { Chart, CategoryScale,RadialLinearScale, LinearScale, BarElement, LineElement, PointElement, ArcElement } from 'chart.js';

// Register the elements and scales
Chart.register(CategoryScale,RadialLinearScale, LinearScale, BarElement, LineElement, PointElement, ArcElement);

const AnalyticsChart = ({ data, type, options }) => {
  let chartComponent;

  switch (type) {
    case 'bar':
      chartComponent = <Bar data={data} options={options} />;
      break;
    case 'line':
      chartComponent = <Line data={data} options={options} />;
      break;
    case 'doughnut':
      chartComponent = <Doughnut data={data} options={options} />;
      break;
    case 'radar':
      chartComponent = <Radar data={data} options={options} />;
      break;
    default:
      chartComponent = null;
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      {chartComponent}
    </div>
  );
};

export default AnalyticsChart;
