import { Box, Rating, Typography, Divider, TextField, Button } from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { format } from "date-fns";
import Grid from '@mui/material/Grid2';
import { useForm } from "react-hook-form";



const PromoSection=()=>{
    const {getPercentage,}=useStoreActions(actions=>actions.promoCode)
    const {error,percentage}=useStoreState(state=>state.promoCode)
    const {register,handleSubmit,reset}=useForm()
    const onSubmit=async(data)=>{
        const promoCode=data.promoCode
        getPercentage(promoCode)
        reset()
    }
    return(
        <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}>
        Apply Promo Code
      </Typography>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} justifyContent="center">
          {/* Promo Code Input */}
          <Grid item xs={12} sm={6} md={8}>
            <TextField
              type="text"
              {...register("promoCode",{required:true})}
              label="Enter Promo Code"
              name="promoCode"
              fullWidth
              variant="outlined"
            />
            <Box sx={{marginTop:"-10px",display:"flex",justifyContent:"center",marginBottom:"-20px"}}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {((percentage > 0 ||percentage==100)&& !error) && <p>Discount Applied: {percentage}%</p>}
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
    console.log(patientData)
    const {percentage,error}=useStoreState(state=>state.promoCode)
    const discountAmount=(patientData.fee*percentage)/100;
    const totalFee=patientData.fee-discountAmount
    const { getUrl } = useStoreActions((action) => action.sslCommerz);

    const handlePayment=()=>{
        const payload={
            ...patientData,
            totalFee
        }
        getUrl(payload)
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
                            percentage==100?
                            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{marginTop:"-10px",marginBottom:"10px"}}
            >
              Fee Appointment
            </Button>:
            <Button
            onClick={handlePayment}
            variant="contained"
            color="primary"
            fullWidth
            sx={{marginTop:"-10px",marginBottom:"10px"}}
          >
            Continue to payment
          </Button> }
                        
                        
        </Box>
    )
}

const PaymentPage = () => {
    const location = useLocation();
    const patientData = location.state || {};
    const { getDoctorById } = useStoreActions(actions => actions.doctor);
    const { doctor } = useStoreState(state => state.doctor);
    const doctorId = patientData.doctorID;
    const {getPercentage}=useStoreActions(actions=>actions.promoCode)
    

    useEffect(() => {
        getDoctorById(doctorId);
    }, [doctorId, getDoctorById]);

    const localDate = new Date();

    if (!doctor) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 ,paddingTop:"20px"}}>
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
