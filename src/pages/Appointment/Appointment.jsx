import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import AppointCard from "../../components/shared/AppointCard/AppointCard";
import { Box, Typography, CircularProgress } from "@mui/material";

const Appointment = () => {
  const { user } = useStoreState((state) => state.user);
  const { getPatient } = useStoreActions((action) => action.patient);
  const { patient, delteState } = useStoreState((state) => state.patient);
  const { updatedData } = useStoreState((state) => state.testRecommendation);
  const { deletedMedicin } = useStoreState((state) => state.prescription);
  const userID = user?.id;

  useEffect(() => {
    if (userID) {
      getPatient(userID);
    }
  }, [getPatient, userID, delteState, updatedData, deletedMedicin]);

  if (!user || !patient) {
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
      {patient?.appointments?.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {patient.appointments.map((item) => (
            <AppointCard isDoctor={false} key={item._id} item={item} />
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

export default Appointment;
