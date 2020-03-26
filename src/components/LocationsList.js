import React from 'react';
import { LocationForm } from './LocationForm';
import { inject, Observer } from 'mobx-react';
import { Typography, List, Paper, FormGroup } from '@material-ui/core';
import { LocationItem } from './LocationItem';
import 'date-fns';
import { Filters } from './Filters';

const LocationsListView = ({ store }) => {
  return (
    <Observer>
      {() => {
        const {
          addLocation,
          deleteLocation,
          editLocation,
          locations,
          filteredLocations,
          setOpenState,
          itemOpenStates,
          resetFilters,
          filters,
          onFilter,
          areFiltersSet,
        } = store.map;

        const list = areFiltersSet ? filteredLocations : locations;

        return (
          <div style={{ width: '40%', maxWidth: 500, padding: 20 }}>
            <Filters
              filters={filters}
              onFilter={onFilter}
              resetFilters={resetFilters}
            />
            <Typography variant="h6">Add a new location</Typography>
            <LocationForm onAdd={addLocation}/>
            <Typography variant="h6">Existing Locations</Typography>
            <List disablePadding style={{ marginTop: 10 }}>
              {Object.keys(list).length > 0
                ?
                Object.keys(list).map(location => {
                    const locationData = list[location];
                    return (
                      <LocationItem
                        key={location}
                        location={locationData}
                        onDelete={deleteLocation}
                        onEdit={editLocation}
                        setOpenState={setOpenState}
                        isOpen={itemOpenStates[location]}
                      />
                    )
                  })
                :
                  <Paper elevation={0} variant="outlined" square style={{ padding: 10, background: '#f0f0f0', border: 'none'}}>
                    <Typography variant="subtitle1">
                      {areFiltersSet ? 'No available locations for the selected filters' : 'Add a location to view it on the map'}
                    </Typography>
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

