import React from 'react';
import { locations } from '../stubs/locations';

export const LocationForm = ({ onAdd }) => {
  return (
    <div>
      <button onClick={() => onAdd({
        id: 333,
        name: "Boop",
        lat: 59.955417,
        lng: 30.337847,
        date: '10/3/20',
        time: '15:00'
      })}>
        add
      </button>
    </div>
  )
};
