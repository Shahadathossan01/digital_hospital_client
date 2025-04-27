
import { Card, CardContent, Typography, Avatar, Box, Collapse, CardMedia, Divider, } from '@mui/material';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { useState } from 'react';

const ProfileCard = ({ item }) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
      {/* Image Section */}
      <Box display="flex" justifyContent="center" mb={2}>
  <Box
    sx={{
      width: 120,
      height: 120,
      borderRadius: "50%",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f0f0", // optional
    }}
  >
    <CardMedia
      component="img"
      image={item.img}
      alt="No image uploaded"
      sx={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  </Box>
</Box>


      <CardContent>
        {/* Name and Arrow Section */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
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

        {/* Role Section */}
        <Typography sx={{ textAlign: 'center',mt:5 }} variant="body2" component="div" gutterBottom>
          {item.role}
        </Typography>

        {/* Bio Section */}
        <Collapse in={isShow}>
          <Typography color="text.secondary" mt={1}>
            {item.bio}
          </Typography>
        </Collapse>
      </CardContent>
    </Card>
  );
}
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
          src="http://res.cloudinary.com/dmel68anu/image/upload/v1745786283/pkj5yg9xjxhlyyihqqku.jpg"
          alt="Banner"
          sx={{
            width: '100%',
            height: '300px',
            display: 'block',
            objectFit: 'cover',
          }}
        />
      </Box>
    );
  };

const About = () => {
    return (
      <Card sx={{ margin: "auto", my: 4, p: 2 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            About
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Sure Line Private Company Ltd. is revolutionizing the way healthcare is delivered by offering seamless, global access to medical expertise through cutting-edge telemedicine. Our mission is to break down geographical barriers and ensure that every individual, regardless of location, receives the highest standard of care. From remote villages to urban centers, it empowers patients with timely consultations, advanced diagnostics, and personalized treatment plans, all facilitated by a network of international doctors and healthcare professionals. We are committed to making healthcare accessible, affordable, and efficient—because your health deserves no compromise.
          </Typography>
        </CardContent>
      </Card>
    );
  };
  
const Mission = () => {
  return (
    <Card sx={{ margin: "auto", my: 4, p: 2 }}>
      <CardContent>
        <Typography sx={{display:'flex',justifyContent:'right'}} variant="h4" gutterBottom>
          Mission
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sure Line Private Company Ltd. is dedicated to transforming healthcare access by providing high-quality, affordable medical services to underserved and rural communities in Bangladesh. Our mission is to harness the power of telemedicine to bridge the gap between these communities and international healthcare professionals, ensuring that everyone, regardless of location, receives the care they need. We are committed to expanding our services to include comprehensive psychological health support, recognizing the vital role mental well-being plays in overall health. Additionally, we will develop a robust training system for our health workers, equipping them with the skills necessary to deliver effective care and facilitate meaningful patient-doctor interactions. Through large-scale health campaigns targeting students, the elderly, and various communities, Sure Line aims to promote health education and disease prevention on a national and international scale. We also strive to maintain international collaborations, ensuring that our patients benefit from global medical expertise and standards.
        </Typography>
      </CardContent>
    </Card>
  );
};

const Vision = () => {
  return (
    <Card sx={{ margin: "auto", my: 4, p: 2 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Vision
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Our vision at Sure Line is to lead a global transformation in healthcare delivery, where every individual, regardless of their geographical or financial situation, has access to high-quality medical care. We envision a future where physical and mental health services are seamlessly integrated into everyday life, supported by well-trained health workers who are committed to serving their communities. It aspires to be a pioneer in telehealth, offering not only medical consultations but also comprehensive health education through community campaigns that empower people to take charge of their health. By fostering international partnerships, we will ensure that our services are of the highest quality, making world-class healthcare accessible to all. Our ultimate goal is to create a sustainable and inclusive healthcare model that can be replicated globally, breaking down barriers to healthcare and improving the lives of millions.
        </Typography>
      </CardContent>
    </Card>
  );
};




  
const LeaderShipProfile = () => {
    const executiveLeaderShip=[
        {
            id:'1',
            img:'http://res.cloudinary.com/dmel68anu/image/upload/v1745662407/wh8zxagq6t9ihsnvkznw.jpg',
            name:'Md. Moinul Islam',
            role:'Chairman',
            bio:'Md. Moinul Islam, Chairman of Sure Line Private Company Ltd. and Lecturer in the Department of Sociology and Social Work at Gono University. I hold both undergraduate and postgraduate degrees in Sociology from Jagannath University. My academic and professional endeavors are driven by a strong commitment to transforming the healthcare delivery system in Bangladesh. I am particularly focused on developing an affordable and accessible tele-healthcare model for rural and underserved populations. Through the integration of technology and sociological insight, my work aims to bridge healthcare disparities, promote equitable access, and contribute to social justice and sustainable community development.'
        }
    ]
    const clientManagement=[
        {
            id:'1',
            img:'http://res.cloudinary.com/dmel68anu/image/upload/v1745662701/acu9nvr8mkyqgdc2sj79.jpg',
            name:'Kauser ',
            role:'Consultant',
            bio:'Kauser is a dynamic legal professional and visionary entrepreneur, holding both LLB and LLM degrees from the prestigious University of Dhaka, following an outstanding academic journey with GPA 5 in both SSC and HSC. As the Founding Member and Managing Director of Sureline Pvt Ltd, he brings a unique blend of legal expertise, strategic insight, and leadership. Driven by a passion for innovation and social impact, he plays a central role in steering the company’s growth while upholding its core values and long-term vision.'
        },
        {
            id:'2',
            img:'http://res.cloudinary.com/dmel68anu/image/upload/v1745662851/th2mmvri5zfkkof9ljfd.jpg',
            name:'Wolid Fojlay Rabbi Raj',
            role:'Director',
            bio:'Wolid Fojlay Rabbi Raj is a multidisciplinary software engineer and creative technologist with a background in Computer Science and Engineering (GB). His work spans across mobile app development, 3D game design, and data analytics, with a strong focus on creating impactful, user-centric digital solutions. As a developer, he has launched market-ready healthcare app. He has also led award-winning projects at NASA Space Apps Challenge 2022, designing immersive educational games exploring space missions on Mars and Titan.Currently serving as a Director at Sure Line Private Company Ltd., He drives innovation in Tele-health solutions. He brings a creative design and innovation, cutting edge technology solutions, app scability,architectural designs. Also plays a vital role in the company Technical support and solutions.'
        },
        {
            id:'3',
            img:'http://res.cloudinary.com/dmel68anu/image/upload/v1745662917/lcxsu43sxy0fk6hnzxf6.jpg',
            name:'Azizul Hakim Faisal',
            role:'Managing Director',
            bio:'Azizul Hakim Faisal holds a B.Sc in Textile Engineering and is passionately committed to social work, particularly in the field of public health. With a deep sense of responsibility towards underprivileged communities, he dedicates his time and efforts to improving health awareness, access to basic healthcare, and overall well-being. Faisal believes in the power of collective change and works tirelessly to uplift the marginalized. His initiatives focus on creating a healthier society through education, support, and active community engagement. Driven by empathy and purpose, he strives to be a positive force for those who need it most.'
        },
        {
            id:'4',
            img:'http://res.cloudinary.com/dmel68anu/image/upload/v1745662998/djjjtydho2jehwnhdmww.png',
            name:'Md. Akhlac E Rasul',
            role:'Director',
            bio:'Dr. Md. Akhlac E Rasul (BVC Reg: 9627), a qualified Veterinary Surgeon with a BSc in Veterinary Science & Animal Husbandry (GB) and clinical training in Nepal, currently serves at Dhaka Pet Clinic, Tikatuli, Dhaka. Alongside his veterinary practice, he also works as a Director at Sureline Private Company. Sureline is committed to promoting equal care opportunities and focuses on developing sustainable, community-based long-term care solutions. Through this dual role, Dr. Rasul contributes to both animal health and human well-being, advocating for inclusive and compassionate care across communities.'
        },
        {
            id:'5',
            img:'http://res.cloudinary.com/dmel68anu/image/upload/v1745663081/iqyn0xcsjzbl49kn1tfo.jpg',
            name:'Md Shawn Sheikh',
            role:'Consultant',
            bio:'Md Shawn Sheikh is a teacher and researcher who studies ethics, good governance, and how to improve people’s lives. He teaches at the  University of Liberal Arts Bangladesh (ULAB) and is also doing higher studies in Malaysia. His work focuses on fairness, responsibility, and better systems for society. He has written about education, consumer rights, and moral values. Now, as a consultant for Sureline Telehealth Care, he supports their mission to bring easy and affordable healthcare to everyone—especially those in rural areas—through mobile and online services.'
        }
       
    ]
    return (
        <Box sx={{mt:12}}>
            <Box>
                <Banner></Banner>
                <Typography variant='h4' sx={{textAlign:'center',mb:2,mt:10}}>Our Team</Typography>
                <Typography variant='h6' sx={{textAlign:'center',mb:1,color:'#7e57c2',mt:2}}>We work closely with you to turn your needs into personalized solutions.</Typography><Divider></Divider>
            </Box>
            <Box sx={{mt:8}}>
                {/* <Typography variant='h5'>
                Executive Leadership
                </Typography> */}
                <Box display="flex" flexWrap="wrap" alignItems="flex-start" gap={2} mt={5}>
                {
                    executiveLeaderShip.map((item)=>(
                        <ProfileCard key={item.id} item={item}></ProfileCard>
                    ))
                }
                </Box>
            </Box>
            <Box sx={{mt:8}}>
                {/* <Typography variant='h5'>
                    Client management
                </Typography> */}
                <Box display="flex" flexWrap="wrap" alignItems="flex-start" gap={2} mt={5}>
                {
                    clientManagement.map((item)=>(
                        <ProfileCard key={item.id} item={item}></ProfileCard>
                    ))
                }
                </Box>
            </Box>
            <Box sx={{mt:10}}>
              <About></About>
              <Mission></Mission>
              <Vision></Vision>
            </Box>
        </Box>
    );
};
export default LeaderShipProfile;