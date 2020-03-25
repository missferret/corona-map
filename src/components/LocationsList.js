import React from 'react';
import { LocationForm } from './LocationForm';
import { inject, Observer } from 'mobx-react';
import { Typography, List, Paper } from '@material-ui/core';
import { LocationItem } from './LocationItem';

const LocationsListView = ({ store }) => {
  return (
    <Observer>
      {() => {
        const {
          addLocation,
          deleteLocation,
          editLocation,
          locations
        } = store.map;

        return (
          <div style={{ width: '40%', maxWidth: 500, padding: 20 }}>
            <Typography variant="h6">Add a new location</Typography>
            <LocationForm onAdd={addLocation}/>
            <Typography variant="h6">Existing Locations</Typography>
            <List disablePadding style={{ marginTop: 10 }}>
              {Object.keys(locations).length > 0
                ?
                  Object.keys(locations).map(location => {
                    const locationData = locations[location];
                    return (
                      <LocationItem
                        location={locationData}
                        onDelete={deleteLocation}
                        onEdit={editLocation}
                      />
                    )
                  })
                :
                  <Paper elevation={0} variant="outlined" square style={{ padding: 10, background: '#f0f0f0', border: 'none'}}>
                    <Typography variant="subtitle1">Add a location to view it on the map</Typography>
                  </Paper>
              }
            </List>
          </div>
        )
      }}
    </Observer>
  );
};

export const LocationsList = inject('store')(LocationsListView);

