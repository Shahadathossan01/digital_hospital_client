import { Box, IconButton, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import DoctorAppointmentTable from "../../components/shared/DoctorAppointmentTable/DoctorAppointmentTable";
import { useEffect, useState } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import PersonIcon from '@mui/icons-material/Person';
import { Card, CardContent, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { format, isEqual, parseISO } from "date-fns";
import AcceptAppointmentModal from "../../components/shared/AcceptAppointmentModal/AcceptAppointmentModal";
import { createSchedule, getTotalDaysInMonth } from "../../utils";
const ReqAppointmentCard = ({ item}) => {
      const {deleteApplyedData}=useStoreActions(action=>action.applyedAppointment)
        const [open, setOpen] = useState(false);
      
        const handleClickOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };
    if(!item){
        return null
    }
    const id=item._id
  return (
    <Card sx={{ width:"100%", boxShadow: 3, borderRadius: 2}}>
      <CardContent sx={{padding:"0px 2px"}}>
        <Box sx={{display:"flex",justifyContent:"space-between"}}>
        <Typography sx={{display:"flex",alignItems:"center"}} variant="body1" component="div">
            <PersonIcon></PersonIcon>
          {item?.patientDetails?.fullName}
        </Typography>
        <IconButton onClick={()=>deleteApplyedData(id)} aria-label="delete" size="small">
        <DeleteIcon sx={{color:"red"}} fontSize="inherit" />
      </IconButton>
        </Box>
        <Box sx={{display:"flex",justifyContent:"space-between"}}>
            <Typography color="text.secondary">📅 {format(new Date(item?.date),"M/d/yyyy")}</Typography>
            <Typography color="text.secondary">⏰ {item?.time}</Typography>
        </Box>
        <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"-15px"}}>
        <Typography
          sx={{
            fontWeight: "bold",
            color: item?.status === "Payed" ? "green" : "gray",
          }}
        >
         Status: {item?.status}
        </Typography>
        <Button
          onClick={handleClickOpen}
          variant="contained"
          color="primary"
          sx={{padding:"0px 0px"}}
        //   onClick={onActionClick}
        >
          Accept
        </Button>
        <AcceptAppointmentModal date={item?.date} time={item?.time} appointmentID={item?.appointmentID} open={open} handleClose={handleClose} reqApplyedID={item?._id}></AcceptAppointmentModal>
        </Box>
        
      </CardContent>
    </Card>
  );
};



const TodaysAppointments=({appointments})=>{
    return(
        <Box>
            <Typography variant="h6" color="success" fontWeight="bold">Todays Appointments</Typography>

            <DoctorAppointmentTable appointments={appointments} dashboard></DoctorAppointmentTable>
        </Box>
    )
}

const RequestedAppointment=({requestedAppointment})=>{
    if(requestedAppointment.length==0){
        return(
            <Typography
                    variant="body1"
                    sx={{textAlign: "center",color: "text.secondary",mt: 5,}}
                    >
                        no requested appointments found.
                    </Typography>
        )
    }
    return(
            <Box sx={{
                display:"flex",flexDirection:{xs:"row",sm:"row",md:"column"},
                gap:1, 
                justifyContent:"center",   
                }}>
                {
                    requestedAppointment?.map((item)=>(
                        <ReqAppointmentCard key={item._id} item={item}></ReqAppointmentCard>
                    ))
                }
            </Box>
    )
}

const Dashboard = () => {
    const {getDoctorById,updateSchedule}=useStoreActions(action=>action.doctor)
    const {doctor}=useStoreState(state=>state.doctor)
    const {user}=useStoreState(state=>state.user)
    const {updatedData}=useStoreState(state=>state.appointment)
    const {deleteData}=useStoreState(state=>state.applyedAppointment)
    const userID=user?.id
    useEffect(()=>{
      getDoctorById(userID)
    },[getDoctorById,userID,updatedData,deleteData])
    
    if(!doctor){
      return null
    }
    const doctorID=doctor?._id
    const scheduleDate=doctor?.schedule[0].date
    const localDate = new Date();
    const scheduleMonth = scheduleDate && format(parseISO(scheduleDate), "M")
    const localMonth=format(localDate,"M")
    // console.log("sc",scheduleMonth, "lo",localMonth)
    const areMonthsEqual=isEqual(scheduleMonth,localMonth)

    if(!areMonthsEqual){
      const date = new Date();
      const times=[]
      const totalMonthDays = getTotalDaysInMonth(date);
      const schedule = createSchedule(totalMonthDays, times);
      console.log(schedule)
      updateSchedule({doctorID,schedule})
    }

    const appointments=doctor?.appointments
    const requestedAppointment=doctor?.applyForAppointments
    return (
        <Box flexGrow={1}>
            <Grid container spacing={2}>
                <Grid sx={{bgcolor:"white",borderRadius:4,padding:"8px"}} size={{xs:12,sm:12,md:8}}>
                    <TodaysAppointments appointments={appointments}></TodaysAppointments>
                </Grid>
                <Grid sx={{bgcolor:"#ffcdd2",borderRadius:4,padding:"8px"}} size={{xs:12,sm:12,md:4}}>
                <Typography fontWeight="bold" sx={{textAlign:"center",color:"red",}}>Requested Appointments</Typography>
                <Box>
                    <RequestedAppointment requestedAppointment={requestedAppointment}></RequestedAppointment>
                </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;