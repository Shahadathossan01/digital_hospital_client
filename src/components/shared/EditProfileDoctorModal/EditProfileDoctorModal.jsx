
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useForm } from 'react-hook-form';
import { useStoreActions, useStoreState } from 'easy-peasy';
import {checkUpdatedData} from '../../../utils';
import { Grid } from '@mui/material';

const EditProfileDoctorModal=({open,handleClose,userID})=>{
  const {updateProfile}=useStoreActions(action=>action.doctor)
  const {doctor}=useStoreState(state=>state.doctor)
  const {register,handleSubmit,reset}=useForm()
  
  const onSubmit=(data)=>{
    const updatedFormData=checkUpdatedData(data)
    updateProfile({userID,updatedFormData})
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
             label="Email"
             {...register("email")}
             type="email"
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
             label="Designation"
             {...register("designation")}
             fullWidth
             variant="outlined"
           />
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             label="Offline Chammber"
             {...register("offlineChamber")}
             fullWidth
             variant="outlined"
           />
         </Grid>
         <Grid item xs={12} sm={6}>
           <TextField
             required={!doctor?.fee}
             label="fee"
             {...register("fee")}
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

export default EditProfileDoctorModal