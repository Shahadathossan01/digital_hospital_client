import { useStoreActions } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, TextField, Button } from '@mui/material';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const { loginUser} = useStoreActions(action => action.user);
    // const { user} = useStoreActions(state=>state.user);
    const navigate=useNavigate()
    const location=useLocation()
    const from=location.state?.from?.pathname || "/"

    const onSubmit = async(data) => {
       await loginUser({ data});
       const user=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null
       if(user?.role=="patient"){
          navigate(from,{replace:true})
          return
        }
         navigate("/")
    };

    return (
        <Box
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        padding={2}
        >
        <Box padding={3} 
                border={1} 
                borderRadius={2} 
                boxShadow={3} 
                maxWidth={400} 
                width="100%"
                bgcolor="background.paper">
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
                    {/* <Typography variant="h6" align="center" marginTop={2}>
                        or continue with
                    </Typography>
                    <Box display="flex" justifyContent="center" gap={2} marginTop={2}>
                        <Button variant="outlined" color="secondary">Google</Button>
                        <Button variant="outlined" color="secondary">Facebook</Button>
                        <Button variant="outlined" color="secondary">Github</Button>
                    </Box> */}
                    <Typography variant="body1" align="center" marginTop={2}>
                        Don't have an account? <Link style={{ textDecoration: 'none' }} to="/register">Create account</Link>
                    </Typography>
        </Box>
        </Box>
    );
};

export default Login;
