import React from 'react';
import { LocationForm } from './LocationForm';
import { inject, Observer } from 'mobx-react';
import { Typography, List } from '@material-ui/core';
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
          <div style={{ width: '40%', padding: 20 }}>
            <Typography>Add a new location</Typography>
            <LocationForm onAdd={addLocation}/>
            <List disablePadding style={{ marginTop: 20 }}>
              {
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
              }
            </List>
          </div>
        )
      }}
    </Observer>
  );
};

export const LocationsList = inject('store')(LocationsListView);

