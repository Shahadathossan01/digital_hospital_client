import { Box, Typography } from "@mui/material";
import ServiceList from "../ServiceList/ServiceList";

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
        Our Services
      </Typography>
    </Box>
  );
};

const Services = () => {
    const serviceItem=[
        {
            id:"1",
            img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz7HaaouXVwHzR-kzTSovCqu2hDwWZOgdSgw&s",
            title:"Get Instant Video Call",
            body:"Connect with professionals instantly through video calls. It's easy, quick, and secure. Get started now!"
        },
        {
            id:"2",
            img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz7HaaouXVwHzR-kzTSovCqu2hDwWZOgdSgw&s",
            title:"Get Instant Video Call",
            body:"Connect with professionals instantly through video calls. It's easy, quick, and secure. Get started now!"
        },
        {
            id:"3",
            img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz7HaaouXVwHzR-kzTSovCqu2hDwWZOgdSgw&s",
            title:"Get Instant Video Call",
            body:"Connect with professionals instantly through video calls. It's easy, quick, and secure. Get started now!"
        },
        {
            id:"4",
            img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz7HaaouXVwHzR-kzTSovCqu2hDwWZOgdSgw&s",
            title:"Get Instant Video Call",
            body:"Connect with professionals instantly through video calls. It's easy, quick, and secure. Get started now!"
        }
    ]
    return (
        <div>
            <Header></Header>
            <ServiceList serviceItem={serviceItem}></ServiceList>
        </div>
    );
};

export default Services;