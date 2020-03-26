import React, { useRef } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { TextField, Menu, MenuItem } from '@material-ui/core';

export const PlacesAutocomplete = ({ onSelect, existingValue }) => {
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

  const handleInput = e => {
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    setValue(description, false);
    clearSuggestions();

    getGeocode({ address: description })
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        onSelect({ lat, lng, name: description })
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
          <strong>{main_text}</strong>&nbsp;<small>{secondary_text}</small>
        </MenuItem>
      );
    });

  return (
    <div ref={ref}>
      <TextField
        value={value || existingValue}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where are you going?"
        fullWidth
      />
      {status === 'OK' && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};
