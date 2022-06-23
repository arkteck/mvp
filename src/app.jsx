import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TimeInput from './timeInput';
import TimelineChart from './timelineChart';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [timeData, setTimeData] = useState([]);
  const [labels, setLabels] = useState([]);

  return (
    <ThemeProvider theme={darkTheme}>
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
    </ThemeProvider>
  );
}

export default App;
