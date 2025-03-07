import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import DoctorCard from "../../components/shared/DoctorCard/DoctorCard";
import { Box, Typography, CircularProgress, Button, Divider } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { filterDoctorBySpecialty, specialityName } from "../../utils";

import { TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import HealthSpecialitiesList from "../../components/shared/HealthSpecialitiesList/HealthSpecialitiesList";

const FilterSection = ({specialty,handleFilterValue}) => {
  
  return (
    <Grid sx={{marginTop:"10px"}} container spacing={2} alignItems="center">
      {/* Left: Dropdown */}
      <Grid size={{xs:12,sm:6}}>
        <FormControl fullWidth>
          <InputLabel>Specialty</InputLabel>
          <Select
            defaultValue="all"
            onChange={(e)=>{handleFilterValue(e.target.value)}}
            sx={{width:"300px"}}
            label="Speciality"
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
      {/* <Grid size={{xs:12,sm:6}}>
        <TextField
          fullWidth
          label="Search"
          variant="outlined"
        />
      </Grid> */}
    </Grid>
  );
};

const FindDoctors = () => {
  const { getDoctors } = useStoreActions((action) => action.doctor);
  const { data } = useStoreState((state) => state.doctor);
  
  const [filterValue, setFilterValue] = useState("all");

  
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
        textAlign: "center"
      }}
      >
        <Typography variant="h4" color="textSecondary">
          There is no doctor available
        </Typography>
      </Box>
    );
  }
  
  const filterValidDoctor=data.filter((item)=>item.isValid===true)
  const specialty = specialityName(filterValidDoctor);

  const filterDoctor = filterDoctorBySpecialty(filterValidDoctor, filterValue);
  return (
    <Box sx={{padding:"100px 30px 0px 30px"}}>
      <Box sx={{padding:"50px 0px 0px 50px"}}>
        <Typography variant="h6">Select Doctors By Speciality:</Typography>
        <FilterSection handleFilterValue={handleFilterValue} specialty={specialty}></FilterSection>
        <Typography variant="h6" sx={{marginTop:"20px",textAlign:"center"}}><strong style={{color:"red"}}>{filterDoctor?.length}</strong> doctors are available</Typography>
      </Box>
      <Box sx={{marginTop:"10px"}}>
        <HealthSpecialitiesList filterDoctor={filterDoctor}></HealthSpecialitiesList>
      </Box>
    </Box>
  );
};

export default FindDoctors;
