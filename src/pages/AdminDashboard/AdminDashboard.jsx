import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

const AdminDashboard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: 2,
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{ marginBottom: 3, color: "#1976d2" }}
      >
        Welcome to Dashboard
      </Typography>

      <Link to="/adminCreateUser" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: 2,
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          Add User
        </Button>
      </Link>
    </Box>
  );
};

export default AdminDashboard;
