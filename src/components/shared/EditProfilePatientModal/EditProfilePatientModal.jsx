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
import checkUpdatedData from '../../../utils';

const EditProfilePatientModal=({open,handleClose,userID})=>{
    const {updateProfile}=useStoreActions(action=>action.patient)
  const {register,handleSubmit,reset}=useForm()
  
  const onSubmit=(data)=>{
    const updatedFormData=checkUpdatedData(data)
    updateProfile({updatedFormData,userID})
    reset()
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
             <div style={{marginBottom:'20px'}}>
                <label htmlFor="firstName">First Name: </label>
                <input {...register("firstName")} type="text" name="firstName" id="firstName" />
             </div>
             <div style={{marginBottom:'20px'}}>
                <label htmlFor="lasttName">Last Name: </label>
                <input {...register("lastName")} type="text" name="lastName" id="lastName" />
             </div>
             <div style={{marginBottom:'20px'}}>
                <label htmlFor="phone">Phone: </label>
                <input {...register("phone")} type="number" name="phone" id="phone" />
             </div>
             <div style={{marginBottom:'20px'}}>
                <label htmlFor="address">Addresss: </label>
                <input {...register("address")} type="text" name="address" id="address" />
             </div>
             <div style={{marginBottom:'20px'}}>
                <label htmlFor="dateOfBirth">Date of Birth: </label>
                <input {...register("dateOfBirth")} type="date" name="dateOfBirth" id="dateOfBirth" />
             </div>
             <div style={{marginBottom:'20px'}}>
                <label htmlFor="genter">Gender: </label>
                <input {...register("gender")} type="text" name="gender" id="gender" />
             </div>
             <div style={{marginBottom:'20px'}}>
                <label htmlFor="blood">Blood: </label>
                <input {...register("blood")} type="text" name="blood" id="blood" />
             </div>
             <div style={{marginBottom:'20px'}}>
                <label htmlFor="age">Age: </label>
                <input {...register("age")} type="number" name="age" id="age" />
             </div>
             <div style={{marginBottom:'20px'}}>
                <label htmlFor="height">Height: </label>
                <input {...register("height")} step="any" type="number" name="height" id="height" />
             </div>
             <div style={{marginBottom:'20px'}}>
                <label htmlFor="weight">Weight: </label>
                <input {...register("weight")} step="any" type="number" name="weight" id="weight" />
             </div>
          <Button type="submit">Edit</Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default EditProfilePatientModal