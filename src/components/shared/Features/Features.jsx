import { Box, Grid, Paper, Typography, IconButton, Button } from "@mui/material";
import { CheckCircleOutline } from '@mui/icons-material'; // For icons
import { useStoreState } from "easy-peasy";
import { Link } from "react-router-dom";

const Features = () => {
    const {user}=useStoreState(state=>state.user)
    return (
        <Box
            sx={{
                backgroundColor: '#f5f5f5',
                padding: { xs: 2, sm: 4 },
                minHeight: '100vh',
            }}
        >
            <Typography
                variant="h4"
                component="h2"
                sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    marginBottom: 4,
                    color: '#40c4ff',
                }}
            >
                Features
            </Typography>
            {
                !user&&
            <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
                <Typography
    sx={{
        fontSize: '18px',
        color: '#555',
        textAlign: 'center', // Centered the text for better alignment
        marginBottom: 2, // Add some margin to separate from other sections
    }}
>
    To use these features, you must be registered.
    <Box>
    <Link to="/register">
    <Button
        style={{
            color: '#40c4ff',
            fontWeight: 'bold',
            cursor: 'pointer',
            textDecoration: 'underline',
            transition: 'all 0.3s ease', // Smooth transition for hover effect
        }}
        onClick={() => alert('Redirect to Registration Page')}
        onMouseEnter={(e) => e.target.style.color = '#0288d1'} // Change color on hover
        onMouseLeave={(e) => e.target.style.color = '#40c4ff'} // Reset color when hover ends
    >
        Register Now
    </Button>
    </Link>
    </Box>
</Typography>

            </Box>
            }
            <Paper
                elevation={3}
                sx={{
                    padding: { xs: 3, sm: 5 },
                    borderRadius: 2,
                    backgroundColor: '#fff',
                }}
            >
                <Grid container spacing={4} alignItems="center">
                    {/* Feature 1 */}
                    <Grid item xs={12} sm={6}>
                        <Box
                            sx={{
                                textAlign: 'center',
                                padding: 3,
                                boxShadow: 3,
                                borderRadius: 2,
                                backgroundColor: '#e1f5fe', // Blue background
                            }}
                        >
                            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                                Step-1
                            </Typography>
                            <IconButton sx={{ color: '#40c4ff' }}>
                                <CheckCircleOutline />
                            </IconButton>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 'bold',
                                    marginBottom: 2,
                                    color: '#333',
                                }}
                            >
                                Patients Can Apply for Appointments
                            </Typography>
                            <Box
                                component="img"
                                src="http://res.cloudinary.com/dmel68anu/image/upload/v1735157112/xsrrpiykxsgls7dpl9um.png"
                                alt="Appointment"
                                sx={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    borderRadius: 2,
                                }}
                            />
                        </Box>
                    </Grid>

                    {/* Feature 2 */}
                    <Grid item xs={12} sm={6}>
                        <Box
                            sx={{
                                textAlign: 'center',
                                padding: 3,
                                boxShadow: 3,
                                borderRadius: 2,
                                backgroundColor: '#e1f5fe', // Same Blue background as Step-1
                            }}
                        >
                            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                                Step-2
                            </Typography>
                            <IconButton sx={{ color: '#388e3c' }}>
                                <CheckCircleOutline />
                            </IconButton>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 'bold',
                                    marginBottom: 2,
                                    color: '#333',
                                }}
                            >
                                One-to-One Video Communication
                            </Typography>
                            <Box
                                component="img"
                                src="http://res.cloudinary.com/dmel68anu/image/upload/v1735157775/lqpiutcictfmvw3rzprl.webp"
                                alt="Video Communication"
                                sx={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    borderRadius: 2,
                                }}
                            />
                        </Box>
                    </Grid>

                    {/* Feature 3 */}
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                textAlign: 'center',
                                padding: 3,
                                boxShadow: 3,
                                borderRadius: 2,
                                backgroundColor: '#e1f5fe', // Same Blue background
                            }}
                        >
                            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                                Step-3
                            </Typography>
                            <IconButton sx={{ color: '#ff9800' }}>
                                <CheckCircleOutline />
                            </IconButton>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 'bold',
                                    marginBottom: 2,
                                    color: '#333',
                                }}
                            >
                                At Last, Provide a Prescription
                            </Typography>
                            <Box
                                component="img"
                                src="http://res.cloudinary.com/dmel68anu/image/upload/v1735159233/ivmx6bce6neryluo9lqf.png"
                                alt="Prescription"
                                sx={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    borderRadius: 2,
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default Features;
