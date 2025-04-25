import React, { useState, useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Box,
  Card,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  CssBaseline
} from '@mui/material';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [consultationType, setConsultationType] = useState('In-clinic Consultation');
  const [specialties, setSpecialties] = useState([]);
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    axios.get('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json')
      .then((response) => {
        setDoctors(response.data);
        setFilteredDoctors(response.data);
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
      });
  }, []);

  useEffect(() => {
    let filtered = [...doctors];
  
    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (consultationType === 'Video Consultation') {
      filtered = filtered.filter(doc => doc.video_consult === true);
    } else if (consultationType === 'In-clinic Consultation') {
      filtered = filtered.filter(doc => doc.in_clinic === true);
    } else if (consultationType === 'All') {
      filtered = filtered;
    }

    if (specialties.length > 0) {
      filtered = filtered.filter(doc =>
        Array.isArray(doc.specialities) &&
        specialties.every(s =>
          doc.specialities.map(spec => spec.name).includes(s)
        )
      );
    }

    if (sortOption === 'fees') {
      filtered.sort((a, b) =>
        parseInt(a.fees.replace(/[^\d]/g, '')) - parseInt(b.fees.replace(/[^\d]/g, ''))
      );
    } else if (sortOption === 'experience') {
      const getYears = str => parseInt(str?.match(/\d+/)?.[0] || "0");
      filtered.sort((a, b) => getYears(b.experience) - getYears(a.experience));
    }
  
    setFilteredDoctors(filtered);
  }, [searchTerm, consultationType, specialties, sortOption, doctors]);  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Box
        sx={{
          width: 240,
          bgcolor: 'background.paper',
          padding: 3,
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          overflowY: 'auto',
          boxShadow: 2
        }}
      >
        <TextField
          fullWidth
          label="Search Symptoms, Doctors, Specialists, Clinics"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Box mb={3}>
          <Typography variant="h6">Sort by</Typography>
          <FormControl component="fieldset">
            <RadioGroup
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <FormControlLabel value="fees" control={<Radio />} label="Price: Low-High" />
              <FormControlLabel value="experience" control={<Radio />} label="Experience: Most Experience first" />
            </RadioGroup>
          </FormControl>
        </Box>

        <Box mb={3}>
          <Typography variant="h6">Specialities</Typography>
          <FormControl fullWidth>
            <InputLabel>Specialities</InputLabel>
            <Select
              multiple
              value={specialties}
              onChange={(e) => setSpecialties(e.target.value)}
              input={<OutlinedInput label="Specialities" />}
              renderValue={(selected) => selected.join(', ')}
            >
              {[
                "General Physician",
                "Dentist",
                "Dermatologist",
                "Paediatrician",
                "Gynaecologist and Obstetrician",
                "ENT",
                "Diabetologist",
                "Cardiologist",
                "Physiotherapist",
                "Endocrinologist",
                "Orthopaedic",
                "Ophthalmologist",
                "Gastroenterologist",
                "Pulmonologist",
                "Psychiatrist",
                "Urologist",
                "Dietitian/Nutritionist",
                "Psychologist",
                "Sexologist",
                "Nephrologist",
                "Neurologist",
                "Oncologist",
                "Ayurveda",
                "Homeopath"
              ].map((specialty) => (
                <MenuItem key={specialty} value={specialty}>
                  <Checkbox checked={specialties.indexOf(specialty) > -1} />
                  <ListItemText primary={specialty} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Typography variant="h6">Mode of Consultation</Typography>
          <FormControl component="fieldset">
            <RadioGroup
              value={consultationType}
              onChange={(e) => setConsultationType(e.target.value)}
            >
              <FormControlLabel value="Video Consultation" control={<Radio />} label="Video Consultation" />
              <FormControlLabel value="In-clinic Consultation" control={<Radio />} label="In-clinic Consultation" />
              <FormControlLabel value="All" control={<Radio />} label="All" />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: 40,
          padding: 3,
          marginTop: '64px',
        }}
      >
        <Grid container spacing={3}>
        {filteredDoctors.length === 0 ? (
    <Typography>No doctors found.</Typography>
  ) : (
    filteredDoctors
      .map((doc) => (
        <Grid item xs={12} key={doc.id}>
        <Card
          sx={{
            padding: 2,
            boxShadow: 3,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={doc.photo || 'https://via.placeholder.com/80'}
              alt={doc.name}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginRight: '20px'
              }}
            />
            <Box>
              <Typography variant="h6">{doc.name}</Typography>
              <Typography variant="body2">
                {Array.isArray(doc.specialities) && doc.specialities.length > 0
                  ? doc.specialities.map(s => s.name).join(', ')
                  : 'No specialties listed'}
              </Typography>
              <Typography variant="body2">{doc.experience} yrs exp.</Typography>
              <Typography variant="body2">{doc.consultation_type}</Typography>
            </Box>
          </Box>
          <Box sx={{ mt: 2 }}>
            {doc.clinic && doc.clinic.name && (
              <Box>
                <Typography variant="body2">
                  <strong>Clinic:</strong> {doc.clinic.name}
                </Typography>
                <Typography variant="body2">
                  <strong>Locality:</strong> {doc.clinic.address.locality}
                </Typography>
              </Box>
            )}
            <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="h6" color="text.primary">
                        {doc.fees || 'Not specified'}
                      </Typography>
              
            <Button variant="outlined" sx={{ mt: 1 }}>
              Book Appointment
            </Button>
            </Box>
          </Box>
        </Card>
      </Grid>
    ))
  )}
</Grid>
      </Box>
    </Box>
  );
};

export default DoctorList;
