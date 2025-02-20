import { useStoreActions } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, TextField, Button } from '@mui/material';
import { Password } from '@mui/icons-material';
import { isValidEmailOrPhone } from '../../utils';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const { loginUser} = useStoreActions(action => action.user);
    const navigate=useNavigate()
    const location=useLocation()
    const from=location.state?.from?.pathname || "/"

    const onSubmit = async(data) => {
        const loginData={
            credential:data.credential,
            password:data.password
        }
        loginUser({loginData,from,navigate})
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
  label="Email or Phone"
  {...register("credential", {
    required: "This field is required",
    validate: (value) =>
      isValidEmailOrPhone(value) || "Enter a valid email or 11-digit phone number",
  })}
  type="text" // Change type to text to allow numbers
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
                        <Typography sx={{display:'flex',justifyContent:"end"}}>
                            <Link to={"/password/forgot"}>Forgot your password?</Link>
                        </Typography>
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
