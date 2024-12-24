import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { useStoreActions } from 'easy-peasy';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AcceptAppointmentModal({ open, handleClose, appointmentID, reqApplyedID ,date,time}) {
  const { register, handleSubmit, reset } = useForm();
  const { updateAppointment } = useStoreActions((action) => action.appointment);

  const onSubmit = (data) => {
    updateAppointment({ data, appointmentID, reqApplyedID,date,time});
    reset();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="accept-appointment-dialog-title"
      aria-describedby="accept-appointment-dialog-description"
    >
      <DialogTitle id="accept-appointment-dialog-title">Accept Appointment</DialogTitle>
      <DialogContent>
        <DialogContentText id="accept-appointment-dialog-description" sx={{ marginBottom: 2 }}>
          Create A Google Meet Link And Fils This Input Field.
        </DialogContentText>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register('googleMeetLink')}
                required
                label="Google Meet Link"
                type="url"
                placeholder="https://meet.google.com/abc-defg-hij"
                fullWidth
              />
            </Grid>
          </Grid>
          <DialogActions sx={{ paddingTop: 2 }}>
            <Button type="button" sx={{ color: 'red' }} onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Confirm
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
