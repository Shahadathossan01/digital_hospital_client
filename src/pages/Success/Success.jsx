import { Link, useParams } from "react-router-dom";
import { Box, Typography, Button, Paper, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { format } from "date-fns";

const Success = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen is small
  const { transactionId } = useParams();
  const { getAppointments } = useStoreActions((actions) => actions.appointment);
  const { appointments } = useStoreState((state) => state.appointment);

  useEffect(() => {
    getAppointments();
  }, [getAppointments]);

  const filteredAppointment = appointments.find(
    (item) => item.transactionId === transactionId
  );

  if(filteredAppointment?.length==0){
    return null
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: isMobile ? 2 : 4,
          maxWidth: "500px",
          width: "100%",
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{ fontWeight: "bold", mb: 2, color: theme.palette.primary.main }}
        >
          {filteredAppointment?"🎉 Appointment Confirmed!":"Network Error!! Please try again.."}
        </Typography>

        {filteredAppointment ? (
          <>
            <Typography variant="body1"><strong>Applyed Date:</strong> {format(new Date(filteredAppointment?.createdAt), "M/d/yyyy")}</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Doctor Name:</strong> {filteredAppointment?.doctor?.title}{" "}
              {filteredAppointment?.doctor?.firstName}{" "}
              {filteredAppointment?.doctor?.lastName}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Schedule Date:</strong>
              {format(new Date(filteredAppointment?.date), "M/d/yyyy")}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Schedule Slot:</strong> {filteredAppointment?.time}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Total Fee:</strong> ${filteredAppointment?.totalFee}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "success.main",
                fontWeight: "bold",
                mt: 2,
              }}
            >
              ✅ Transaction ID: {filteredAppointment?.transactionId}
            </Typography>
          </>
        ) : (
          <Typography variant="body1" color="error.main">
            No appointment found for this Transaction ID.
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/"
          sx={{
            mt: 3,
            textTransform: "none",
            px: 3,
            py: 1.5,
            width: "100%",
          }}
        >
          Go to Home Page
        </Button>
      </Paper>
    </Box>
  );
};

export default Success;
