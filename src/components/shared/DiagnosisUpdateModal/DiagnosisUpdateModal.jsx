import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useStoreActions, useStoreState } from 'easy-peasy';

export default function DiagnosisUpdateModal({open,handleClose,item}) {
    const {updateDiagnosis}=useStoreActions(action=>action.prescription)

  if(!item) return;
  const id=item?.prescription._id
  const {register,handleSubmit,reset}=useForm()
  const onSubmit=(data)=>{
    updateDiagnosis({data,id})
    reset()
    handleClose()
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("diagnosis")}
          id="diagnosis"
          name="diagnosis"
          label="Diagnosis"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            padding: "10px 0",
            fontWeight: "bold",
          }}
        >
          confirm
        </Button>
      </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
