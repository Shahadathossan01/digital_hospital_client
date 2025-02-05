
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useForm } from 'react-hook-form';
import { useStoreActions, useStoreState } from 'easy-peasy';
import {checkUpdatedData} from '../../../utils';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import Grid from "@mui/material/Grid2"

const specialitys=[
  {
      id:"1",
      name:"Anesthesiology"
  },
  {
      id:"2",
      name:"Cardiology"
  },
  {
      id:"3",
      name:"Cardiothoracic Surgery"
  },
  {
      id:"4",
      name:"colorectal Surgery"
  },
  {
      id:"5",
      name:"Dentisty"
  },
  {
      id:"6",
      name:"Dermatology and Venereology"
  },
  {
      id:"7",
      name:"Gastroenterology"
  },
  {
      id:"8",
      name:"General Physician"
  },
  {
      id:"9",
      name:"General Surgery"
  },
  {
      id:"10",
      name:"Gynaecology and Obstetrics"
  },
  {
      id:"11",
      name:"Haematology"
  },
  {
      id:"12",
      name:"Hepatology"
  },
  {
      id:"13",
      name:"Internal medicine"
  },
  {
      id:"14",
      name:"Nephrology"
  },
  {
      id:"15",
      name:"Neuromedicine"
  },
  {
      id:"16",
      name:"Neuosurgery"
  },
  {
      id:"17",
      name:"Oncology"
  },
  {
      id:"18",
      name:"Oral and Maxilofacial Surgery"
  },
  {
      id:"19",
      name:"Orthopedics"
  },
  {
      id:"20",
      name:"Otolaryngology(ENT)"
  },
  {
      id:"21",
      name:"Pediatric Surgery"
  },
  {
      id:"22",
      name:"Pediatrics"
  },
  {
      id:"23",
      name:"Plastic Surgery"
  },
  {
      id:"24",
      name:"Psychiatry"
  },
  {
      id:"25",
      name:"Radiology"
  },
  {
      id:"26",
      name:"Reproductive Endocrinology and Intertility"
  },
  {
      id:"27",
      name:"Respiratory medicine"
  },
  
  {
      id:"28",
      name:"Rheumatology"
  },
  {
      id:"29",
      name:"Urology"
  },
  {
      id:"30",
      name:"Vascular Surgery"
  },
  {
      id:"31",
      name:"Ophthaimology"
  },
  {
      id:"32",
      name:"Family Medicine"
  },
  {
      id:"33",
      name:"Physical Medicine & Rehabilitation"
  },
  
]
const EditProfileDoctorModal=({open,handleClose,userID})=>{
  const {register,handleSubmit,reset}=useForm()
  const {updateProfile}=useStoreActions(action=>action.doctor)
  const {doctor}=useStoreState(state=>state.doctor)
  
  const onSubmit=(data)=>{
    const updatedFormData=checkUpdatedData(data)
    updateProfile({userID,updatedFormData})
    reset()
    handleClose()
  }

  return (
   <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
   <DialogContent>
   <Box sx={{ flexGrow:1,paddingTop:"50px"}}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Personal Information
          </Typography>

          <Grid container spacing={2}>

            {/* First Name */}
            <Grid size={{xs:12 ,sm:6,md:4,lg:3}}>
              <TextField {...register("firstName")} label="First Name" name="firstName" fullWidth />
            </Grid>

            {/* Last Name */}
            <Grid size={{xs:12,sm:6,md:4,lg:3}}>
              <TextField  {...register("lastName")} label="Last Name" name="lastName" fullWidth />
            </Grid>

            {/* Date of Birth */}
            <Grid size={{xs:12,sm:6,md:4,lg:3}}>
            <TextField 
                {...register("dateOfBirth")}
                type="date" 
                name="dateOfBirth" 
                label="Date of Birth" 
                fullWidth 
                focused
            />
            </Grid>

            {/* Mobile */}
            <Grid size={{xs:12,sm:6,md:4,lg:3}}>
              <TextField {...register("mobile")} type="number" label="Mobile" name="mobile" fullWidth />
            </Grid>

            {/* NID/Passport */}
            <Grid size={{xs:12,sm:6,md:4,lg:3}}>
              <TextField {...register("nidOrPassport")} label="NID/Passport Number" name="nidOrPassport" fullWidth />
            </Grid>

            {/* Nationality */}
            <Grid size={{xs:12,sm:6,md:4,lg:3}}>
              <FormControl fullWidth>
                <InputLabel>Nationality</InputLabel>
                <Select {...register("nationality")} name="nationality">
                  <MenuItem value="Bangladesh">Bangladesh</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Gender */}
            <Grid size={{xs:12,sm:6,md:4,lg:3}}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select {...register("gender")} name="gender">
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Fee */}
            <Grid size={{xs:12,sm:6,md:4,lg:3}}>
              <TextField {...register("fee")} label="Fee" name="fee" fullWidth />
            </Grid>

            {/* Organization */}
            <Grid size={{xs:12,sm:6,md:4,lg:3}}>
              <TextField {...register("organization")} label="Organization" name="organization" fullWidth />
            </Grid>

            {/* Biography */}
            <Grid size={{xs:12}}>
              <TextField {...register("biography")} label="Biography" name="biography" multiline rows={3} fullWidth />
            </Grid>
          </Grid>
            </Box>
            <Box sx={{marginTop:"40px"}}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Professional Information
          </Typography>

          <Grid container spacing={2}>

          <Grid size={{xs:12}}>
              <FormControl fullWidth>
                <InputLabel>Title</InputLabel>
                <Select {...register("title")} name="title" defaultValue="">
                  <MenuItem value="Dr.">Dr.</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/**Designation */}
          <Grid size={{xs:12}}>
          <TextField {...register("designation")} label="Designation" name="designation" fullWidth />
            </Grid>

            {/* BMDC Number */}
            <Grid size={{xs:12,sm:6,md:4,lg:3}}>
              <TextField {...register("bmdcNumber")} label="BMDC Number" name="bmdcNumber" fullWidth />
            </Grid>

            {/* BMDC Expiry Date */}
            <Grid size={{xs:12,sm:6,md:4,lg:3}}>
            <TextField
                {...register("bmdcExpiryDate")} 
                type="date" 
                name="bmdcExpiryDate" 
                label="BMDC Expiry Date" 
                fullWidth 
                focused
            />
            </Grid>

            {/* Degree */}
            <Grid size={{xs:12,sm:6,md:4,lg:3}}>
              <TextField {...register("degrees")} type="text" label="Degrees" name="degrees" fullWidth />
            </Grid>

            {/* Speciality */}
            <Grid size={{xs:12,sm:6,md:4,lg:3}}>
              <FormControl fullWidth>
                <InputLabel>Speciality</InputLabel>
                <Select {...register("speciality")} name="speciality">
                    {
                        specialitys.map(item=>(
                            <MenuItem key={item.id}value={item.name}>{item.name}</MenuItem>
                        ))
                    }
                </Select>
              </FormControl>
            </Grid>

           {/* Years of Expericence */}
           <Grid size={{xs:12,sm:6,md:4,lg:3}}>
              <TextField {...register("yearOfExperience")} type="number" label="Years of Experience" name="yearOfExperience" fullWidth />
            </Grid>
          </Grid>
            </Box>
            <Button type='submit' sx={{marginTop:"20px"}} variant="contained" color="primary" fullWidth>
                Submit
            </Button>
        </form>
        </Box>
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