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
        registerUser({ username, email, password: confirmPassword, navigate });
    };
    const password = watch("password");

    return (
        <Grid container spacing={4} justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Box padding={3} border={1} borderRadius={1} boxShadow={2}>
                    <Typography variant="h4" gutterBottom>
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
                            {registerError && (
                                <Typography variant="body2" color="error">
                                    {registerError}
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
                                label="Confirm password"
                                {...register("confirmPassword", {
                                    validate: value => value === password || "Password not match!"
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
                            Already have an account? Please <Link style={{ textDecoration: 'none' }} to="/login">Login</Link>
                        </Typography>
                    </form>
                </Box>
            </Grid>
            <Grid item xs={0} sm={0} md={6} lg={4}>
                {/* Optional image section */}
                <Box>
                    <Typography variant="h6" align="center">Image Placeholder</Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Register;
