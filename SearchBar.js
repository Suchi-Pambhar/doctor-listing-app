import React from 'react';
import { TextField, Autocomplete } from '@mui/material';

const SearchBar = ({ options, value, onChange }) => {
  return (
    <Autocomplete
      freeSolo
      options={options}
      value={value}
      onInputChange={(event, newInputValue) => {
        onChange(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search Doctor by Name" variant="outlined" fullWidth />
      )}
    />
  );
};

export default SearchBar;
