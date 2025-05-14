import { useStoreActions, useStoreState } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, TextField, Button } from '@mui/material';
import { Password } from '@mui/icons-material';
import { isValidEmailOrPhone } from '../../utils';
import { useEffect } from 'react';

const Login = () => {
    const { loginUser,addLoginError} = useStoreActions(action => action.user);
    useEffect(() => {
    addLoginError(null);
}, [addLoginError]);
    const { register, handleSubmit,formState:{errors} } = useForm({mode:'onChange'});
    const { loginError } = useStoreState(state => state.user);
    const navigate=useNavigate()
    const location=useLocation()
    const from=location.state?.from?.pathname || "/"

    const onSubmit = async(data) => {
        addLoginError(null)
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
                            label="Email"
                            {...register("credential", {
                                required: "This field is required",
                                validate: (value) =>
                                isValidEmailOrPhone(value) || "Enter a valid email",
                                onChange: () => {
                                if (loginError) addLoginError(null);
                                }
                                
                            })}
                            type="text" // Change type to text to allow numbers
                            fullWidth
                            error={!!errors.credential} // show error if from backend
                            helperText={
                                errors.credential?.message
                            }
                            />
                            <TextField
                                
                                label="Password"
                                {...register("password",{required:'This field is required'})}
                                type="password"
                                fullWidth
                                error={!!errors?.password}
                                helperText={errors?.password?.message}
                            />
                        </Box>
                        <Box>
                            {loginError && (
                        <Typography color="error" align="center" sx={{ mb: 2 }}>
                            {loginError}
                        </Typography>
                    )}
                        </Box>
                        <Typography sx={{display:'flex',justifyContent:"end",marginTop:"-15px",marginBottom:"10px"}}>
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
                        Don't have an account?
                    </Typography>
                    <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <Link style={{ textDecoration: 'none',color:'#2979ff' }} to="/register">Patient Registration</Link>
                        <Link style={{ textDecoration: 'none' ,color:'#2979ff'}} to="/becomeADoctor">Doctor Registration</Link>
                        <Link style={{ textDecoration: 'none',color:'#2979ff' }} to="/registerHealthHub">HealthHub Registration</Link>
                    </Box>
        </Box>
        </Box>
    );
};

export default Login;
