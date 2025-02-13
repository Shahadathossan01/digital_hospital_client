import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { useStoreState } from 'easy-peasy';

const ChangePassword = ({handleClose}) => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useStoreState((state) => state.user);

  const onSubmit = (data) => {
    console.log(data);
    // Add logic to handle password change here
    reset(); // Clear the form after submission
    handleClose()
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',p: 2 ,bgcolor:"white"}}>
      <Box sx={{ width: 400}}>
        <CardContent>
          <Typography variant="h5" textAlign="center" fontWeight="bold" mb={3}>
            Change Password
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Box mb={2}>
              <TextField
                fullWidth
                disabled
                value={user?.email}
                label="Email"
                InputProps={{ readOnly: true }}
                variant="outlined"
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Old Password"
                type="password"
                variant="outlined"
                {...register("oldPass", { required: "Old Password is required" })}
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                variant="outlined"
                {...register("newPass", { required: "New Password is required" })}
              />
            </Box>
            <Button type="submit" variant="contained" fullWidth sx={{ py: 1.2, fontSize: 16 }}>
              Confirm
            </Button>
          </form>
        </CardContent>
      </Box>
    </Box>
  );
}

export default ChangePassword;
