import { Box, Button, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
const Header = () => {
    return (
      <Box sx={{ textAlign: 'center',marginBottom:"10px",pt:5,pb:4}}>
        <Typography 
          variant="h7" 
          sx={{ 
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }, 
            fontWeight: 'bold', 
            color: 'primary.main',
          }}
        >
           Why Choose Us?
        </Typography>
      </Box>
    );
  };

  
  
  const ListItems = () => {
    const items=[
        {
          "id": "2b3c4d5e",
          "title": "Instant Doctor Appointments",
          "description": "No need to wait in long queues or struggle to find a specialist. Book your appointment within minutes and consult with experienced doctors at your preferred time."
        },
        {
          "id": "3c4d5e6f",
          "title": "Secure & Confidential Video Consultations",
          "description": "Speak directly with top healthcare professionals through high-quality video calls, ensuring a private and effective consultation from the comfort of your home."
        },
        {
          "id": "4d5e6f7g",
          "title": "Digital Prescriptions at Your Fingertips",
          "description": "Get your doctor’s prescription instantly after your consultation and use it to buy medicines from any pharmacy or order online."
        },
        {
          "id": "5e6f7g8h",
          "title": "Time & Cost-Efficient Healthcare",
          "description": "Save time, avoid unnecessary travel, and get medical care at an affordable cost without compromising on quality."
        },
        {
          "id": "6f7g8h9i",
          "title": "24/7 Accessibility",
          "description": "Whether it's a late-night emergency, a follow-up session, or a regular health check-up, our platform lets you connect with doctors anytime, anywhere."
        },
        {
          "id": "7g8h9i0j",
          "title": "Consult Specialists from Different Fields",
          "description": "From general physicians to specialized experts like cardiologists, dermatologists, psychologists, and more, get access to the right doctor based on your medical needs."
        },
       
      ]
      
    return (
      <Box sx={{ width: "100%", maxWidth: 400, margin: "auto", borderRadius: 2, boxShadow: 3 ,bgcolor:"white"}}>
        <List>
          {items.map((item) => (
            <ListItem key={item.id}>
              <ListItemAvatar>
                <DoneOutlineIcon sx={{color:"green"}}></DoneOutlineIcon>
              </ListItemAvatar>
              <ListItemText primary={item.title} sx={{ fontWeight: "bold"}} />
            </ListItem>
          ))}
        </List>
      </Box>
    );
  };
  

const Content=()=>{
    return (
        <Box sx={{paddingBottom:"20px",paddingLeft:"10px",paddingRight:"10px"}}>
            <Grid  container spacing={2}>
      {/* Left side: Image */}
      <Grid
        size={{xs:12,sm:6,md:6}}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="https://media.istockphoto.com/id/655887334/photo/why-choose-us.jpg?s=612x612&w=0&k=20&c=TJLPS91NH3rTJhdcAgB92M984kcJ80S910X-4XnTpNE="
          style={{
            width: "100%",
            height: "auto",  // Makes the image scale proportionally
            maxHeight: "350px",
            borderRadius:"10px"  // Set max height to maintain consistent image siz
          }}
        />
      </Grid>

      {/* Right side: Text and Button */}
      <Grid
        size={{xs:12,sm:6,md:6}}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", 
          
        }}
      >
        <ListItems></ListItems>
      </Grid>
    </Grid>
        </Box>
    )
}

const WhyChooseUs = () => {
    return (
        <Box sx={{marginTop:{xs:"40px",sm:"40px",md:"60px",lg:"80px"},bgcolor:"#f3e5f5"}}>
            <Header></Header>
            <Content></Content>
        </Box>
    );
};

export default WhyChooseUs;