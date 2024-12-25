import { Box, Button, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
    const {getDoctors}=useStoreActions(action=>action.doctor)
    const {data}=useStoreState(state=>state.doctor)

    useEffect(()=>{
        getDoctors()
    },[getDoctors])

    if(!data) return
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 500,
                width: '100%',
                backgroundColor: '#e3f2fd',
            }}
        >
            <Paper 
                elevation={3} 
                sx={{
                    bgcolor: '#40c4ff',
                    padding: 3,
                    width: '100%',
                    maxWidth: 1200,
                }}
            >
                <Grid container spacing={4} alignItems="center">
                    {/* Left Content */}
                    <Grid size={{xs:12,sm:6}}>
                        <Typography 
                            variant="h4" 
                            component="h1" 
                            sx={{ fontWeight: 'bold', color: '#ffffff', marginBottom: 2 }}
                        >
                            Consult a doctor anytime, anywhere via video call.
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ color: '#ffffff', marginBottom: 3 }}
                        >
                            Zoom/Google Meet consultations made simple and efficient.
                        </Typography>
                        <Box 
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <Link to="/availableDoctors">
                            <Button 
                                variant="contained" 
                                size="large" 
                                sx={{ bgcolor: '#ffffff', color: '#40c4ff', '&:hover': { bgcolor: '#f5f5f5' } }}
                            >
                                Find Doctors
                            </Button>
                            </Link>
                            <Typography 
                                variant="body1" 
                                sx={{ color: '#ffffff' }}
                            >
                                Available Doctors: <strong>{data?.length}</strong>
                            </Typography>
                        </Box>
                    </Grid>
                    
                    {/* Right Image */}
                    <Grid size={{xs:12,sm:6}}>
                        <Box 
                            component="img" 
                            src="https://res.cloudinary.com/dmel68anu/image/upload/v1734792690/ix0y25brqa0mtstdb4di.png"
                            alt="Consult Doctor"
                            sx={{
                                width: '100%',
                                maxWidth: 400,
                                height: 'auto',
                                borderRadius: 2,
                            }}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default Banner;
