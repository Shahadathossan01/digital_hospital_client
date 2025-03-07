
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { isValidEmailOrPhone } from "../../utils";
import { useStoreActions } from "easy-peasy";

const ForgotPassword = () => {
    const {sendResetLink}=useStoreActions(actions=>actions.user)
 const {register,handleSubmit}=useForm()

  const handleForgotPassword = ({credential}) => {
    sendResetLink({credential})
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
          marginTop:"100px"
        }}
      >
        <Typography variant="h4" gutterBottom>
          Forgot Password
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={2}>
          Enter your credential as email or phone address to receive a password reset URL.
        </Typography>
        <form onSubmit={handleSubmit(handleForgotPassword)}>
        <TextField
  required
  label="Email"
  {...register("credential", {
    required: "This field is required",
    validate: (value) =>
      isValidEmailOrPhone(value) || "Enter a valid email or 11-digit phone number",
  })}
  type="text" // Change type to text to allow numbers
  fullWidth
/>
          <Button sx={{marginTop:"20px"}} type="submit" variant="contained" color="primary" fullWidth>
            Send Reset Link
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
