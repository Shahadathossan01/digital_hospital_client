import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import RequestedAppointmentCard from "../../components/shared/RequestedAppointmentCard/RequestedAppointmentCard";
import { Box, Typography } from "@mui/material";

const RequestedAppointment = () => {
    const {getDoctorById}=useStoreActions(action=>action.doctor)
    const {doctor}=useStoreState(state=>state.doctor)
    const {user}=useStoreState(state=>state.user)
    const {updatedData}=useStoreState(state=>state.appointment)
    const {deleteData}=useStoreState(state=>state.applyedAppointment)
    const userID=user?.id

    useEffect(()=>{
        getDoctorById(userID)
    },[getDoctorById,userID,updatedData,deleteData])

    return (
        <div>
            <h1 style={{textAlign:'center'}}>Requested Appointments</h1>
            <Box sx={{display:'flex',flexWrap:'wrap',gap:'30px',justifyContent:'center'}}>
                {
                    doctor?.applyForAppointments.length=='0'?
                    <Typography
                    variant="body1"
                    sx={{textAlign: "center",color: "text.secondary",mt: 5,}}
                    >
                        no requested appointments found.
                    </Typography>
                    :
                    doctor?.applyForAppointments.map(item=>(
                        <RequestedAppointmentCard key={item._id} item={item}></RequestedAppointmentCard>
                    ))   
                }
            </Box>
        </div>
    );
};

export default RequestedAppointment;

