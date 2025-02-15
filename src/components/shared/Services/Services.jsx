import { Box, Typography } from "@mui/material";
import ServiceList from "../ServiceList/ServiceList";

const Header = () => {
  return (
    <Box sx={{ textAlign: 'center', marginBottom: 3 ,marginTop:3}}>
      <Typography 
        variant="h7" 
        sx={{ 
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }, 
          fontWeight: 'bold', 
          color: 'white',
        }}
      >
        Our Services
      </Typography>
    </Box>
  );
};

const Services = () => {
    const serviceItem=[
        {
            id:"1",
            img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2cFwy4wtH_IyPBezuAgzPTmlrEuT4Mh0riw&s",
            title:"Get Instant Video Call",
            body:"The Instant Video Call feature in our online treatment app enables quick and secure consultations with doctors, ensuring timely medical advice from anywhere."
        },
        {
            id:"2",
            img:"https://equivahealth.com/wp-content/uploads/2022/08/digital-health-hub.jpg",
            title:"Health Hub",
            body:"HealthHub in our online treatment app provides access to medical records, lab results, appointments, and referrals from public healthcare institutions."
        },
        {
            id:"3",
            img:"https://www.shutterstock.com/image-photo/doctor-using-virtual-touch-screen-260nw-2364863099.jpg",
            title:"Medicine Hub",
            body:"The Medicine Hub in our online treatment app allows users to order prescriptions, track medications, and access dosage reminders for better health management."
        },
        {
            id:"4",
            img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqvMfZBZBURk0UOvUZfvL9PWRTdOE3g3Szqw&s",
            title:"Lab Testing",
            body:"The Lab Testing feature in our online treatment app provides access to lab test bookings, results, and reports, ensuring seamless health monitoring."
        }
    ]
    return (
        <Box sx={{marginTop:"90px",bgcolor:"#304ffe"}}>
            <Header></Header>
            <ServiceList serviceItem={serviceItem}></ServiceList>
        </Box>
    );
};

export default Services;