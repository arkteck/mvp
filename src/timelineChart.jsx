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
import styled from 'styled-components';

const TimelineDiv = styled.div`
  width: 80%;
  height: 80%;
  margin: 10px;
  padding: 10px;
`;

const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  plugins: {
    legend: {
      display: false,
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
        label: ({ raw }) => (`${raw[0]} - ${raw[1].substring(0, raw[1].indexOf(' '))}`),
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
      const endDate = new Date(`${entry.endDate} 23:59:59`);
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
    <TimelineDiv>
      <Bar
        data={data}
        options={options}
      />
    </TimelineDiv>
  );
}

export default TimelineChart;
