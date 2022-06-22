import React, { useState, useEffect } from 'react';

function TimeInput({ timeData, setTimeData }) {
  const [event, setEvent] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <>
      <input
        type="text"
        value={event}
        placeholder="Event"
        onChange={(e) => { setEvent(e.target.value); }}
      />
      <input
        type="date"
        value={startDate}
        placeholder="Event"
        onChange={(e) => { setStartDate(e.target.value); }}
      />
      <input
        type="date"
        value={endDate}
        placeholder="Event"
        onChange={(e) => { setEndDate(e.target.value); }}
      />
      <button
        type="button"
        onClick={() => {
          const newTimeData = [...timeData];
          newTimeData.push({
            event,
            startDate,
            endDate,
          });
          setEvent('');
          setStartDate('');
          setEndDate('');
          setTimeData(newTimeData);
        }}
      >
        Submit
      </button>
    </>
  );
}

export default TimeInput;
