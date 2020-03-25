import React from 'react';
import GoogleMapReact from 'google-map-react';
import { locations } from '../stubs/locations';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export const MainMap = () => {
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {
          Object.keys(locations).map(location => {
            const locationData = locations[location];
            return (
              <AnyReactComponent
                lat={locationData.lat}
                lng={locationData.lng}
                text={locationData.name}
              />
            )
          })
        }
      </GoogleMapReact>
    </div>

  )
};
