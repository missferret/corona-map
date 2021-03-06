import React, { useCallback } from 'react';
import { LocationForm } from './LocationForm';
import { Observer } from 'mobx-react';
import { Typography, ListItem, ListItemText, IconButton } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons'
import moment from 'moment';

export const LocationItem = ({ location, onDelete, onEdit, setOpenState, isOpen = false }) => {
  const deleteLocation = useCallback(() => {
    onDelete(location.id)
  }, [location]);

  const handleEdit = useCallback((itemId, data) => {
    onEdit(itemId, data);
    setOpenState(itemId, false);
  }, [location]);

  return (
    <Observer>
      {() => {
        const { id, name, date, startTime, endTime } = location;
        const formattedDate = moment(date).format('l');
        const formattedTime = time => moment(time).format("HH:mm");

        return (
          <>
            <ListItem disableGutters key={location.id} style={{ borderTop: '1px solid #f0f0f0' }}>
              <ListItemText>
                <Typography>{name}</Typography>
                <Typography variant="caption">
                  {`${formattedDate} between ${formattedTime(startTime)} and ${formattedTime(endTime)}`}
                </Typography>
              </ListItemText>
              <IconButton edge="end" aria-label="delete" onClick={() => setOpenState(id, !isOpen)}>
                <Edit />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={deleteLocation}>
                <Delete />
              </IconButton>
            </ListItem>
            {isOpen &&
              <LocationForm
                existingLocation={location}
                onEdit={handleEdit}
              />
            }
          </>
        )
      }}
    </Observer>
  );
};
