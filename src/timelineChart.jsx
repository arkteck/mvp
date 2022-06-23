import React, { useState, useEffect, useRef } from 'react';
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
import { Bar, getElementAtEvent } from 'react-chartjs-2';
import Zoom from 'chartjs-plugin-zoom';
import 'chartjs-adapter-date-fns';
import styled from '@emotion/styled';
import { Button, Input } from '@mui/material';

const TimelineDiv = styled.div`
  position: relative;
  width: 80%;
  height: 80%;
  margin: 10px;
  padding: 10px;
`;

const EditModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;

Tooltip.positioners.cursor = (elem, coordinates) => (coordinates);

const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 0,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    zoom: {
      limits: {
        x: { min: 'original', max: 'original', minRange: 86400000 },
        y: { min: 'original', max: 'original' },
      },
      pan: { enabled: true, mode: 'x', threshold: 10 },
      zoom: {
        mode: 'x',
        wheel: {
          enabled: true,
        },
      },
    },
    tooltip: {
      enabled: true,
      position: 'cursor',
      callbacks: {
        label: ({ raw }) => (`${raw[0]} - ${raw[1].substring(0, raw[1].indexOf(' '))}`),
      },
    },
  },
  scales: {
  },
};

const convertStart = (d) => (`${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${(d.getDate()).toString().padStart(2, '0')}`);
const convertEnd = (d) => (`${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${(d.getDate()).toString().padStart(2, '0')} 23:59:00`);

function hslToHex(h, s, l) {
  const a = (s * Math.min(l / 100, 1 - l / 100)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const clr = l / 100 - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * clr).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function TimelineChart({
  timeData, setTimeData, labels, setLabels,
}) {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [edit, setEdit] = useState(false);
  const [editEvent, setEditEvent] = useState('');
  const [editStartDate, setEditStartDate] = useState('');
  const [editEndDate, setEditEndDate] = useState('');
  const [index, setIndex] = useState(0);
  const [color, setColor] = useState('');
  const chartRef = useRef();

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

  const handleClick = (e) => {
    const element = getElementAtEvent(chartRef.current, e);
    if (element.length) {
      setIndex(element[0].index);
      setEditEvent(labels[element[0].index]);
      setEditStartDate(timeData[element[0].index].startDate);
      setEditEndDate(timeData[element[0].index].endDate);
      let clr = timeData[element[0].index].backgroundColor;
      if (clr[0] === 'h') {
        const match = clr.match(/\d+/g);
        clr = hslToHex(Number(match[0]), Number(match[1]), Number(match[2]));
      }
      setColor(clr);
      setEdit(true);
    } else {
      setEdit(false);
    }
  };

  useEffect(() => {
    const data2 = [];
    const backgroundColor = [];
    let minDate = Date.now();
    let maxDate = Date.now();

    timeData.forEach((entry) => {
      if (entry.startDate < minDate) {
        minDate = entry.startDate;
      }
      if (entry.endDate > maxDate) {
        maxDate = entry.endDate;
      }
      data2.push([convertStart(entry.startDate), convertEnd(entry.endDate)]);
      backgroundColor.push(entry.backgroundColor);
    });

    options.scales = {
      x: {
        type: 'time',
        min: minDate,
        max: maxDate + 86400000,
        time: {
          minUnit: 'day',
          displayFormats: {
            day: 'MMM d yyyy',
          },
        },
      },
    };

    setData({
      labels,
      datasets: [
        {
          label: 'Events',
          data: data2,
          backgroundColor,
        },
      ],
    });
  }, [timeData]);

  return (
    <TimelineDiv>
      <Bar
        data={data}
        options={options}
        ref={chartRef}
        onClick={handleClick}
      />
      {edit ? (
        <EditModal>
          <input
            type="text"
            value={editEvent}
            onChange={(e) => { setEditEvent(e.target.value); }}
          />
          <input
            type="date"
            value={editStartDate}
            onChange={(e) => { setEditStartDate(e.target.value); }}
          />
          <input
            type="date"
            value={editEndDate}
            onChange={(e) => { setEditEndDate(e.target.value); }}
          />
          <input
            type="color"
            value={color}
            onChange={(e) => { setColor(e.target.value); }}
          />
          <button
            type="button"
            onClick={() => {
              if (editEvent.length) {
                const newTimeData = [...timeData];
                newTimeData[index].startDate = editStartDate;
                newTimeData[index].endDate = editEndDate;
                newTimeData[index].backgroundColor = color;
                const newLabels = [...labels];
                newLabels[index] = editEvent;
                setLabels(newLabels);
                setTimeData(newTimeData);
                setEdit(false);
              }
            }}
          >
            Submit
          </button>
        </EditModal>
      ) : null}
    </TimelineDiv>
  );
}

export default TimelineChart;
