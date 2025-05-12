import { useStoreActions, useStoreState } from "easy-peasy";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Grid, Box, Typography, TextField, Button } from '@mui/material';
import { isValidEmailOrPhone } from "../../utils";

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({mode:'onChange'});
    const { registerUser,addRegisterError } = useStoreActions(action => action.user);
    const { registerError } = useStoreState(state => state.user);
    const navigate = useNavigate();
    const location=useLocation()
    const from=location.state?.from?.pathname || "/"
    const onSubmit = (data) => {
        addRegisterError(null)
        const { username, credential, confirmPassword } = data;
        const formData=new FormData()
        formData.append("username",username)
        formData.append("credential",credential)
        formData.append("password",confirmPassword)
        registerUser({ formData ,navigate,credential,from});
        
    };
    const password = watch("password");
    const errorMessage = registerError?.message;
    const errorField = registerError?.field;

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
                            {...register("username",{
                                required:"This field is required",
                            })}
                            fullWidth
                            error={!!errors.username} 
                            helperText={errors.username?.message} 
                        />
                        <TextField
                            required
                            label="Email"
                            {...register("credential", {
                                required: "This field is required",
                                validate: (value) =>
                                isValidEmailOrPhone(value) || "Enter a valid email",
                                onChange: () => {
                                if (registerError) addRegisterError(null);
                                }
                                
                            })}
                            type="text" // Change type to text to allow numbers
                            fullWidth
                            error={!!errors.credential || errorField === "credential"} // show error if from backend
                            helperText={
                                errors.credential?.message ||
                                (errorField === "credential" ? errorMessage : "")
                            }
                            />
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
                                required: "This field is required", // 👈 Added required rule
                                validate: value =>
                                    value === password || "Password not match!",
                            })}
                            type="password"
                            fullWidth
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                        />
                    </Box>
                    {!errorField && errorMessage && (
                        <Typography color="error" align="center" sx={{ mb: 2 }}>
                            {errorMessage}
                        </Typography>
                    )}
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
