import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useForm } from 'react-hook-form';
import { useStoreActions } from 'easy-peasy';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AcceptAppointmentModal({open,handleClose,appointmentID,reqApplyedID}){
  const {register,handleSubmit,reset}=useForm()
  const {updateAppointment}=useStoreActions(action=>action.appointment)
  const onSubmit=(data)=>{
    updateAppointment({data,appointmentID,reqApplyedID})
    reset()
    // console.log(data)
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="date">Date:</label><br />
              <input required {...register("date")} type="date" name="date" id="date" />
            </div>
            <div>
              <label htmlFor="time">Time</label><br />
              <input required {...register("time")} type="time" name="time" id="time" />
            </div>
            <div>
              <label htmlFor="link">Google Meet Link:</label><br />
              <input required {...register("googleMeetLink")} type="text" name="googleMeetLink" id="link" />
            </div>
          <Button type='submit' onClick={handleClose}>comfirm</Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button sx={{color:'red'}} onClick={handleClose}>cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
