import React, { useRef } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { TextField, Menu, MenuItem } from '@material-ui/core';

export const PlacesAutocomplete = () => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {},
    debounce: 300
  });
  const ref = useRef();
  useOnclickOutside(ref, () => {
    clearSuggestions();
  });

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleInput = e => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    setValue(description, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('📍 Coordinates: ', { lat, lng });
      }).catch(error => {
      console.log('😱 Error: ', error)
    });
  };

  const renderSuggestions = () =>
    data.map(suggestion => {
      const {
        id,
        structured_formatting: { main_text, secondary_text }
      } = suggestion;

      return (
        <MenuItem
          key={id}
          onClick={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </MenuItem>
      );
    });

  return (
    <div ref={ref}>
      <TextField
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where are you going?"
        fullWidth
      />
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={status === 'OK' || Boolean(anchorEl)}>
        {renderSuggestions()}
      </Menu>
    </div>
  );
};
