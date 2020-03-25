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

export const LocationForm = ({ onAdd }) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
  const handleDateChange = date => {
    setSelectedDate(date);
  };
    return (
      <>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <PlacesAutocomplete/>
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
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Until"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </div>
          </FormGroup>
        </MuiPickersUtilsProvider>
        <Button variant="contained" color="primary" onClick={() => onAdd({
          id: 333,
          name: "Boop",
          lat: 59.955417,
          lng: 30.337847,
          date: '10/3/20',
          time: '15:00'
        })}>
          add
        </Button>
      </>
  )
};
