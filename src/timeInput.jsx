import React, { useState } from 'react';

const today = new Date();
const todayString = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate()}`;

function TimeInput({
  timeData, setTimeData, labels, setLabels,
}) {
  const [event, setEvent] = useState('');
  const [startDate, setStartDate] = useState(todayString);
  const [endDate, setEndDate] = useState(todayString);

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
          if (event.length) {
            const newTimeData = [...timeData];
            newTimeData.push({
              event,
              startDate,
              endDate,
            });
            const newLabels = [...labels];
            newLabels.push(event);
            setEvent('');
            setStartDate(todayString);
            setEndDate(todayString);
            setLabels(newLabels);
            setTimeData(newTimeData);
          }
        }}
      >
        Submit
      </button>
    </>
  );
}

export default TimeInput;
