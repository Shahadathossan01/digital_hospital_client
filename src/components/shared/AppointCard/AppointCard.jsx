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
import { format, isAfter, isBefore, isToday, parseISO, startOfDay } from 'date-fns';

const AppointCard = ({ item ,isDoctor}) => {
  const { doctor, status ,patient} = item;
  const { user } = useStoreState((state) => state.user);
  const { deletePatientAppointment } = useStoreActions((action) => action.patient);
  const {updatedAppointment}=useStoreActions(action=>action.doctor)
  if (!user || !item) {
    return null;
  }

  const userID = user.id;
  const appointmentID = item._id;
  const doctorID = doctor?._id;
  const patientID=item?.patient?._id

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const convertDate =item?.date && parseISO(item?.date); 
  const localDate = startOfDay(new Date(convertDate)); 
  const today = startOfDay(new Date()); 

  const upcomming = isAfter(localDate, today);
  const over = isBefore(localDate, today); 
  const todayStatus = isToday(localDate); 

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
        alt={`${doctor?.profile.firstName} ${doctor?.profile.lastName}`}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent sx={{ p: 1 }}>
          {
            !isDoctor &&
          <Typography variant="h6" component="div">
            Dr. {doctor?.profile.firstName} {doctor?.profile.lastName}
          </Typography>
          }
          
          {
            isDoctor &&
          <Typography variant="h6" component="div">
            Patient:  {patient?.profile.firstName} {patient?.profile.lastName}
          </Typography>

          }
          {
            isDoctor &&
            <Typography variant="h6" component="div">
              Date: {format(item?.date,'yyyy-MM-dd')}
            </Typography>
          }
          {
            isDoctor &&
            <Typography variant="h6" component="div">
              Time: {item?.time}
            </Typography>

          }
          {
            !isDoctor &&
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            Specialization: {doctor?.profile.specialization}
          </Typography>

          }
          {
            !isDoctor &&
          <Typography
            variant="body2"
            sx={{
              color: status === 'Pending' ? 'error.main' : 'success.main',
              mb: 2,
            }}
          >
            Status: {status}
          </Typography>
          }
          {
            isDoctor &&
            <Box>
                {
                    upcomming && <Typography sx={{color:'blue'}}>upcomming</Typography>
                }
                {
                    over && <Typography sx={{color:'blue'}}>completed</Typography>
                }
                {
                    todayStatus && <Typography sx={{color:'blue'}}>running</Typography>
                }
            </Box>
          }
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              onClick={handleClickOpen}
              disabled={status === 'Panding'}
              variant="contained"
              size="small"
              sx={{
                backgroundColor: status === 'Panding' ? 'error.main' : 'success.main',
              }}
            >
              Details
            </Button>
            {
              !isDoctor &&
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
            }
            {
              isDoctor &&
              <Tooltip title="Delete Appointment">
              <IconButton
                onClick={()=>updatedAppointment({userID,appointmentID,patientID})}
                disabled={upcomming || todayStatus}
                sx={{ color: 'error.main' }}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            }
          </Box>
        </CardContent>
      </Box>
      <AppointmentDetails isDoctor={user.role=='patient'?false:true} item={item} open={open} handleClose={handleClose} />
    </Card>
  );
};

export default AppointCard;
