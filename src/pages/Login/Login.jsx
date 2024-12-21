import { useStoreActions } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, TextField, Button } from '@mui/material';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const { loginUser } = useStoreActions(action => action.user);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        loginUser({ data, navigate });
    };

    return (
        <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Box padding={3} border={1} borderRadius={1} boxShadow={2}>
                    <Typography variant="h4" gutterBottom>
                        Login Now
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box display="flex" flexDirection="column" gap={2} marginBottom={3}>
                            <TextField
                                required
                                label="Email"
                                {...register("email")}
                                type="email"
                                fullWidth
                            />
                            <TextField
                                required
                                label="Password"
                                {...register("password")}
                                type="password"
                                fullWidth
                            />
                        </Box>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Log in
                        </Button>
                    </form>
                    <Typography variant="h6" align="center" marginTop={2}>
                        or continue with
                    </Typography>
                    <Box display="flex" justifyContent="center" gap={2} marginTop={2}>
                        <Button variant="outlined" color="secondary">Google</Button>
                        <Button variant="outlined" color="secondary">Facebook</Button>
                        <Button variant="outlined" color="secondary">Github</Button>
                    </Box>
                    <Typography variant="body1" align="center" marginTop={2}>
                        Don't have an account? <Link style={{ textDecoration: 'none' }} to="/register">Create account</Link>
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={0} sm={0} md={6} lg={4}>
                {/* Optional image section */}
                <Box 
        sx={{
            width: "100%",
            height: "auto",
            maxWidth: { xs: "300px", sm: "400px", md: "500px" },
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}
    >
        <img 
            src="https://res.cloudinary.com/dmel68anu/image/upload/v1734793108/r1rtval401jdtq0epfe1.jpg" 
            alt="Registration Illustration" 
            style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
            }}
        />
    </Box>
            </Grid>
        </Grid>
    );
};

export default Login;
