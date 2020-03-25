import React from 'react';
import { Button, FormGroup } from '@material-ui/core';
import 'date-fns';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { PlacesAutocomplete } from './Autocomplete';
import { randomId } from '../utils/general';
import moment from 'moment';

export const LocationForm = ({ existingLocation, onAdd, onEdit }) => {
  const [selectedDate, setSelectedDate] = React.useState(existingLocation ? existingLocation.date : new Date('2014-08-18T21:11:54'));
  const [startTime, setStartTime] = React.useState(existingLocation ? existingLocation.startTime : new Date('2014-08-18T21:11:54'));
  const [endTime, setEndTime] = React.useState(existingLocation ? existingLocation.endTime : new Date('2014-08-18T21:11:54'));
  const [location, setLocation] =  React.useState(existingLocation);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleStartTimeChange = time => {
    setStartTime(time);
  };

  const handleEndTimeChange = time => {
    setEndTime(time);
  };

  const handleAdd = React.useCallback(() => {
    onAdd({
      id: randomId(),
      name: location.name,
      lat: location.lat,
      lng: location.lng,
      date: moment(selectedDate).format('l'),
      startTime: moment(startTime).format("HH:mm"),
      endTime: moment(endTime).format("HH:mm"),
    })
  }, [location, endTime, startTime, selectedDate]);

  const handleEdit = React.useCallback(() => {
    onEdit(location.id, {
      name: location.name,
      lat: location.lat,
      lng: location.lng,
      date: moment(selectedDate).format('l'),
      startTime: moment(startTime).format("HH:mm"),
      endTime: moment(endTime).format("HH:mm"),
    })
  }, [location, endTime, startTime, selectedDate]);

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <PlacesAutocomplete existingValue={location && location.name} onSelect={setLocation}/>
        <FormGroup style={{ marginBottom: 10 }}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="From"
              value={startTime}
              onChange={handleStartTimeChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Until"
              value={endTime}
              onChange={handleEndTimeChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </div>
        </FormGroup>
      </MuiPickersUtilsProvider>
      <Button
        variant="contained"
        disabled={!location || !location.name}
        color="primary"
        onClick={existingLocation ? handleEdit : handleAdd}>
        {existingLocation ? 'update' : 'add'}
      </Button>
    </>
  )
};
