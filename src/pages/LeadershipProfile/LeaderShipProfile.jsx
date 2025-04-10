
import { Card, CardContent, Typography, Avatar, Box, Collapse, } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useState } from 'react';

const ProfileCard = ({ item }) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <Card sx={{ maxWidth: 300, mx: 'auto', p: 2 }}>
      <Box display="flex" justifyContent="center" mb={2}>
        <Avatar
          alt={item.name}
          src={item.img}
          sx={{ width: 150, height: 150 }}
        />
      </Box>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <Typography variant="h6" component="div" gutterBottom>
            {item.name}
          </Typography>
          <KeyboardDoubleArrowDownIcon
            onClick={() => setIsShow(!isShow)}
            sx={{
              color: 'blue',
              cursor: 'pointer',
              transform: isShow ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
          />
        </Box>

        <Typography variant='body2'  component="div" gutterBottom>
          {item.role}
        </Typography>

        <Collapse in={isShow}>
          <Typography color="text.secondary" mt={1}>
            {item.vio}
          </Typography>
        </Collapse>
      </CardContent>
    </Card>
  );
};
const Banner = () => {
    return (
      <Box
        sx={{
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src="https://t4.ftcdn.net/jpg/04/28/76/95/360_F_428769564_NB2T4JM9E2xsxFdXXwqW717HwgaZdpAq.jpg"
          alt="Banner"
          sx={{
            width: '100%',
            height: '150px',
            display: 'block',
            objectFit: 'cover',
          }}
        />
      </Box>
    );
  };
const LeaderShipProfile = () => {
    const executiveLeaderShip=[
        {
            id:'1',
            img:'https://media.istockphoto.com/id/1391718981/photo/portrait-of-a-confident-young-businessman-standing-with-his-arms-crossed-in-an-office.jpg?s=612x612&w=0&k=20&c=eF_0QCtw-Y8Q2c4_xQe6KTkcSPiGCT6qBf6nuavE2Dg=',
            name:'Shahadat Hosen',
            role:'Executive Vice President, Institutional',
            vio:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente mollitia officia debitis facilis consequatur totam autem beatae minima nesciunt quis vero eum doloremque commodi assumenda nulla, omnis eaque possimus optio. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam omnis, dolorum nihil corrupti, incidunt quibusdam iusto nemo iste veniam dolores possimus quos non accusantium laudantium. Deserunt quia voluptate eos quisquam.'
        }
    ]
    const clientManagement=[
        {
            id:'1',
            img:'https://media.istockphoto.com/id/1391718981/photo/portrait-of-a-confident-young-businessman-standing-with-his-arms-crossed-in-an-office.jpg?s=612x612&w=0&k=20&c=eF_0QCtw-Y8Q2c4_xQe6KTkcSPiGCT6qBf6nuavE2Dg=',
            name:'Shahadat Hosen',
            role:'Executive Vice President, Institutional',
            vio:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente mollitia officia debitis facilis consequatur totam autem beatae minima nesciunt quis vero eum doloremque commodi assumenda nulla, omnis eaque possimus optio. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam omnis, dolorum nihil corrupti, incidunt quibusdam iusto nemo iste veniam dolores possimus quos non accusantium laudantium. Deserunt quia voluptate eos quisquam.'
        },
        {
            id:'2',
            img:'https://media.istockphoto.com/id/1391718981/photo/portrait-of-a-confident-young-businessman-standing-with-his-arms-crossed-in-an-office.jpg?s=612x612&w=0&k=20&c=eF_0QCtw-Y8Q2c4_xQe6KTkcSPiGCT6qBf6nuavE2Dg=',
            name:'Shahadat Hosen',
            role:'Executive Vice President, Institutional',
            vio:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente mollitia officia debitis facilis consequatur totam autem beatae minima nesciunt quis vero eum doloremque commodi assumenda nulla, omnis eaque possimus optio. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam omnis, dolorum nihil corrupti, incidunt quibusdam iusto nemo iste veniam dolores possimus quos non accusantium laudantium. Deserunt quia voluptate eos quisquam.'
        },
        {
            id:'3',
            img:'https://media.istockphoto.com/id/1391718981/photo/portrait-of-a-confident-young-businessman-standing-with-his-arms-crossed-in-an-office.jpg?s=612x612&w=0&k=20&c=eF_0QCtw-Y8Q2c4_xQe6KTkcSPiGCT6qBf6nuavE2Dg=',
            name:'Shahadat Hosen',
            role:'Executive Vice President, Institutional',
            vio:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente mollitia officia debitis facilis consequatur totam autem beatae minima nesciunt quis vero eum doloremque commodi assumenda nulla, omnis eaque possimus optio. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam omnis, dolorum nihil corrupti, incidunt quibusdam iusto nemo iste veniam dolores possimus quos non accusantium laudantium. Deserunt quia voluptate eos quisquam.'
        }
       
    ]
    const salesAndConsRelatiions=[
        {
            id:'1',
            img:'https://media.istockphoto.com/id/1391718981/photo/portrait-of-a-confident-young-businessman-standing-with-his-arms-crossed-in-an-office.jpg?s=612x612&w=0&k=20&c=eF_0QCtw-Y8Q2c4_xQe6KTkcSPiGCT6qBf6nuavE2Dg=',
            name:'Shahadat Hosen',
            role:'Executive Vice President, Institutional',
            vio:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente mollitia officia debitis facilis consequatur totam autem beatae minima nesciunt quis vero eum doloremque commodi assumenda nulla, omnis eaque possimus optio. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam omnis, dolorum nihil corrupti, incidunt quibusdam iusto nemo iste veniam dolores possimus quos non accusantium laudantium. Deserunt quia voluptate eos quisquam.'
        },
        {
            id:'2',
            img:'https://media.istockphoto.com/id/1391718981/photo/portrait-of-a-confident-young-businessman-standing-with-his-arms-crossed-in-an-office.jpg?s=612x612&w=0&k=20&c=eF_0QCtw-Y8Q2c4_xQe6KTkcSPiGCT6qBf6nuavE2Dg=',
            name:'Shahadat Hosen',
            role:'Executive Vice President, Institutional',
            vio:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente mollitia officia debitis facilis consequatur totam autem beatae minima nesciunt quis vero eum doloremque commodi assumenda nulla, omnis eaque possimus optio. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam omnis, dolorum nihil corrupti, incidunt quibusdam iusto nemo iste veniam dolores possimus quos non accusantium laudantium. Deserunt quia voluptate eos quisquam.'
        },
        {
            id:'3',
            img:'https://media.istockphoto.com/id/1391718981/photo/portrait-of-a-confident-young-businessman-standing-with-his-arms-crossed-in-an-office.jpg?s=612x612&w=0&k=20&c=eF_0QCtw-Y8Q2c4_xQe6KTkcSPiGCT6qBf6nuavE2Dg=',
            name:'Shahadat Hosen',
            role:'Executive Vice President, Institutional',
            vio:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente mollitia officia debitis facilis consequatur totam autem beatae minima nesciunt quis vero eum doloremque commodi assumenda nulla, omnis eaque possimus optio. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam omnis, dolorum nihil corrupti, incidunt quibusdam iusto nemo iste veniam dolores possimus quos non accusantium laudantium. Deserunt quia voluptate eos quisquam.'
        }
        
    ]
    const marketing=[
        {
            id:'1',
            img:'https://media.istockphoto.com/id/1391718981/photo/portrait-of-a-confident-young-businessman-standing-with-his-arms-crossed-in-an-office.jpg?s=612x612&w=0&k=20&c=eF_0QCtw-Y8Q2c4_xQe6KTkcSPiGCT6qBf6nuavE2Dg=',
            name:'Shahadat Hosen',
            role:'Executive Vice President, Institutional',
            vio:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente mollitia officia debitis facilis consequatur totam autem beatae minima nesciunt quis vero eum doloremque commodi assumenda nulla, omnis eaque possimus optio. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam omnis, dolorum nihil corrupti, incidunt quibusdam iusto nemo iste veniam dolores possimus quos non accusantium laudantium. Deserunt quia voluptate eos quisquam.'
        },
        {
            id:'2',
            img:'https://media.istockphoto.com/id/1391718981/photo/portrait-of-a-confident-young-businessman-standing-with-his-arms-crossed-in-an-office.jpg?s=612x612&w=0&k=20&c=eF_0QCtw-Y8Q2c4_xQe6KTkcSPiGCT6qBf6nuavE2Dg=',
            name:'Shahadat Hosen',
            role:'Executive Vice President, Institutional',
            vio:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente mollitia officia debitis facilis consequatur totam autem beatae minima nesciunt quis vero eum doloremque commodi assumenda nulla, omnis eaque possimus optio. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam omnis, dolorum nihil corrupti, incidunt quibusdam iusto nemo iste veniam dolores possimus quos non accusantium laudantium. Deserunt quia voluptate eos quisquam.'
        },
        {
            id:'3',
            img:'https://media.istockphoto.com/id/1391718981/photo/portrait-of-a-confident-young-businessman-standing-with-his-arms-crossed-in-an-office.jpg?s=612x612&w=0&k=20&c=eF_0QCtw-Y8Q2c4_xQe6KTkcSPiGCT6qBf6nuavE2Dg=',
            name:'Shahadat Hosen',
            role:'Executive Vice President, Institutional',
            vio:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente mollitia officia debitis facilis consequatur totam autem beatae minima nesciunt quis vero eum doloremque commodi assumenda nulla, omnis eaque possimus optio. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam omnis, dolorum nihil corrupti, incidunt quibusdam iusto nemo iste veniam dolores possimus quos non accusantium laudantium. Deserunt quia voluptate eos quisquam.'
        }
    ]
    return (
        <Box sx={{mt:12}}>
            <Box>
                <Typography variant='h4' sx={{textAlign:'center',mb:2}}>Our People</Typography>
                <Banner></Banner>
                <Typography variant='body2' sx={{textAlign:'center',mb:2,color:'#7e57c2'}}>We work closely with you to turn your needs into personalized solutions.</Typography>
            </Box>
            <Box sx={{mt:8}}>
                <Typography variant='h5'>
                Executive Leadership
                </Typography>
                <Box display="flex" flexWrap="wrap" alignItems="flex-start" gap={2} mt={5}>
                {
                    executiveLeaderShip.map((item)=>(
                        <ProfileCard key={item.id} item={item}></ProfileCard>
                    ))
                }
                </Box>
            </Box>
            <Box sx={{mt:8}}>
                <Typography variant='h5'>
                    Client management
                </Typography>
                <Box display="flex" flexWrap="wrap" alignItems="flex-start" gap={2} mt={5}>
                {
                    clientManagement.map((item)=>(
                        <ProfileCard key={item.id} item={item}></ProfileCard>
                    ))
                }
                </Box>
            </Box>
            <Box sx={{mt:8}}>
                <Typography variant='h5'>
                Sales and Consultant Relations
                </Typography>
                <Box display="flex" flexWrap="wrap" alignItems="flex-start" gap={2} mt={5}>
                {
                    salesAndConsRelatiions.map((item)=>(
                        <ProfileCard key={item.id} item={item}></ProfileCard>
                    ))
                }
                </Box>
            </Box>
            <Box sx={{mt:8}}>
                <Typography variant='h5'>
                Marketing Researchers
                </Typography>
                <Box display="flex" flexWrap="wrap" alignItems="flex-start" gap={2} mt={5}>
                {
                    marketing.map((item)=>(
                        <ProfileCard key={item.id} item={item}></ProfileCard>
                    ))
                }
                </Box>
            </Box>
        </Box>
    );
};
export default LeaderShipProfile;