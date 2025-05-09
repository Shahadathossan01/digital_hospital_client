import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import {
    Box,
    Button,
    Typography,
  } from "@mui/material";
import { useForm } from 'react-hook-form';
import Grid from "@mui/material/Grid2"
import { useState } from 'react';
import { useStoreActions } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';
import CreateSlotForm from '../../components/shared/CreateSlotForm/CreateSlotForm';
import { createSchedule, getTotalDaysInMonth, isValidEmailOrPhone } from '../../utils';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const SlotChip=({item,index,handleDeleteSlot})=>{
  return (
    <Stack direction="row" spacing={1}>
      <Chip
      color="success"
        label={`${index+1}. ${item}`}
        // variant="outlined"
        onDelete={()=>handleDeleteSlot(item)}
      />
    </Stack>
  );
}

const specialitys = [
  { id: "1", name: "Anesthesiology" },
  { id: "2", name: "Cardiology" },
  { id: "3", name: "Cardiothoracic Surgery" },
  { id: "4", name: "Colorectal Surgery" },
  { id: "5", name: "Dentistry" },
  { id: "6", name: "Dermatology and Venereology" },
  { id: "32", name: "Family Medicine" },
  { id: "7", name: "Gastroenterology" },
  { id: "8", name: "General Physician" },
  { id: "9", name: "General Surgery" },
  { id: "10", name: "Gynaecology and Obstetrics" },
  { id: "11", name: "Haematology" },
  { id: "12", name: "Hepatology" },
  { id: "13", name: "Internal Medicine" },
  { id: "14", name: "Nephrology" },
  { id: "15", name: "Neuromedicine" },
  { id: "16", name: "Neurosurgery" },
  { id: "17", name: "Oncology" },
  { id: "31", name: "Ophthalmology" },
  { id: "18", name: "Oral and Maxillofacial Surgery" },
  { id: "19", name: "Orthopedics" },
  { id: "20", name: "Otolaryngology (ENT)" },
  { id: "21", name: "Pediatric Surgery" },
  { id: "22", name: "Pediatrics" },
  { id: "33", name: "Physical Medicine & Rehabilitation" },
  { id: "23", name: "Plastic Surgery" },
  { id: "24", name: "Psychiatry" },
  { id: "25", name: "Radiology" },
  { id: "26", name: "Reproductive Endocrinology and Infertility" },
  { id: "27", name: "Respiratory Medicine" },
  { id: "28", name: "Rheumatology" },
  { id: "29", name: "Urology" },
  { id: "30", name: "Vascular Surgery" },
  { id: "34", name: "Veterinary" }
];
const BecomeADoctorForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [profileImage,setProfileImage]=useState(null)
  const [signature,setSignature]=useState(null)
  const { registerUser } = useStoreActions(action => action.user);
  const navigate = useNavigate();

  const [times, setTimes] = useState([]);
  const date = new Date();
  const totalMonthDays = getTotalDaysInMonth(date);
  const schedule = createSchedule(totalMonthDays, times);

  const onSubmit=(data)=>{
      const formData=new FormData()
      formData.append("profile",profileImage)
      formData.append("firstName",data.firstName)
      formData.append("lastName",data.lastName)
      formData.append("dateOfBirth",data.dateOfBirth)
      formData.append("mobile",data.mobile)
      formData.append("nidOrPassport",data.nidOrPassport)
      formData.append("nationality",data.nationality)
      formData.append("gender",data.gender)
      formData.append("fee",data.fee)
      formData.append("organization",data.organization)
      formData.append("biography",data.biography)
      formData.append("title",data.title)
      formData.append("bmdcNumber",data.bmdcNumber)
      formData.append("bmdcExpiryDate",data.bmdcExpiryDate)
      formData.append("degrees",data.degrees)
      formData.append("speciality",data.speciality)
      formData.append("yearOfExperience",data.yearOfExperience)
      formData.append("username",data.username)
      formData.append("credential",data.credential)
      formData.append("password",data.password)
      formData.append("signature",signature)
      formData.append("role","doctor")
      formData.append("designation",data.designation)
      formData.append("schedule",JSON.stringify(schedule))
      registerUser({formData,navigate,credential:data.credential})
      reset()
    }

    return (
      <>
        <Box sx={{ flexGrow:1,padding:"80px 50px 0px 50px"}}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{marginTop:"50px"}}>
            <Typography variant="h4" sx={{ fontWeight: "bold",textAlign:"center" }}>
            Personal Information
          </Typography>

          <Grid container spacing={2}>
            {/* Profile Image */}
            <Grid sx={{marginTop:"30px"}} size={{xs:12}}>
              <Typography variant='h6'>Profile</Typography>
              <input required type="file" name="file" onChange={(e)=>setProfileImage(e.target.files[0])} id="profileImage" />
            </Grid>

            {/* First Name */}
            <Grid size={{xs:12 ,sm:6,md:4,lg:3}}>
              <TextField required {...register("firstName")} label="First Name" name="firstName" fullWidth />
            </Grid>

            {/* Last Name */}
            <Grid size={{xs:12,sm:6,md:4,lg:3}}>
              <TextField required {...register("lastName")} label="Last Name" name="lastName" fullWidth />
            </Grid>

            {/* Date of Birth */}
            <Grid size={{xs:12,sm:6,md:4,lg:3}}>
            <TextField 
                required
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
              <TextField required {...register("mobile")} type="number" label="Mobile" name="mobile" fullWidth />
            </Grid>

            {/* NID/Passport */}
            <Grid size={{xs:12,sm:6,md:4,lg:3}}>
              <TextField required {...register("nidOrPassport")} label="NID/Passport Number" name="nidOrPassport" fullWidth />
            </Grid>

            {/* Nationality */}
            <Grid size={{xs:12,sm:6,md:4,lg:3}}>
              <FormControl fullWidth>
                <InputLabel>Nationality</InputLabel>
                <Select required {...register("nationality")} name="nationality" label="Nationality" defaultValue="Bangladesh">
                  <MenuItem value="Bangladesh">Bangladesh</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Gender */}
            <Grid size={{xs:12,sm:6,md:4,lg:3}}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select required {...register("gender")} label="Gender" name="gender">
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Fee */}
            <Grid size={{xs:12,sm:6,md:4,lg:3}}>
              <TextField required {...register("fee")} label="Fee" name="fee" fullWidth />
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
            <Box sx={{marginTop:"70px"}}>
            <Typography variant="h4" sx={{ fontWeight: "bold",textAlign:"center" }}>
            Professional Information
          </Typography>

          <Grid sx={{marginTop:"50px"}} container spacing={2}>
          <Grid size={{xs:12}}>
              <FormControl fullWidth>
                <InputLabel>Title</InputLabel>
                <Select required {...register("title")} label="Title" name="title" defaultValue="Dr.">
                  <MenuItem value="Dr.">Dr.</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {/**Designation */}
          <Grid size={{xs:12}}>
          <TextField required {...register("designation")} label="Designation" name="designation" fullWidth />
            </Grid>

            {/* BMDC Number */}
            <Grid size={{xs:12,sm:6,md:4,lg:3}}>
              <TextField required {...register("bmdcNumber")} label="BMDC/BVC Number" name="bmdcNumber" fullWidth />
            </Grid>

            {/* BMDC Expiry Date */}
            <Grid size={{xs:12,sm:6,md:4,lg:3}}>
            <TextField
                {...register("bmdcExpiryDate")} 
                type="date" 
                name="bmdcExpiryDate" 
                label="BMDC/BVC Expiry Date" 
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
                <Select required {...register("speciality")} label="Speciality" name="speciality">
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
              <TextField required {...register("yearOfExperience")} type="number" label="Years of Experience" name="yearOfExperience" fullWidth />
            </Grid>
            {/* Signature Image */}
            <Grid sx={{marginTop:"30px"}} size={{xs:12}}>
              <Typography variant='h6' sx={{color:"#9c27b0"}}>Signature</Typography>
              <input required type="file" name="file" onChange={(e)=>setSignature(e.target.files[0])} id="profileImage" />
            </Grid>
            
            <Grid size={{xs:12,sm:6,md:4,lg:3}}>
            <TextField
                            required
                            label="Username"
                            {...register("username",{
                                required:"This field is required",
                            })}
                            fullWidth
                            error={!!errors.username} 
                            helperText={errors.username?.message} 
                        />
            </Grid>
            <Grid size={{xs:12,sm:6,md:4,lg:3}}>
            <TextField
  required
  label="Email"
  {...register("credential", {
    required: "This field is required",
    validate: (value) =>
      isValidEmailOrPhone(value) || "Enter a valid email or 11-digit phone number",
  })}
  type="text" // Change type to text to allow numbers
  fullWidth
  error={!!errors.credential} // Show red border if error
  helperText={errors.credential?.message} // Show error message below field
/>
            </Grid>
            <Grid size={{xs:12,sm:6,md:4,lg:3}}>
            <TextField
                            required
                            label="Password"
                            {...register("password")}
                            type="password"
                            fullWidth
                        />
            </Grid>

          </Grid>
            </Box>
            <Button type='submit' sx={{margin:"20px 0px"}} variant="contained" color="primary" fullWidth>
                Submit
            </Button>
        </form>
        </Box>
    </>
    );
};

export default BecomeADoctorForm;