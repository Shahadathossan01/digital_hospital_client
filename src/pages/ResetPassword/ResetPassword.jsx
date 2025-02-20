
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useStoreActions } from "easy-peasy";

const ResetPassword = () => {
    const {resetPassword}=useStoreActions(actions=>actions.user)
    const { resetToken } = useParams();
    const navigate=useNavigate()
    const location=useLocation()
    const from=location.state?.from?.pathname || "/"
    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit =({password,confirmPassword}) => {
    resetPassword({password,confirmPassword,resetToken,navigate,from})
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: "center",
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Reset Password
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={2}>
          Enter your new password below.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="New Password"
            type="password"
            variant="outlined"
            fullWidth
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Confirm New Password"
            type="password"
            variant="outlined"
            fullWidth
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Reset Password
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ResetPassword;
