import React from 'react';
import { LocationForm } from './LocationForm';
import { inject, Observer } from 'mobx-react';
import { Typography, List, ListItem, ListItemText, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons'

const LocationsListView = ({ store }) => {
  return (
    <Observer>
      {() => {
        const { addLocation, deleteLocation, locations } = store.map;
        return (
          <div style={{ width: '40%', padding: 20 }}>
            <Typography>Add a new location</Typography>
            <LocationForm onAdd={addLocation}/>
            <List disablePadding style={{ marginTop: 20 }}>
              {
                Object.keys(locations).map(location => {
                  const locationData = locations[location];
                  return (
                    <ListItem disableGutters key={locationData.id} style={{ borderTop: '1px solid #f0f0f0' }}>
                      <ListItemText>
                        <Typography>{locationData.name}</Typography>
                        <Typography variant="caption">
                          from {locationData.startTime}&nbsp;
                          Until {locationData.endTime}
                        </Typography>
                      </ListItemText>
                      <Typography variant="caption">
                        {locationData.date}
                      </Typography>
                      <IconButton edge="end" aria-label="delete" onClick={() => deleteLocation(location)}>
                        <Delete />
                      </IconButton>
                    </ListItem>
                  )
                })
              }
            </List>
          </div>
        )
      }}
    </Observer>
  );
};

export const LocationsList = inject('store')(LocationsListView);

