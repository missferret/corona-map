import { Typography, Button, FormGroup } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import React from 'react';

export const Filters = ({ filters, onFilter, resetFilters }) => {
  const [ isOpen, setIsOpen ] = React.useState(false);
  const [ date, setDate ] = React.useState(filters.date);
  const [ startTime, setStartTime ] = React.useState(filters.startTime);
  const [ endTime, setEndTime ] = React.useState(filters.endTime);
  return (
   <>
     <Button onClick={() => setIsOpen(!isOpen)} style={{ position: 'absolute', top: 10, right: 10 }}>
       {`${isOpen ? 'Hide' : 'Show'} filters`}
       {isOpen ? <Close fontSize='small'/> : <Add fontSize='small'/>}
     </Button>
     {isOpen &&
      <div style={{ padding: 10, marginTop: 30, marginBottom: 25, background: 'rgb(246, 248, 253)' }}>
         <Typography variant="caption">Filter by:</Typography>
         <MuiPickersUtilsProvider utils={DateFnsUtils}>
           <FormGroup style={{ marginTop: -15 }}>
             <KeyboardDatePicker
               disableToolbar
               variant="inline"
               format="MM/dd/yyyy"
               margin="normal"
               id="date-picker-inline"
               label="Date"
               value={date}
               onChange={setDate}
               KeyboardButtonProps={{
                 'aria-label': 'change date',
               }}
             />
             {/*<div style={{ display: 'flex', justifyContent: 'space-between' }}>*/}
             {/*  <KeyboardTimePicker*/}
             {/*    margin="normal"*/}
             {/*    id="time-picker"*/}
             {/*    label="From"*/}
             {/*    value={startTime}*/}
             {/*    onChange={setStartTime}*/}
             {/*    KeyboardButtonProps={{*/}
             {/*      'aria-label': 'change time',*/}
             {/*    }}*/}
             {/*  />*/}
             {/*  <KeyboardTimePicker*/}
             {/*    margin="normal"*/}
             {/*    id="time-picker"*/}
             {/*    label="Until"*/}
             {/*    value={endTime}*/}
             {/*    onChange={setEndTime}*/}
             {/*    KeyboardButtonProps={{*/}
             {/*      'aria-label': 'change time',*/}
             {/*    }}*/}
             {/*  />*/}
             {/*</div>*/}
           </FormGroup>
         </MuiPickersUtilsProvider>
         <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
           <Button variant="text" onClick={resetFilters}>
             Reset
           </Button>
           <Button variant="outlined" onClick={() => onFilter({date, startTime, endTime})}>
             Submit
           </Button>
         </div>
       </div>
     }
   </>
  )
};

