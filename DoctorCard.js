import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const DoctorCard = ({ doctor }) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{doctor.name}</Typography>
        <Typography variant="body2">Specialties: {doctor.specialties.join(', ')}</Typography>
        <Typography variant="body2">Consultation Type: {doctor.consultationType}</Typography>
        <Typography variant="body2">Experience: {doctor.experience} years</Typography>
        <Typography variant="body2">Fees: ₹{doctor.fees}</Typography>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
