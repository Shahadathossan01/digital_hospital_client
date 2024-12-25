import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { useStoreActions } from 'easy-peasy';

export default function EditScheduleStatusModal({ open, handleClose, doctorID, scheduleID }) {
  const { register, handleSubmit, reset } = useForm();
  const { updateScheduleStatus } = useStoreActions((action) => action.doctor);

  const onSubmit = (data) => {
    const status = data.status;
    updateScheduleStatus({ doctorID, scheduleID, status });
    reset();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Schedule Status</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {/* Status Dropdown */}
              <TextField
                {...register("status")}
                select
                fullWidth
                label="Status"
                defaultValue="available"
              >
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="busy">Busy</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Grid container justifyContent="flex-end" spacing={2} style={{ marginTop: '16px' }}>
            <Grid item>
              <Button onClick={handleClose} variant="outlined">
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                Confirm
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}
