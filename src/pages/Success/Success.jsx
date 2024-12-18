import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Success = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
        p: 3,
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: theme.palette.success.main,
        }}
      >
        Appointment Successful!
      </Typography>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        sx={{
          color: theme.palette.text.secondary,
          mb: 3,
        }}
      >
        You have successfully applied for the appointment.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        component={Link}
        to="/appointment"
        sx={{
          textTransform: "none",
          px: 3,
          py: 1.5,
        }}
      >
        View Appointment
      </Button>
    </Box>
  );
};

export default Success;
