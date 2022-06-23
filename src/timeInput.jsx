import React, { useState } from 'react';
import { Button, Input, TextField } from '@mui/material';
import styled from '@emotion/styled';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const InputDiv = styled.div`
  margin-top: 15px;
  > * {
    margin: 10px
  }
`;

const today = new Date();
const todayString = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate()}`;
const randomColor = () => (`hsl(${Math.floor(Math.random() * 360)}, ${Math.floor(Math.random() * 31) + 70}%, ${Math.floor(Math.random() * 21) + 40}%)`);

function TimeInput({
  timeData, setTimeData, labels, setLabels,
}) {
  const [event, setEvent] = useState('');
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  return (
    <InputDiv>
      <span>
        <TextField
          variant="outlined"
          label="Event"
          value={event}
          onChange={(e) => { setEvent(e.target.value); }}
        />
      </span>
      <span>
        <DatePicker
          label="Start Date"
          renderInput={(params) => <TextField {...params} />}
          value={startDate}
          onChange={(d) => { setStartDate(d); }}
        />
      </span>
      <span>
        <DatePicker
          label="End Date"
          renderInput={(params) => <TextField {...params} />}
          value={endDate}
          onChange={(d) => { setEndDate(d); }}
        />
      </span>
      <span>
        <Button
          variant="contained"
          onClick={() => {
            if (event.length) {
              const newTimeData = [...timeData];
              newTimeData.push({
                startDate,
                endDate,
                backgroundColor: randomColor(),
              });
              const newLabels = [...labels];
              newLabels.push(event);
              // setEvent('');
              // setStartDate(today);
              // setEndDate(today);
              setLabels(newLabels);
              setTimeData(newTimeData);
            }
          }}
        >
          Submit
        </Button>
      </span>
      <span>
        <Button
          variant="outlined"
          onClick={() => {
            const combined = [];
            timeData.forEach((a, i) => {
              const temp = a;
              temp.label = labels[i];
              combined.push(temp);
            });
            combined.sort((a, b) => {
              const start1 = new Date(a.startDate);
              const start2 = new Date(b.startDate);
              if (start1 === start2) {
                const end1 = new Date(a.endDate);
                const end2 = new Date(b.endDate);
                return end1 - end2;
              }
              return start1 - start2;
            });
            const newTimeData = [];
            const newLabels = [];
            combined.forEach((a) => {
              const newD = a;
              newLabels.push(newD.label);
              delete newD.label;
              newTimeData.push(newD);
            });
            setLabels(newLabels);
            setTimeData(newTimeData);
          }}
        >
          Reorder
        </Button>
      </span>
    </InputDiv>
  );
}

export default TimeInput;
