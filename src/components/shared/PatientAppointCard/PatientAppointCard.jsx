
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStoreActions, useStoreState } from 'easy-peasy';
import AppointmentDetails from '../../../pages/AppointmentDetails/AppointDetails';

const PatientAppointCard=({item})=>{
    const {doctor,status}=item
    const {firstName,lastName,specialization}=doctor.profile
    const {user}=useStoreState(state=>state.user)
    const {deletePatientAppointment}=useStoreActions(action=>action.patient)

    if(!user){
        return
    }

    const userID=user.id;
    const appointmentID=item._id;
    const doctorID=item.doctor._id

    const [open, setOpen] = React.useState(false);
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
  return (
    <Card sx={{ display: 'flex'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography 
            variant="subtitle1"
            component="div"
            sx={{ color: 'text.secondary' }}
          >
           Doctor Name: {firstName} {lastName}
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
            sx={{ color: 'text.black' }}
          >
            Status: {status}
          </Typography>

          <Button onClick={handleClickOpen} disabled={status==='Panding'}  variant="contained" size="small" sx={{marginRight:'20px',backgroundColor: status==='Panding'? '#f44336' : '#76ff03'}}>
            Details
          </Button>

          <AppointmentDetails item={item} open={open} handleClose={handleClose}></AppointmentDetails>

          <IconButton onClick={()=>deletePatientAppointment({patientID:userID,appointmentID,doctorID})} sx={{mx:7}} aria-label="delete" size="small">
                <DeleteIcon sx={{color:'red'}} fontSize="large" />
          </IconButton>

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

export default PatientAppointCard