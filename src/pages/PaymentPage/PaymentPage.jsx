import { Box, Rating, Typography, Divider, TextField, Button } from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { format } from "date-fns";
import Grid from '@mui/material/Grid2';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";



const PromoSection=()=>{
    const {user}=useStoreState(state=>state.user)
    const {getPromoCodeByCode,}=useStoreActions(actions=>actions.promoCode)
    const {error,promoCodeByCode}=useStoreState(state=>state.promoCode)
    const {register,handleSubmit,reset,formState:{errors}}=useForm()
    const onSubmit=async(data)=>{
        const code=data.promoCode
        getPromoCodeByCode({code,userId:user?._id})
        reset()
    }
    return(
        <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}>
        Apply Promo Code
      </Typography>
      {/* <Typography sx={{textAlign:"center"}}>use promo code for <span style={{color:"red"}}>FREE APPOINTMENT</span></Typography> */}
      {/* <Typography sx={{textAlign:"center"}}>Payed is not availabe now!!</Typography> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} justifyContent="center">
          {/* Promo Code Input */}
          <Grid item xs={12} sm={6} md={8}>
            <TextField
              type="text"
              {...register("promoCode",{required:'This field is required'})}
              label="Enter Promo Code"
              name="promoCode"
              fullWidth
              variant="outlined"
              error={!!errors?.promoCode}
              helperText={errors?.promoCode?.message || ''}
            />
            <Box sx={{marginTop:"-10px",display:"flex",justifyContent:"center",marginBottom:"-20px"}}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            { (promoCodeByCode?.valid==='notValid' && !error) && <p style={{ color: "red" }}>This is Promo Code is applicable for only Patient Account</p>}
            {((promoCodeByCode?.percent > 0 || promoCodeByCode?.percent==100)&& !error) && <p>Discount Applied: {promoCodeByCode?.percent}%</p>}
            </Box>
          </Grid>

          {/* Apply Button */}
          <Grid item xs={12} sm={6} md={4}>
          <Button
  type="submit"
  variant="contained"
  color="secondary"
  fullWidth
  sx={{
    height: "55px",
  }}
>
  Apply Now
</Button>
          </Grid>
        </Grid>
      </form>
    </Box>
    )
}

const BillSection=({patientData})=>{
    const token=localStorage.getItem("token")?localStorage.getItem("token"):null;
    const {age,dateOfBirth,dateValue,doctorID,fee,fullName,gender,height,patientID,scheduleID,slotID,timeValue,weight}=patientData
    const {user}=useStoreState(state=>state.user)
    const {promoCodeByCode}=useStoreState(state=>state.promoCode)
    const discountAmount=(patientData.fee* (promoCodeByCode?.percent ?? 0))/100;
    const totalFee=patientData.fee-discountAmount
    const { getUrl } = useStoreActions((action) => action.sslCommerz);
    const {createFreeAppointment}=useStoreActions(actions=>actions.freeAppointment)
    const navigate=useNavigate()
    const handlePayment=()=>{
        const payload={
            age,
            dateOfBirth,
            dateValue,
            doctorID,
            fee,
            fullName,
            gender,
            height,
            patientID:user?.role=='patient'?patientID:null,
            referenceHealhtHubID: user?.role === 'healthHub'
            ? user?._id
            : promoCodeByCode?.valid === 'patient' &&
              promoCodeByCode?.author?.role === 'healthHub'
            ? promoCodeByCode?.author?._id
            : null,
            scheduleID,
            slotID,timeValue,
            weight,
            totalFee
        }
        // console.log(payload)
        getUrl({payload,token})
    }


    const handleFreeAppointment=()=>{
        const payload={
            age,
            dateOfBirth,
            dateValue,
            doctorID,
            fee,
            fullName,
            gender,
            height,
            patientID:user?.role=='patient'?patientID:null,
            referenceHealhtHubID: user?.role === 'healthHub'
            ? user?._id
            : promoCodeByCode?.valid === 'patient' &&
              promoCodeByCode?.author?.role === 'healthHub'
            ? promoCodeByCode?.author?._id
            : null,
            scheduleID,
            slotID,timeValue,
            weight,
            totalFee
        }
     createFreeAppointment({payload,navigate})

    }

    return(
        <Box>
            <Typography>Bill:</Typography>
                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography variant="body">Fee</Typography>
                            <Typography>{patientData.fee}</Typography>
                        </Box>
                        <hr />
                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography variant="body">Discount</Typography>
                            <Typography>{discountAmount}</Typography>
                        </Box>
                        <hr />
                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography variant="body">Total Fee</Typography>
                            <Typography>{totalFee}</Typography>
                        </Box>
                        <hr />
                        <PromoSection></PromoSection>
                        {
                            promoCodeByCode?.percent==100?
                            <Button
                                onClick={handleFreeAppointment}
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{}}
                                >
                                Fee Appointment
                            </Button>:
                            <Button
                                disabled
                                onClick={handleFreeAppointment}
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{}}
                                >
                                Fee Appointment
                            </Button>
                        }
             <Button
            onClick={handlePayment}
            variant="contained"
            color="primary"
            fullWidth
            sx={{marginTop:"-10px",marginBottom:"10px"}}
          >
            Continue to payment
          </Button>                  
        </Box>
    )
}

const PaymentPage = () => {
    const location = useLocation();
    const patientData = location.state || {};
    const { getDoctorById } = useStoreActions(actions => actions.doctor);
    const { doctor } = useStoreState(state => state.doctor);
    const doctorId = patientData.doctorID;

    useEffect(() => {
        getDoctorById(doctorId);
    }, [doctorId, getDoctorById]);

    const localDate = new Date();

    if (!doctor) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 ,paddingTop:"20px",mt:10}}>
                <Grid container spacing={3}>
                    {/* Doctor Profile Section */}
                    <Grid
                        item
                        size={{xs:12,md:6}}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            padding: 3,
                            borderRadius: 3,
                            flexDirection: { xs: "column", md: "row" },
                            textAlign: { xs: "center", md: "left" },
                        }}
                    >
                        {/* Doctor Profile Image */}
                        <Box
                            component="img"
                            src={doctor?.profile}
                            alt="Doctor Profile"
                            sx={{
                                width: 120,
                                height: 120,
                                borderRadius: "50%",
                                objectFit: "cover",
                            }}
                        />

                        {/* Doctor Information */}
                        <Box>
                            <Typography variant="h6" fontWeight="bold">
                                {doctor?.title} {doctor?.firstName} {doctor?.lastName}
                            </Typography>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: { xs: "center", md: "flex-start" } }}>
                                <Rating value={0} readOnly />
                                <Typography variant="body2">(0)</Typography>
                            </Box>

                            <Typography variant="body2" color="text.secondary">
                                {doctor?.speciality}
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Appointment Info Section */}
                    <Grid
                        item
                        size={{xs:12,md:6}}
                        sx={{ padding: 3, borderRadius: 3 }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Appointment Details
                        </Typography>
                        <Divider sx={{ marginBottom: 2 }} />

                        {/* Video Call Info */}
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center", marginBottom: 2 }}>
                            <VideoCallIcon />
                            <Typography variant="body1">Video Call Service</Typography>
                        </Box>

                        {/* Appointment Date */}
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center", marginBottom: 2 }}>
                            <CalendarMonthIcon />
                            <Typography variant="body1">Date: {format(new Date(patientData?.dateValue), "M/d/yyyy")}</Typography>
                        </Box>

                        {/* Appointment Time */}
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center", marginBottom: 2 }}>
                            <AccessTimeIcon />
                            <Typography variant="body1">Time: {patientData.timeValue}</Typography>
                        </Box>

                        {/* Appointment Created Date */}
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center", marginBottom: 2 }}>
                            <AccessTimeIcon />
                            <Typography variant="body1">
                                Appointment Created: {format(new Date(localDate), "M/d/yyyy")}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <hr />
            <Box sx={{flexGrow:1}}>
                <Grid container spacing={2}>
                    <Grid size={{xs:12,md:6}}>
                        <Typography>Patient Details:</Typography>
                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography variant="body">Full Name</Typography>
                            <Typography>{patientData.fullName}</Typography>
                        </Box>
                        <hr />
                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography variant="body">
                                Age
                            </Typography>
                            <Typography>{patientData.age}</Typography>
                        </Box>
                        <hr />
                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography variant="body">
                                Date of Birth
                            </Typography>
                            <Typography>{patientData.dateOfBirth}</Typography>
                        </Box>
                        <hr />
                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography variant="body">
                                Gender
                            </Typography>
                            <Typography>{patientData.gender}</Typography>
                        </Box>
                        <hr />
                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography variant="body">
                             Height
                            </Typography>
                            <Typography>{patientData.height}</Typography>
                        </Box>
                        <hr />
                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography variant="body">
                                Weight
                            </Typography>
                            <Typography>{patientData.weight}</Typography>
                        </Box>
                        <hr />
                    </Grid>
                    <Grid size={{xs:12,md:6}}>
                        <BillSection patientData={patientData}></BillSection>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default PaymentPage;
