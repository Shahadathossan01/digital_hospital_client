import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { useStoreActions } from 'easy-peasy';
import { Grid, Box, Typography } from '@mui/material';

const ChangePassword = ({ openCP, handleCloseCP, userID, userEmail }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    // Add logic to handle password change here
    reset(); // Clear the form after submission
  };

  return (
    <Dialog open={openCP} onClose={handleCloseCP}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To change your password, please enter your old password followed by the new password.
        </DialogContentText>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={2}>
            <TextField
              fullWidth
              disabled
              label="Email"
              value={userEmail}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Old Password"
              type="password"
              {...register("oldPass", { required: "Old Password is required" })}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              {...register("newPass", { required: "New Password is required" })}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Confirm
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseCP} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ChangePassword;
