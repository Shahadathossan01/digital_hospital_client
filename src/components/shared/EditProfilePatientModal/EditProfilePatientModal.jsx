import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useForm } from 'react-hook-form';
import { useStoreActions } from 'easy-peasy';
import { Grid } from '@mui/material';
import { checkUpdatedData } from '../../../utils';

const EditProfilePatientModal=({open,handleClose,userID})=>{
    const {updateProfile}=useStoreActions(action=>action.patient)
  const {register,handleSubmit,reset}=useForm()
  const onSubmit=(data)=>{
    const updatedFormData=checkUpdatedData(data)
    updateProfile({updatedFormData,userID})
    reset()
    handleClose()
  }

  return (
   <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
   <DialogContent>
     <form onSubmit={handleSubmit(onSubmit)}>
       <Grid container spacing={2}>
         <Grid item xs={12} sm={6}>
           <TextField
             label="First Name"
             {...register("firstName")}
             fullWidth
             variant="outlined"
           />
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             label="Last Name"
             {...register("lastName")}
             fullWidth
             variant="outlined"
           />
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             label="Phone"
             {...register("phone")}
             type="number"
             fullWidth
             variant="outlined"
           />
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             label="Address"
             {...register("address")}
             fullWidth
             variant="outlined"
           />
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             label="Date of Birth"
             {...register("dateOfBirth")}
             type="date"
             fullWidth
             InputLabelProps={{ shrink: true }}
             variant="outlined"
           />
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             label="Gender"
             {...register("gender")}
             fullWidth
             variant="outlined"
           />
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             label="Blood Type"
             {...register("blood")}
             fullWidth
             variant="outlined"
           />
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             label="Age"
             {...register("age")}
             type="number"
             fullWidth
             variant="outlined"
           />
         </Grid>
         <Grid item xs={12} sm={6}>
         <TextField
             label="Height (fit)"
             {...register("height",{
          pattern: {
            value: /^[0-9]+(\.[0-9]+)?$/, 
            message: "Enter a valid number (e.g., 5 or 5.4)",
          }
             })}
             type="text"
             fullWidth
             variant="outlined"
           />
         </Grid>
         <Grid item xs={12} sm={6}>
         <TextField
             label="Weight (KG)"
             {...register("weight",{
          pattern: {
            value: /^[0-9]+(\.[0-9]+)?$/, 
            message: "Enter a valid number (e.g., 5 or 5.4)",
          }
             })}
             type="text"
             fullWidth
             variant="outlined"
           />
         </Grid>
       </Grid>
       <Grid container justifyContent="flex-end" spacing={2} mt={3}>
         <Grid item>
           <Button type="submit" variant="contained" color="primary">
             Save
           </Button>
         </Grid>
       </Grid>
     </form>
   </DialogContent>
   <DialogActions>
     <Button onClick={handleClose} variant="outlined" color="secondary">
       Cancel
     </Button>
   </DialogActions>
 </Dialog>
  );
}

export default EditProfilePatientModal