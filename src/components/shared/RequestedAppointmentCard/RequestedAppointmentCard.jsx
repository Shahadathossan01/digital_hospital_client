import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStoreActions, useStoreState } from 'easy-peasy';
import AppointmentDetails from '../../../pages/AppointmentDetails/AppointDetails';
import { addDays, format, isAfter, isBefore, isToday, parseISO, startOfDay } from 'date-fns';
import AcceptAppointment from '../AcceptAppointmentModal/AcceptAppointmentModal';
import AcceptAppointmentModal from '../AcceptAppointmentModal/AcceptAppointmentModal';

const RequestedAppointmentCard = ({ item }) => {
  console.log(item)
    const {date,patientName,status,appointmentID,time}=item
    const {deleteApplyedData}=useStoreActions(action=>action.applyedAppointment)
    
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const id=item._id
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        gap: 2,
        p: 2,
        boxShadow: 3,
        width: { xs: '100%', sm: 300 },
        maxWidth: 300,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent sx={{ p: 1 }}>
          <Box sx={{display:'flex',justifyContent:'space-between'}}>
          <Typography variant="h6" component="div">
            Date: {format(date,'yyyy-MM-dd')}
          </Typography>
          </Box>
          <Typography variant="h6" component="div">
            Time: {time}
          </Typography>
          <Typography variant="h6" component="div">
            Patient Name: {patientName}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: status === 'Unpayed' ? 'error.main' : 'success.main',
              mb: 2,
            }}
          >
            Status: {status}
          </Typography>
          <Box sx={{ display: 'flex', gap: 15}}>
            <Button
              onClick={handleClickOpen}
              disabled={status === 'Pending'}
              variant="contained"
              size="small"
            >
              Accept
            </Button>
            <AcceptAppointmentModal date={date} time={time} appointmentID={appointmentID} open={open} handleClose={handleClose} reqApplyedID={item?._id}></AcceptAppointmentModal>
            <Tooltip title="Delete Appointment">
              <IconButton
                onClick={()=>deleteApplyedData(id)}
                sx={{ color: 'error.main' }}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default RequestedAppointmentCard;
