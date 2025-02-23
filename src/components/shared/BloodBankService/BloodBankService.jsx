import { Box, Button, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
const Header = () => {
    return (
      <Box sx={{ textAlign: 'center'}}>
        <Typography 
          variant="h7" 
          sx={{ 
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }, 
            fontWeight: 'bold', 
            color: 'primary.main',
          }}
        >
         Blood Donation
        </Typography>
      </Box>
    );
  };
const BloodBankService = () => {
    return (
        <Box sx={{marginTop:{xs:"40px",sm:"40px",md:"60px",lg:"80px"}}}>
            <Header></Header>
            <Grid sx={{marginTop:"10px"}} container spacing={0}>
      {/* Left side: Image */}
      <Grid
        size={{xs:12,sm:6,md:4}}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="https://static.vecteezy.com/system/resources/previews/008/190/897/non_2x/human-blood-donate-on-white-background-free-vector.jpg"
          alt="Ambulance"
          style={{
            width: "100%",
            height: "auto",  // Makes the image scale proportionally
            maxHeight: "350px",  // Set max height to maintain consistent image siz
          }}
        />
      </Grid>

      {/* Right side: Text and Button */}
      <Grid
        size={{xs:12,sm:6,md:8}}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center", // Center the content horizontally
          bgcolor:"#f44336",
          padding:"20px"
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2, textAlign: "center",color:"white" }}>
          We will Try to find Blood Donner for Helping Patients.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            borderRadius: 2,
            paddingX: 4,
            textAlign: "center", // Center the text inside the button
          }}
        >
          Request
        </Button>
      </Grid>
    </Grid>
        </Box>
    );
};

export default BloodBankService;