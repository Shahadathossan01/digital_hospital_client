import { Box, Button, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
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
          Get Instant Video Consultation
        </Typography>
      </Box>
    );
  };
const InstantVideo = () => {
    return (
        <div>
            <Header></Header>
            <Grid container spacing={0}>
      {/* Left side: Image */}
      <Grid
        size={{xs:12,sm:6,md:4}}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="https://unitedhospitals.com/sites/doctor-consultation1.jpg"
          alt="Doctor Consultation"
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
          bgcolor:"#14a37f",
          padding:"20px"
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2, textAlign: "center",color:"white" }}>
          Consult with Doctors For Only TK 100!
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
          Live Consultation Now
        </Button>
      </Grid>
    </Grid>
        </div>
    );
};

export default InstantVideo;