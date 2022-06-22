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
import styled from 'styled-components';

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
      position: 'cursor',
      callbacks: {
        label: ({ raw }) => (`${raw[0]} - ${raw[1].substring(0, raw[1].indexOf(' '))}`),
      },
    },
  },
  scales: {
  },
};

const randomColor = () => (`hsl(${Math.floor(Math.random() * 360)}, ${Math.floor(Math.random() * 31) + 70}%, ${Math.floor(Math.random() * 21) + 40}%)`);

function TimelineChart({
  timeData, setTimeData, labels, setLabels,
}) {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const [edit, setEdit] = useState(false);
  const [editEvent, setEditEvent] = useState('');
  const [editStartDate, setEditStartDate] = useState('');
  const [editEndDate, setEditEndDate] = useState('');
  const [index, setIndex] = useState(0);
  const [editData, setEditData] = useState({});
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
      setEdit(true);
      // newTimeData[element[0].index].backgroundColor = randomColor();
      // setTimeData(newTimeData);
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
      const startDate = new Date(entry.startDate);
      const endDate = new Date(`${entry.endDate} 23:59:59`);
      if (startDate < minDate) {
        minDate = startDate;
      }
      if (endDate > maxDate) {
        maxDate = endDate;
      }
      data2.push([entry.startDate, `${entry.endDate} 23:59:59`]);
      backgroundColor.push(entry.backgroundColor);
    });

    options.scales = {
      x: {
        type: 'time',
        min: minDate,
        max: maxDate,
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
          <button
            type="button"
            onClick={() => {
              if (editEvent.length) {
                const newTimeData = [...timeData];
                newTimeData[index].startDate = editStartDate;
                newTimeData[index].endDate = editEndDate;
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
