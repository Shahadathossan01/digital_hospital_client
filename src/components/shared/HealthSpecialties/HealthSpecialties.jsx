import { Box, Typography } from "@mui/material";
import HealthSpecialitiesList from "../HealthSpecialitiesList/HealthSpecialitiesList";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";

const Header = ({doctor}) => {
    return (
      <Box sx={{ textAlign: 'center',pt:5,pb:3}}>
        <Typography 
          variant="h7" 
          sx={{ 
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }, 
            fontWeight: 'bold', 
            color: 'primary.main',
          }}
        >
          Expert Health Specialties
        </Typography>
        <Typography
      variant="body1"
      sx={{
        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem', lg: '1.25rem' },
        color: 'text.secondary',
        lineHeight: 1.6,
        textAlign: 'center',
      }}
    >
      Explore <span style={{color:"red"}}>{doctor?.length}</span> Specialities Doctor are Available Here!
    </Typography>
      </Box>
    );
  };

const HealthSpecialties = () => {
   const { getDoctors } = useStoreActions((action) => action.doctor);
  const { data } = useStoreState((state) => state.doctor);
    useEffect(() => {
      getDoctors();
    }, [getDoctors]);
    if(!data){
      return
    }
    const filterValidData=data.filter((item)=>item.isValid==true)
    return (
        <Box sx={{marginTop:{xs:"40px",sm:"40px",md:"60px",lg:"80px"},bgcolor:"#f3e5f5",pb:4}}>
            <Header doctor={filterValidData}></Header>
            <HealthSpecialitiesList filterDoctor={filterValidData} home="true"></HealthSpecialitiesList>
        </Box>
    );
};

export default HealthSpecialties;