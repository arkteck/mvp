import React, { useState, useEffect } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';
import TimeInput from './timeInput';
import TimelineChart from './timelineChart';

function App() {
  const [timeData, setTimeData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    axios.get('/loadSession')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimeInput
        timeData={timeData}
        setTimeData={setTimeData}
        labels={labels}
        setLabels={setLabels}
      />
      <TimelineChart
        timeData={timeData}
        setTimeData={setTimeData}
        labels={labels}
        setLabels={setLabels}
      />
    </LocalizationProvider>
  );
}

export default App;
