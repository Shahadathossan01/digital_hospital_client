import { Box, Button, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const SectionOne=()=>{
    return (
        <Box sx={{ flexGrow: 1, padding: "40px 20px", maxWidth: "1200px", margin: "auto" }}>
            <Grid container spacing={4} alignItems="center">
                {/* Left Side: Text Content */}
                <Grid item xs={12} sm={6} md={6}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                        Are you a certified and qualified medical professional?
                    </Typography>
                    <Typography sx={{ mb: 1, fontWeight: "bold" }}>
                        Step into the future of digital healthcare innovation.
                    </Typography>

                    <Typography sx={{ mb: 1 }}>
                        Join our platform to set up your virtual practice, provide medical consultations through video calls, and expand your reach to care for more patients.
                    </Typography>
                    <Typography sx={{ mb: 2 ,fontWeight: "bold",color:"gray" }}>
                        Get started in just minutes and make a difference!
                    </Typography>
                    <Link to="/becomeADoctorForm">
                    <Button variant="contained" color="secondary" sx={{ borderRadius: 2, paddingX: 3 }}>
                        Join Now
                    </Button>
                    </Link>
                </Grid>

                {/* Right Side: Image */}
                <Grid item xs={12} sm={6} md={6}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZt2HlRCF-0ZEhqiPBkUTF9k3yofftG-hv0Q&s"
                            alt="Join Now"
                            style={{ width: "100%", maxWidth: "450px", borderRadius: "12px", objectFit: "cover" }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}
const SectionTwo=()=>{
    return (
        <Box>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                Why you use our platform!
            </Typography>
            <Typography sx={{ mb: 1 }}>
                Doctors can easily join our platform through a simple onboarding process. Every doctor is thorought verified to ensure that only BMDC-authorized professionals provide consultations, leveraging our advanced technology.
            </Typography>
            <Typography sx={{ mb: 1 }}>
            By joining us, you’ll be at the forefront of digital healthcare innovation, delivering accessible and high-quality care to patients everywhere.
            </Typography>
            <Typography sx={{ mb: 1 }}>
            As a part of our platform, you’ll work independently, make autonomous medical decisions, and receive full support from our technical team—whether you're in a session or outside of one.
            </Typography>

        </Box>
    )
}

const BecomeADoctor = () => {
    return (
        <Box sx={{marginTop:"40px"}}>
            <SectionOne></SectionOne>
            <SectionTwo></SectionTwo>
        </Box>
    );
};

export default BecomeADoctor;
