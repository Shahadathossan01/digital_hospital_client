import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import DoctorCard from "../../components/shared/DoctorCard/DoctorCard";
import { Box, Typography, CircularProgress } from "@mui/material";

const Home = () => {
  const { getDoctors } = useStoreActions((action) => action.doctor);
  const { data } = useStoreState((state) => state.doctor);

  useEffect(() => {
    getDoctors();
  }, [getDoctors]);
  if (!data) {
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

  if (data.length =='0') {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" color="textSecondary">
          There is no doctor available
        </Typography>
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
        variant="h3"
        sx={{
          textAlign: "center",
          mb: 3,
          fontWeight: "bold",
          color: "text.primary",
        }}
      >
        Available Doctors
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {data.map((item) => (
          <DoctorCard key={item._id} item={item} />
        ))}
      </Box>
    </Box>
  );
};

export default Home;
