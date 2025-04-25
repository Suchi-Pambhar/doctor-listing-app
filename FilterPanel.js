import React from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';

const FilterPanel = ({
  consultationType,
  onConsultationTypeChange,
  specialties,
  selectedSpecialties,
  onSpecialtiesChange,
  sortOption,
  onSortOptionChange,
}) => {
  const handleSpecialtyChange = (event) => {
    const { value } = event.target;
    onSpecialtiesChange(
      selectedSpecialties.includes(value)
        ? selectedSpecialties.filter((spec) => spec !== value)
        : [...selectedSpecialties, value]
    );
  };

  return (
    <div>
      <FormControl component="fieldset" fullWidth margin="normal">
        <FormLabel component="legend">Consultation Type</FormLabel>
        <RadioGroup
          value={consultationType}
          onChange={(e) => onConsultationTypeChange(e.target.value)}
        >
          <FormControlLabel value="online" control={<Radio />} label="Online" />
          <FormControlLabel value="offline" control={<Radio />} label="Offline" />
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" fullWidth margin="normal">
        <FormLabel component="legend">Specialties</FormLabel>
        <FormGroup>
          {specialties.map((spec) => (
            <FormControlLabel
              key={spec}
              control={
                <Checkbox
                  checked={selectedSpecialties.includes(spec)}
                  onChange={handleSpecialtyChange}
                  value={spec}
                />
              }
              label={spec}
            />
          ))}
        </FormGroup>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="sort-label">Sort By</InputLabel>
        <Select
          labelId="sort-label"
          value={sortOption}
          label="Sort By"
          onChange={(e) => onSortOptionChange(e.target.value)}
        >
          <MenuItem value="fees">Fees</MenuItem>
          <MenuItem value="experience">Experience</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterPanel;
