import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStoreActions, useStoreState } from 'easy-peasy';
import AppointmentDetails from '../../../pages/AppointmentDetails/AppointDetails';

const PatientAppointCard = ({ item }) => {
  const { doctor, status } = item;
  const { firstName, lastName, specialization } = doctor.profile;
  const { user } = useStoreState((state) => state.user);
  const { deletePatientAppointment } = useStoreActions((action) => action.patient);

  if (!user) {
    return null;
  }

  const userID = user.id;
  const appointmentID = item._id;
  const doctorID = item.doctor._id;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        gap: 2,
        p: 2,
        boxShadow: 3,
        width: { xs: '100%', sm: 400 },
        maxWidth: 400,
      }}
    >
      <CardMedia
        component="img"
        sx={{
          width: 151,
          borderRadius: 2,
        }}
        image="https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"
        alt={`${firstName} ${lastName}`}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent sx={{ p: 1 }}>
          <Typography variant="h6" component="div">
            Dr. {firstName} {lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            Specialization: {specialization}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: status === 'Pending' ? 'error.main' : 'success.main',
              mb: 2,
            }}
          >
            Status: {status}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              onClick={handleClickOpen}
              disabled={status === 'Pending'}
              variant="contained"
              size="small"
              sx={{
                backgroundColor: status === 'Pending' ? 'error.main' : 'success.main',
              }}
            >
              Details
            </Button>
            <Tooltip title="Delete Appointment">
              <IconButton
                onClick={() =>
                  deletePatientAppointment({
                    patientID: userID,
                    appointmentID,
                    doctorID,
                  })
                }
                sx={{ color: 'error.main' }}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
      </Box>
      <AppointmentDetails item={item} open={open} handleClose={handleClose} />
    </Card>
  );
};

export default PatientAppointCard;
