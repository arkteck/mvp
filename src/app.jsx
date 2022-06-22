import React, { useState, useEffect } from 'react';
import TimeInput from './timeInput';
import TimeDataDisplay from './timeDataDisplay';

function App() {
  const [timeData, setTimeData] = useState([]);

  return (
    <>
      <TimeInput timeData={timeData} setTimeData={setTimeData} />
      <TimeDataDisplay timeData={timeData} />
    </>
  );
}

export default App;
