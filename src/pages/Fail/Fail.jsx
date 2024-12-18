import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Fail = () => {
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
          color: theme.palette.error.main,
        }}
      >
        Oops! Something Went Wrong.
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
        Unfortunately, the request failed. Please try again.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        component={Link}
        to="/"
        sx={{
          textTransform: "none",
          px: 3,
          py: 1.5,
        }}
      >
        Go Back Home
      </Button>
    </Box>
  );
};

export default Fail;
