import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import DoctorCard from "../../components/shared/DoctorCard/DoctorCard";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { categoryName, filterDoctorByCategory } from "../../utils";

const AvailableDoctors = () => {
  const { getDoctors } = useStoreActions((action) => action.doctor);
  const { data } = useStoreState((state) => state.doctor);
  const category = categoryName(data);
  const [filterValue, setFilterValue] = useState("all");

  const handleCategoryBtn = (data) => {
    setFilterValue(data.trim());
  };

  const filterDoctor = filterDoctorByCategory(data, filterValue);

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

  if (data.length === 0) {
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
    <Box>
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
      <Box sx={{ p: 2 }}>
        {/* Grid Container */}
        <Grid container spacing={2}>
          {/* Category Section */}
          <Grid
            size={{xs:12,
            sm:12,
            md:4,
            lg:3,
            xl:2,
            }}
            
            sx={{
              position: "sticky",
              top: 56, // Distance from the top
              height: "fit-content", // Ensures it doesn't overflow
              zIndex: 10,
              backgroundColor: "white",
              color: "black",
              padding: 2,
            }}
          >
            <Typography variant="h4" sx={{ mb: 2 }}>
              Categories
            </Typography>
            <Box
              sx={{
                display: { xs: "flex", sm: "flex" },
                flexWrap: { xs: "wrap", sm: "wrap" },
                gap: 2,
              }}
            >
              <Button
                onClick={() => handleCategoryBtn("all")}
                variant="outlined"
                sx={{
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  color: "white",
                  bgcolor: "gray",
                  mb: 1,
                  width: { xs: "auto", sm: "auto",md:"100%" },
                  "&:hover": {
                    bgcolor: "darkgray",
                  },
                }}
              >
                All
              </Button>
              {category?.map((item) => (
                <Button
                  onClick={() => handleCategoryBtn(item)}
                  key={item}
                  variant="outlined"
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    color: "white",
                    bgcolor: "gray",
                    mb: 1,
                    width: { xs: "auto", sm: "auto",md:"100%" },
                    "&:hover": {
                      bgcolor: "darkgray",
                    },
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>
          </Grid>

          {/* Doctor Cards Section */}
          <Grid size={{xs:12, sm:12, md:8,lg:9,xl:10}}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 4,
                justifyContent: { xs: "center", sm: "center" },
              }}
            >
              {filterDoctor?.map((item) => (
                <DoctorCard key={item._id} item={item} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AvailableDoctors;
