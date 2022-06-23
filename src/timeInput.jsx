import React, { useState, useRef } from 'react';
import { Button, TextField } from '@mui/material';
import styled from '@emotion/styled';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const InputDiv = styled.div`
  margin-top: 15px;
  > * {
    margin: 10px
  }
`;

const today = new Date();
const randomColor = () => (`hsl(${Math.floor(Math.random() * 360)}, ${Math.floor(Math.random() * 31) + 70}%, ${Math.floor(Math.random() * 31) + 30}%)`);
let order = true;

function TimeInput({
  timeData, setTimeData, labels, setLabels,
}) {
  const [event, setEvent] = useState('');
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [helper, setHelper] = useState(false);
  const [helper2, setHelper2] = useState(false);
  const eventRef = useRef();
  const startRef = useRef();

  return (
    <InputDiv>
      <span>
        <TextField
          variant="outlined"
          label="Event"
          value={event}
          inputRef={eventRef}
          onChange={(e) => { setEvent(e.target.value); }}
          helperText={helper ? 'Please enter an event.' : ''}
        />
      </span>
      <span>
        <DatePicker
          label="Start Date"
          renderInput={(params) => <TextField {...params} helperText={helper2 ? 'Start date cannot be after end date.' : ''} />}
          value={startDate}
          inputRef={startRef}
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
            if (event.length && endDate - startDate >= 0) {
              setHelper(false);
              setHelper2(false);
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
            } else {
              if (event.length === 0) {
                if (eventRef.current) {
                  setHelper(true);
                  eventRef.current.focus();
                }
              } else {
                setHelper(false);
              }
              if (endDate - startDate < 0) {
                if (startRef.current) {
                  setHelper2(true);
                }
              } else {
                setHelper2(false);
              }
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
            if (order) {
              combined.sort((a, b) => {
                const start1 = new Date(a.startDate);
                const start2 = new Date(b.startDate);
                if (start1 - start2 === 0) {
                  const end1 = new Date(a.endDate);
                  const end2 = new Date(b.endDate);
                  return end1 - end2;
                }
                return start1 - start2;
              });
            } else {
              combined.sort((a, b) => {
                const start1 = new Date(a.startDate);
                const start2 = new Date(b.startDate);
                if (start1 - start2 === 0) {
                  const end1 = new Date(a.endDate);
                  const end2 = new Date(b.endDate);
                  return end2 - end1;
                }
                return start2 - start1;
              });
            }
            order = !order;
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
