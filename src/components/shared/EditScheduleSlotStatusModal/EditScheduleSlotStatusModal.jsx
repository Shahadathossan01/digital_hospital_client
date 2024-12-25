import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useForm } from 'react-hook-form';
import { useStoreActions } from 'easy-peasy';
import { checkUpdatedData } from '../../../utils';

export default function EditScheduleSlotStatusModal({
  open,
  handleClose,
  doctorID,
  scheduleID,
  slotID,
}) {
  const { register, handleSubmit, reset } = useForm();
  const { updateScheduleSlotStatus } = useStoreActions((action) => action.doctor);

  const onSubmit = (data) => {
    const updatedData = checkUpdatedData(data);
    const { time, status } = updatedData;

    if (time || status) {
      updateScheduleSlotStatus({
        doctorID,
        slotID,
        scheduleID,
        ...(time && { time }),
        ...(status && { status }),
      });
    }

    reset();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Schedule Slot Status</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '16px' }}>
          <Grid container spacing={2}>
            {/* Time Input */}
            <Grid item xs={12}>
              <TextField
                {...register('time')}
                type="time"
                fullWidth
                label="Time"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* Status Dropdown */}
            <Grid item xs={12}>
              <TextField
                {...register('status')}
                select
                fullWidth
                label="Status"
                defaultValue=""
                InputLabelProps={{
                  shrink: true,
                }}
              >
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="busy">Busy</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          {/* Submit and Cancel Buttons */}
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
