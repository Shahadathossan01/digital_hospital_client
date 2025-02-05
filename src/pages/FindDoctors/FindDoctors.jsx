import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import DoctorCard from "../../components/shared/DoctorCard/DoctorCard";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { filterDoctorBySpecialty, specialityName } from "../../utils";

import { TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import HealthSpecialitiesList from "../../components/shared/HealthSpecialitiesList/HealthSpecialitiesList";

const FilterSection = ({specialty,handleFilterValue}) => {
  
  return (
    <Grid container spacing={2} alignItems="center">
      {/* Left: Dropdown */}
      <Grid size={{xs:12,sm:6}}>
        <FormControl fullWidth>
          <InputLabel>Specialty</InputLabel>
          <Select
            defaultValue="all"
            onChange={(e)=>{handleFilterValue(e.target.value)}}
            fullWidth
          >
            <MenuItem  value="all">All</MenuItem>
            {
              specialty.map(item=>(
                <MenuItem key={item} value={item}>{item}</MenuItem>
                
              ))
            }
          </Select>
        </FormControl>
      </Grid>

      {/* Right: Search Bar */}
      <Grid size={{xs:12,sm:6}}>
        <TextField
          fullWidth
          label="Search"
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};




const FindDoctors = () => {
  const { getDoctors } = useStoreActions((action) => action.doctor);
  const { data } = useStoreState((state) => state.doctor);
  const specialty = specialityName(data);
  const [filterValue, setFilterValue] = useState("all");

  const filterDoctor = filterDoctorBySpecialty(data, filterValue);

  const handleFilterValue=(value)=>{
    setFilterValue(value)
  }
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
    <Box sx={{paddingTop:"50px"}}>
      <Typography>Select Doctor</Typography>
      <Box sx={{marginTop:"20px"}}>
        <FilterSection handleFilterValue={handleFilterValue} specialty={specialty}></FilterSection>
      </Box>
      <Typography sx={{marginTop:"10px"}}>20 doctors are available</Typography>
      <Box>
        <HealthSpecialitiesList filterDoctor={filterDoctor}></HealthSpecialitiesList>
      </Box>
    </Box>
  );
};

export default FindDoctors;
