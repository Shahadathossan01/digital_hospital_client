import { Box, Typography } from "@mui/material";
import HealthSpecialitiesList from "../HealthSpecialitiesList/HealthSpecialitiesList";

const Header = () => {
    return (
      <Box sx={{ textAlign: 'center', marginBottom: 3 ,marginTop:3}}>
        <Typography 
          variant="h4" 
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
      Explore <span style={{color:"red"}}>30</span> Specialities Doctor are Available Here!
    </Typography>
      </Box>
    );
  };

const HealthSpecialties = () => {
    return (
        <div>
            <Header></Header>
            <HealthSpecialitiesList></HealthSpecialitiesList>
        </div>
    );
};

export default HealthSpecialties;