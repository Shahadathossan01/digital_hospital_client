import { format, formatISO, isBefore, isEqual, parse, set, startOfDay } from 'date-fns';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Box, Typography, Paper, Stack, Rating, TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { createSchedule, getTotalDaysInMonth } from '../../utils';
import { useForm } from 'react-hook-form';

import * as React from 'react';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import { CheckBox } from '@mui/icons-material';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

 function BookAppointmentCheckBox() {
  
  return (
    <div>
      <Checkbox {...label} />
    </div>
  );
}



const BookAppointment = () => {
  const {register,handleSubmit,formState: { errors, isValid}}=useForm()
  const { patient } = useStoreState((state) => state.patient);
  const { getPatient } = useStoreActions((action) => action.patient);
  const {resetPromoCode}=useStoreActions((action=>action.promoCode))
    const { user } = useStoreState((state) => state.user);
  const userID=user?._id
    const navigate=useNavigate()
  const token=localStorage.getItem('token') || null;
useEffect(() => {
    if (user?._id) {
      getPatient({id:userID,token});
    }
  }, [getPatient,user,token,userID]);
  
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

  const onSubmit=(data)=>{
    const payload = {
      patientID: patient?._id,
      doctorID: singleDoctor?._id,
      fee: singleDoctor?.fee,
      scheduleID,
      slotID,
      dateValue,
      timeValue,
      fullName:data.fullName,
      dateOfBirth:data.dateOfBirth,
      gender:data.gender,
      age:data.age,
      height:data.height,
      weight:data.weight
    };
    // console.log(payload)
    resetPromoCode()
    // // console.log(payload)
    navigate("/paymentPage",{state:payload})
    
  }

  return (
    <Box sx={{flexGrow:1,mt:10}}>
      <Grid container spacing={2} justifyContent="center" 
  >
      <Grid xs={12} sm={12} md={4} 
      sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",marginTop:"25px" }}
    >
      {/* Responsive Image */}
      <Box 
        component="img"
        src={singleDoctor?.profile}
        alt={singleDoctor?.firstName}
        sx={{
          width: { xs: "100%", sm: "250px", md: "300px" },
          height: "auto",
          borderRadius: "10px",
          objectFit: "cover",
        }}
      />

      {/* Doctor Name & Specialty */}
      <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
        {singleDoctor?.title} {singleDoctor?.firstName} {singleDoctor?.lastName}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {singleDoctor?.speciality}
      </Typography>

      {/* Rating */}
      <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: "5px" }}>
        <Rating value={0} readOnly />
        <Typography variant="body2">(0)</Typography>
      </Box>

      {/* Additional Information */}
      <Box sx={{ mt: 2, textAlign: "left", width: "100%", maxWidth: "300px" }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Degrees:
        </Typography>
        <Typography variant="body2">{singleDoctor?.degrees}</Typography>

        <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1 }}>
          Experience:
        </Typography>
        <Typography variant="body2">
          Years of Experience: <span>{singleDoctor?.yearOfExperience}</span>
        </Typography>

        <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1 }}>
          Working In:
        </Typography>
        <Typography variant="body2">{singleDoctor?.organization}</Typography>

        <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1 }}>
          Biography:
        </Typography>
        <Typography variant="body2">{singleDoctor?.biography}</Typography>
      </Box>
    </Grid>
        <Grid size={{xs:12,sm:12,md:8}}>
        <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 ,display:"flex",justifyContent:"space-between"}}>
        <Typography variant="h5" gutterBottom>
          Doctor Fee:
        </Typography>
        <Typography variant="h5" gutterBottom>
          {singleDoctor?.fee} {"taka"}
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
          
          <Grid item size={{xs:6, sm:4, md:2}} key={index}>
            <Button
              disabled={
                item?.status === "busy"
              }
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
  justifyContent="center"
  flexWrap="wrap"
  sx={{ mb: 4, mt: 4, gap: 2 }} // ✅ use gap instead of spacing
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

        <Box>
          <Typography variant='h5'>Patient Details:</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{flexGrow:1}}>
              <Grid container spacing={2} justifyContent="center" 
              alignItems="center">
                <Grid size={{xs:12}}>
                  <TextField {...register("fullName",{required:"Full Name is required"})} 
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                  label="Full Name" name="fullName" fullWidth />
                </Grid>
                <Grid size={{xs:12,md:6}}>
            <TextField 
                {...register("dateOfBirth",{required:"Date of Birth is required"})}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth?.message}
                type="date" 
                name="dateOfBirth" 
                label="Date of Birth" 
                fullWidth 
                focused
            />

            </Grid>
                <Grid size={{xs:12,md:6}}>
                <FormControl fullWidth margin="normal" error={!!errors.gender}>
        <InputLabel sx={{ color: errors.gender ? "#e53935" : "black" }} shrink>
          Gender
        </InputLabel>
        <Select
          {...register("gender", { required: "Gender is required" })}
          name="gender"
          defaultValue="male"
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
        {/* Displaying error message */}
        {errors.gender && (
          <FormHelperText>
            <span style={{ color: "#e53935" }}>{errors.gender.message}</span>
          </FormHelperText>
        )}
      </FormControl>
            </Grid>
                <Grid size={{xs:12 ,sm:6,md:3,lg:3}}>
                  <TextField type="number"  {...register("age",{required:"Age is required"})}
                  error={!!errors.age}
                  helperText={errors.gender?.message}
                  label="Age" name="age" fullWidth />
                </Grid>
                <Grid size={{xs:12 ,sm:6,md:3,lg:3}}>
                  <TextField type='number' inputProps={{step:"any"}} {...register("height",{required:"Height is required"})}
                error={!!errors.height}
                helperText={errors.height?.message} label="Height" name="height" fullWidth />
                </Grid>
                <Grid size={{xs:12 ,sm:6,md:3,lg:3}}>
                  <TextField type='number' inputProps={{step:"any"}} {...register("weight",{required:"Weight is required"})}
                error={!!errors.weight}
                helperText={errors.weight?.message} label="Weight" name="weight" fullWidth />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"20px"}}>
              <BookAppointmentCheckBox></BookAppointmentCheckBox>
              <Typography variant='body'>
                I aggre to the <span style={{color:"blue"}}>Treams & Conditions</span>?
              </Typography>
            </Box>
            
            <Button
            sx={{marginTop:"5px"}}
            type='submit'
        variant="contained"
        color="success"
        size="large"
        fullWidth
        disabled={(!scheduleID || !slotID)}
      >
        Book Appointment
      </Button>
      {
        (!scheduleID || !slotID) && (
          <Typography textAlign='center' color='warning'>Please choose schedule and slot!</Typography>
        )
      }

          </form>
        </Box>
        </Box>
        
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookAppointment;
