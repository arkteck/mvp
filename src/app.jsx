import React, { useState } from 'react';
import TimeInput from './timeInput';
import TimeDataDisplay from './timeDataDisplay';
import TimelineChart from './timelineChart';

function App() {
  const [timeData, setTimeData] = useState([]);
  const [labels, setLabels] = useState([]);

  return (
    <>
      <TimeInput
        timeData={timeData}
        setTimeData={setTimeData}
        labels={labels}
        setLabels={setLabels}
      />
      <TimeDataDisplay timeData={timeData} />
      <TimelineChart timeData={timeData} labels={labels} />
    </>
  );
}

export default App;
