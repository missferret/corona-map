import React from 'react';
import GoogleMapReact from 'google-map-react';
import { inject, Observer } from 'mobx-react';
import { Marker } from './Marker';

const MainMapView = ({ store }) => {
  const defaultProps = {
    center: {
      lat: 32.0853,
      lng: 34.7818
    },
    zoom: 9
  };

    const distanceToMouse = (pt, mousePos) => {
      if (pt && mousePos) {
        return Math.sqrt(
          (pt.x - mousePos.x) * (pt.x - mousePos.x) +
          (pt.y - mousePos.y) * (pt.y - mousePos.y)
        );
      }
    };

  return (
    <Observer>
      {() => {
        const { locations, deleteLocation, setOpenState } = store.map;
        return (
          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
              distanceToMouse={distanceToMouse}
            >
              {
                Object.keys(locations).map(location => {
                  const locationData = locations[location];
                  return (
                    <Marker
                      key={locationData.id}
                      lat={locationData.lat}
                      lng={locationData.lng}
                      location={locationData}
                      onDelete={deleteLocation}
                      onEdit={setOpenState}
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

