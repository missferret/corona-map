import React from 'react';
import GoogleMapReact from 'google-map-react';
import { inject, Observer } from 'mobx-react';
import { Marker } from './Marker';

const styles = {
  container: {
    height: '100vh',
    width: '100%',
  },
};

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
        const {
          locations,
          filteredLocations,
          deleteLocation,
          setOpenState,
          areFiltersSet,
        } = store.map;

        const list = areFiltersSet ? filteredLocations : locations;

        return (
          <div style={styles.container}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
              distanceToMouse={distanceToMouse}
            >
              {
                Object.keys(list).map(location => {
                  const locationData = list[location];
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

