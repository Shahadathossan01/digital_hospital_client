import { useStoreActions, useStoreState } from "easy-peasy";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Box, Typography, TextField, Button } from '@mui/material';

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { registerUser } = useStoreActions(action => action.user);
    const { registerError } = useStoreState(state => state.user);
    const navigate = useNavigate();
    const onSubmit = (data) => {
        const { username, email, confirmPassword } = data;
        const formData=new FormData()
        formData.append("username",username)
        formData.append("email",email)
        formData.append("password",confirmPassword)
        registerUser({ formData, navigate });
    };
    const password = watch("password");

    return (
        <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            minHeight="100vh"
            padding={2}
        >
            <Box 
                padding={3} 
                border={1} 
                borderRadius={2} 
                boxShadow={3} 
                maxWidth={400} 
                width="100%"
                bgcolor="background.paper"
            >
                <Typography variant="h4" gutterBottom align="center">
                    Create an Account
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box display="flex" flexDirection="column" gap={2} marginBottom={3}>
                        <TextField
                            required
                            label="Username"
                            {...register("username")}
                            fullWidth
                        />
                        <TextField
                            required
                            label="Email"
                            {...register("email")}
                            type="email"
                            fullWidth
                        />
                        {errors.email && (
                            <Typography variant="body2" color="error">
                                {errors.email.message}
                            </Typography>
                        )}
                    </Box>
                    <Box display="flex" flexDirection="column" gap={2} marginBottom={3}>
                        <TextField
                            required
                            label="Password"
                            {...register("password")}
                            type="password"
                            fullWidth
                        />
                        <TextField
                            required
                            label="Confirm Password"
                            {...register("confirmPassword", {
                                validate: value => value === password || "Passwords do not match!"
                            })}
                            type="password"
                            fullWidth
                        />
                        {errors.confirmPassword && (
                            <Typography variant="body2" color="error">
                                {errors.confirmPassword.message}
                            </Typography>
                        )}
                    </Box>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Register
                    </Button>
                    <Typography variant="body1" align="center" marginTop={2}>
                        Already have an account?{" "}
                        <Link style={{ textDecoration: "none" }} to="/login">
                            Login
                        </Link>
                    </Typography>
                </form>
            </Box>
        </Box>
    );
};

export default Register;
