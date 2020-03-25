import React from 'react';
import { LocationForm } from './LocationForm';
import { inject, Observer } from 'mobx-react';

const LocationsListView = ({ store }) => {
  return (
    <Observer>
      {() => {
        const { addLocation, locations } = store.map;
        return (
          <div style={{ width: '40%' }}>
            <LocationForm onAdd={addLocation}/>
            {
              Object.keys(locations).map(location => {
                const locationData = locations[location];
                return (
                  <div key={locationData.id}>
                    {locationData.name}
                  </div>
                )
              })
            }
          </div>
        )
      }}
    </Observer>
  );
};

export const LocationsList = inject('store')(LocationsListView);

