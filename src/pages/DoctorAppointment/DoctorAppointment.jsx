import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import AppointCard from "../../components/shared/AppointCard/AppointCard";
import { Box, Typography, CircularProgress } from "@mui/material";

const DoctorAppointment = () => {
    const {getDoctorById}=useStoreActions(action=>action.doctor)
    const {doctor,updatedAppointmentData}=useStoreState(state=>state.doctor)
    const {user}=useStoreState(state=>state.user)
    console.log(doctor)
    const userID=user?.id

    useEffect(()=>{
        getDoctorById(userID)
    },[userID,getDoctorById,updatedAppointmentData])

  if (!user || !doctor) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Appointments
      </Typography>
      {doctor?.appointments?.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {doctor.appointments.map((item) => (
            <AppointCard isDoctor key={item._id} item={item} />
          ))}
        </Box>
      ) : (
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            mt: 5,
          }}
        >
          No appointments found.
        </Typography>
      )}
    </Box>
  );
};

export default DoctorAppointment;