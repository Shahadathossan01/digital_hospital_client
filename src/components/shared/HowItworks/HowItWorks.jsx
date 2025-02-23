import { Box, Grid, Paper, Typography, IconButton, Button } from "@mui/material";
import { CheckCircleOutline } from '@mui/icons-material'; // For icons
import {  Card, CardContent, CardMedia } from "@mui/material";
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
          How it Works
        </Typography>
      </Box>
    );
  };


  const HowItWorkCard = ({ item, iconColor = "#ff9800" }) => {
    return (
      <Card
        sx={{
          width: 350, // Fixed width
          height: 450, // Fixed height
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          borderRadius: 3,
          boxShadow: 5,
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)", // Subtle zoom effect on hover
          },
        }}
      >
        {/* Fixed Image at the Top */}
        <CardMedia
          component="img"
          image={item.image}
          alt={item.title}
          sx={{
            height: 220, // Fixed height for consistency
            width: "100%", // Ensures the image fits within the card
            objectFit: "cover",
          }}
        />
  
        <CardContent
          sx={{
            textAlign: "center",
            padding: 3,
            flexGrow: 1, // Ensures content takes up equal space
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Position */}
          <Typography variant="body2" sx={{ color: item.iconColor, mt: 1 }}>
            {item.position}
          </Typography>
  
          {/* Icon with Color */}
          <IconButton sx={{ color: item.iconColor || iconColor }}>
            <CheckCircleOutline sx={{ fontSize: 40 }} />
          </IconButton>
  
          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mt: 1,
              color: "#333",
              minHeight: "48px", // Ensures titles align even if one is longer
            }}
          >
            {item.title}
          </Typography>
        </CardContent>
      </Card>
    );
  };
  


  
  
  const HowItWorksList=()=>{
    const steps=[
        {
            id:"1",
            position:"step-1",
            title:"Find Your Doctor",
            image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUzGgwXvDTVPwc-N_ThcpALlCAcHIpir62A&s",
            iconColor:"#ff9800"
        },
        {
            id:"2",
            position:"step-2",
            title:"Apply for Appointment",
            image:"https://static.vecteezy.com/system/resources/previews/013/141/034/non_2x/book-doctor-appointment-card-template-schedule-hospital-visit-editable-social-media-post-design-flat-color-illustration-for-poster-web-banner-ecard-vector.jpg",
            iconColor:"#388e3c"
        },
        {
            id:"3",
            position:"step-3",
            title:"Get Service",
            image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1UgzTr-TO7AJ131aMVOTu33px_lmbFLhLCA&s",
            iconColor:"#880e4f"
        }
    ]
    return (
        <Box sx={{display:"flexs",justifyContent:"center",alignItems:"center",marginTop:"10px",padding:"0px 10px 20px 10px"}}>
              <Grid
                container
                spacing={2}
                sx={{
                  justifyContent:"center"
                 
                }}
              >
                {steps.map((item) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    key={item.id}
                    sx={{
                      display: "flex", // Ensures proper card centering within each Grid item
                      justifyContent: "center", // Center horizontally within the grid
                    }}
                  >
                    <HowItWorkCard item={item}></HowItWorkCard>
                  </Grid>
                ))}
              </Grid>
            </Box>
    )
  }

const HowItWorks = () => {
    return (
        <Box sx={{marginTop:{xs:"40px",sm:"40px",md:"60px",lg:"80px"},bgcolor:"#f3e5f5"}}>
            <Header></Header>
            <HowItWorksList></HowItWorksList>
        </Box>
    );
};

export default HowItWorks;
