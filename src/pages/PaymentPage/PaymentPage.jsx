import { format, formatISO, isEqual, parse, set } from 'date-fns';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Box, Typography, Grid, Paper, Stack } from '@mui/material';
import { createSchedule, getTotalDaysInMonth } from '../../utils';

const PaymentPage = () => {
  const { getUrl } = useStoreActions((action) => action.sslCommerz);
  const { patient } = useStoreState((state) => state.patient);
  const { getPatient } = useStoreActions((action) => action.patient);
    const { user } = useStoreState((state) => state.user);


useEffect(() => {
    if (user?.id) {
      getPatient(user?.id);
    }
  }, [getPatient,user]);

  console.log(patient)

  const [dateValue, setDateValue] = useState(null);
  const [scheduleID,setScheduleID]=useState(null)
  const [slotID,setSlotID]=useState(null)

  const { getSingleDoctor} = useStoreActions((action) => action.doctor);
  const { singleDoctor } = useStoreState((state) => state.doctor);

  const singleSchedule = singleDoctor?.schedule.filter(
    (item) => item._id === scheduleID
  );

  const [timeValue, setTimeValue] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    getSingleDoctor(id);
  }, [getSingleDoctor, id]);

  

  if (!singleDoctor) return null;

  const handleDate = (data) => {
    setDateValue(data.date);
    setScheduleID(data._id)

  };

  const handleTime = (data) => {
    setTimeValue(data.time);
    setSlotID(data._id)
  };

  //Compare Month...Start.....
const scheduleDate=singleDoctor?.schedule[0].date
const localDate = new Date();
const updatedDate = set(localDate, {
  year: 2024,
  month: 11, 
  date: 25,
  hours: 17,
  minutes: 35,
  seconds: 52,
  milliseconds: 881,
});

const isoLocalDate = format(updatedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");  
 
const date1 = new Date(scheduleDate);
const date2 = new Date(isoLocalDate);

const month1 = format(date1, 'MM');
const month2 = format(date2, 'MM');
const areMonthsEqual=isEqual(month1,month2)

// if(!areMonthsEqual){
//   const date = new Date();
//   const times=['10:54 AM', '02:55 AM', '02:55 AM', '02:56 AM']
//   const totalMonthDays = getTotalDaysInMonth(date);
//   const schedule = createSchedule(totalMonthDays, times);
//   updateSchedule({doctorID:id,schedule})
// }
//Compare Month ...End.....
  

  const handlePayment = () => {
    const payload = {
      patientID: patient?._id,
      doctorID: singleDoctor?._id,
      patientName: patient?.profile?(patient?.profile.firstName +" "+ patient?.profile.lastName):(user.username),
      fee: singleDoctor?.fee,
      scheduleID,
      slotID,
      dateValue,
      timeValue
    };
    getUrl(payload);
  };


  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Payment Page
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Doctor Fee: ${singleDoctor?.fee}
        </Typography>
      </Paper>

      <Typography variant="h6" gutterBottom>
        Schedule:
      </Typography>

      {
  areMonthsEqual ? (
    <Box
      sx={{
        textAlign: 'center',
        mb: 2,
        p: 2,
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        color: 'gray',
      }}
    >
      <Typography variant="body1" sx={{ mb: 1 }}>
        🚫 <strong>Do not update yet!</strong>
      </Typography>
      <Typography variant="body2">
        The new month schedule is not ready yet. Please take some time, and it will update soon. We apologize for the inconvenience.
      </Typography>
    </Box>
  ) : (
    <Grid container spacing={2} sx={{ mb: 4 }}>
        {singleDoctor?.schedule?.map((item, index) => (
          <Grid item xs={6} sm={4} md={2} key={index}>
            <Button
              variant="contained"
              color={item.date === dateValue ? 'primary' : 'inherit'}
              onClick={() => handleDate(item)}
              fullWidth
            >
               {format(new Date(item.date), "dd-MM-yyyy")}
            </Button>
          </Grid>
        ))}
      </Grid>
  )
}


      <Typography variant="h6" gutterBottom>
        Choose a Slot:
      </Typography>
      {
  (singleSchedule[0]?.status === 'busy' || singleSchedule[0]?.slots.length==0) ? (
    <Box
      sx={{
        textAlign: 'center',
        mb: 2,
        p: 2,
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        color: 'gray',
      }}
    >
      <Typography variant="body1" sx={{ mb: 1 }}>
        🛑 <strong>No Available Slots</strong>
      </Typography>
      <Typography variant="body2">
        All time slots are currently occupied. Please check back later or try selecting a different schedule.
      </Typography>
    </Box>
  ) : (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      flexWrap="wrap"
      sx={{ mb: 4 }}
    >
      {singleSchedule[0]?.slots?.map((item, index) => (
        <Button
          disabled={item.status === 'unavailable' || item.status === 'booked'}
          key={index}
          variant="contained"
          color={item.time === timeValue ? 'primary' : 'inherit'}
          onClick={() => handleTime(item)}
          sx={{ minWidth: 120 }}
        >
          {item.time}
        </Button>
      ))}
    </Stack>
  )
}



      <Button
        onClick={handlePayment}
        variant="contained"
        color="success"
        size="large"
        disabled={!timeValue}
        fullWidth
      >
        Make Payment
      </Button>
    </Box>
  );
};

export default PaymentPage;
