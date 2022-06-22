import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Zoom from 'chartjs-plugin-zoom';
import 'chartjs-adapter-date-fns';

const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    },
    zoom: {
      limits: {
        x: { min: 'original', max: 'original' },
        y: { min: 'original', max: 'original' },
      },
      pan: { enabled: true, mode: 'xy', threshold: 10 },
      zoom: {
        mode: 'x',
        wheel: {
          enabled: true,
        },
      },
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: ({ raw }) => (`${raw[0]} - ${raw[1]}`),
      },
    },
  },
  scales: {
  },
};

function TimelineChart({ timeData, labels }) {
  const [data, setData] = useState({ labels: [], datasets: [] });

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Zoom,
    TimeScale,
  );

  useEffect(() => {
    const data2 = [];
    let minDate = Date.now();
    let maxDate = Date.now();
    timeData.forEach((entry) => {
      const startDate = new Date(entry.startDate);
      const endDate = new Date(entry.endDate);
      if (startDate < minDate) {
        minDate = startDate;
      }
      if (endDate > maxDate) {
        maxDate = endDate;
      }
      data2.push([entry.startDate, `${entry.endDate} 23:59:59`]);
    });
    options.scales = {
      x: {
        type: 'time',
        min: minDate,
        max: maxDate,
      },
    };
    setData({
      labels,
      datasets: [
        {
          label: 'Events',
          data: data2,
          backgroundColor: 'rgba(255, 99, 132, 1)',
          borderColor: 'rgb(255, 99, 132)',
        },
      ],
    });
  }, [timeData]);

  return (
    <Bar
      data={data}
      options={options}
    />
  );
}

export default TimelineChart;
