import React, { useState } from 'react';
import TimeInput from './timeInput';
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
      <TimelineChart timeData={timeData} labels={labels} />
    </>
  );
}

export default App;
