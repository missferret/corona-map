import React from 'react';
import { locations } from '../stubs/locations';

export const LocationsList = () => {
  return (
    <div style={{ width: '40%' }}>
      {
        Object.keys(locations).map(location => {
          const locationData = locations[location];
          return (
            <div>
              {locationData.name}
            </div>
          )
        })
      }
    </div>
  )
};
