
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import DoctorProfileModal from '../DoctorProfileModal/DoctorProfileModal';

const DoctorCard=({item})=>{
    const [open, setOpen] = React.useState(false);
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      if(!item.profile) return
    const {firstName,lastName,specialization,designation}=item?.profile

  return (
    <Card sx={{ display: 'flex'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography 
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            Name: {firstName} {lastName}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            Specialization: {specialization}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            Designation: {designation}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
            Fee: {item.fee}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.black' }}
          >
            Status: {item?.appointmentLimit<item.appointments.length?'Busy':'Abaliable'}
          </Typography>

          <Button disabled={item?.appointmentLimit < item?.appointments.length}  variant="contained" size="small" sx={{marginRight:'20px',backgroundColor: item?.appointmentLimit < item?.appointments.length ? '#f44336' : '#76ff03'}}>
          Apply For Appointment
        </Button>

        <Button onClick={handleClickOpen} variant="contained" size="small">
          Profile
        </Button>

        <DoctorProfileModal item={item}  open={open} handleClose={handleClose}></DoctorProfileModal>

        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"
        alt="Live from space album cover"
      />
    </Card>
  );
}

export default DoctorCard