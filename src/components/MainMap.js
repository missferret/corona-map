import React from 'react';
import GoogleMapReact from 'google-map-react';
import { inject, Observer } from 'mobx-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

  const MainMapView = ({ store }) => {
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  return (
    <Observer>
      {() => {
        const { locations } = store.map;
        return (
          <div style={{ height: '100vh', width: '60%' }}>
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
                      key={locationData.id}
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
      }}

    </Observer>
  )
};

export const MainMap = inject('store')(MainMapView);

