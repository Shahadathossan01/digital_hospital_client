import { Box, Typography } from "@mui/material";
import DoctorAppointmentTable from "../../components/shared/DoctorAppointmentTable/DoctorAppointmentTable";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";


const DoctorAppointments = () => {
    const {getDoctorById}=useStoreActions(action=>action.doctor)
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
    
        const appointments=doctor?.appointments
    return (
        <Box sx={{bgcolor:"white",borderRadius:"10px",padding:"10px"}}>
            <Typography variant="h6" color="success" fontWeight="bold">Appointments</Typography>

            <DoctorAppointmentTable appointments={appointments}></DoctorAppointmentTable>
        </Box>
    );
};

export default DoctorAppointments;