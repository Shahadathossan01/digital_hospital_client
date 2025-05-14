import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Divider,
  Paper,
} from "@mui/material";
import { isValidEmailOrPhone } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Available Medicine',
  'Doctor Appointments',
  'BP Test',
  'Blood Sugar Test',
  'Health Checkup',
  '24/7 Service',
  'Wheelchair Access',
  'First Aid Supplies',
  'Baby & Mother Care Products',
  'Skin & Beauty Products',
  'Return/Exchange Policy',
  'Video Consultation',
  'Oxygen Cylinder Supply',
  'Free Health Advice',
  'Promo Codes',
  'Eye Care Products',
  'Pet Medicine',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const MultipleSelectChip=({ facilities, setFacilities })=>{
  const theme = useTheme();
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFacilities(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Facilities</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={facilities}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, facilities, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

const RegisterHealthHub = () => {
  const navigate = useNavigate();
  const { registerUser ,addRegisterError} = useStoreActions(action => action.user);
  const { registerError } = useStoreState(state => state.user);
  
  const [facilities, setFacilities] = React.useState([]);
  const categories = ["Model", "No Model"];
  const paymentServices = ["bKash", "Nagad", "Rocket","Bank"];
  const {register,reset,handleSubmit,formState: { errors }} = useForm({mode:'all'});

    const errorMessage = registerError?.message;
    const errorField = registerError?.field;


  const onSubmit = (data) => {
    console.log(facilities,'register hub')
    addRegisterError(null)

    const formData = new FormData();
    formData.append('profile', data?.profile[0]);
    formData.append('signature', data?.pharmacy[0]);
    formData.append("username",data.username)
    formData.append("nid",data.nid)
    formData.append("pharmacyName",data.pharmacyName)
    formData.append("phanmacyReg",data.pharmacyReg)
    formData.append("facilities",facilities)
    formData.append("description",data.description)
    formData.append("country",data.country)
    formData.append("division",data.division)
    formData.append("district",data.district)
    formData.append("upazila",data.upazila)
    formData.append("phone",data.phone)
    formData.append("category",data.category)
    formData.append("service",data.service)
    formData.append("number",data.number)
    formData.append("credential",data.credential)
    formData.append("password",data.password)
    formData.append("role","healthHub")
    
    registerUser({formData,navigate,credential:data.credential})
    
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-start"
      padding={4}
      bgcolor="#f5f5f5"
      minHeight="100vh"
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 3,
          maxWidth: 700,
          width: "100%",
          bgcolor: "#fff",
        }}
      >
        <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
          HealthHub Registration
        </Typography>

        <Divider sx={{ mb: 3 }} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            
            {/* Pharmacy Info */}
            <Grid item xs={12}>
              <Typography sx={{textAlign:'center'}} variant="h6" gutterBottom>
                Pharmacy Information
              </Typography>
            </Grid>
            
            {/**pharmacy picture */}
            <Grid item xs={12}>
            <Typography variant="body2" color="primary">
              Pharmacy Picture
            </Typography>
            <input
              
              type="file"
              accept="image/*"
              {...register('pharmacy',{required:'Pharmacy picture must be required'})}
            /><br></br>
            {errors.pharmacy && (
                        <Typography variant="caption" color="error">
                          {errors?.profile?.message}
                        </Typography>
                      )}
          </Grid>


            {/**Phamacy name */}
            <Grid item xs={12}>
              <TextField
                
                label="Pharmacy Name *"
                {...register("pharmacyName", {
                  required: "This field is required"
                })}
                fullWidth
                error={!!errors.pharmacyName} // Show red border if error
                helperText={errors.pharmacyName?.message} // Show error message below field
              />
            </Grid>

            

            {/**pharmacy reg */}
            <Grid item xs={12} sm={6}>
                <TextField
                
                  type='number'
                  label="Pharmacy Reg. *"
                  {...register('pharmacyReg', { required: "This field is required",
                    onChange: () => {
                                if (registerError) addRegisterError(null);
                                }
                  })}
                  error={!!errors.pharmacyReg || errorField==='pharmacyReg'}
                  helperText={errors.pharmacyReg?.message ||
                    (errorField ==='pharmacyReg' ?errorMessage:'')
                  }
                  variant="outlined"
                  sx={{ bgcolor: "#fafafa" }}
                />
              </Grid>

              
              <Grid item xs={12} sm={6}>
                <TextField
                
                  type='number'
                  label="NID *"
                  {...register("nid", { required: "This field is required",
                    onChange: () => {
                                if (registerError) addRegisterError(null);
                                }
                  })}
                  error={!!errors.nid || errorField==="nid"}
                  helperText={errors.nid?.message ||
                    (errorField ==="nid" ?errorMessage:'')
                  }
                  variant="outlined"
                  sx={{ bgcolor: "#fafafa" }}
                />
              </Grid>

            {/** Phone */}
            <Grid item xs={12} sm={6} key={name}>
              <TextField
                label="Phone *"
                fullWidth
                type="number"
                {...register('phone',{ required: "Enter valid phone number" })}
                error={!!errors['phone']}
                helperText={errors['phone']?.message}
                variant="outlined"
                sx={{ bgcolor: "#fafafa" }}
              />
            </Grid>

            {/* Category & Status */}
            <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Category *"
            fullWidth
            defaultValue="Model" // Start with empty value
            {...register("category", {
              required: "Select a category",
              validate: (value) => value !== "" || "Select a valid category",
            })}
            error={!!errors.category}
            helperText={errors.category?.message}
          >
            <MenuItem value="">Select a category</MenuItem> {/* Placeholder */}
            {categories.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>

        </Grid>


            {/**payment service */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Payment Service *"
                fullWidth
                defaultValue="bKash"
                {...register("service", {
                  required: "Select a payment method",
                })}
                error={!!errors.service}
                helperText={errors.service?.message}
              >
                {paymentServices.map((opt) => (
                  <MenuItem key={opt} value={opt}>
                    {opt}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            
            {/**Payment Number */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Payment Number *"
                fullWidth
                type="number"
                {...register("number", {
                  required: "Enter payment number",
                })}
                error={!!errors.number}
                helperText={errors.number?.message}
              />
            </Grid>

            {/** Facilities */}
            <Grid item xs={12} sm={6}>
              <MultipleSelectChip facilities={facilities} setFacilities={setFacilities}></MultipleSelectChip>
            </Grid>

            {/** Description */}
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}  // Corrected: rows should be a number, not a string or conditional
                {...register('description')}
                error={!!errors['description']}
                helperText={errors['description']?.message}
                variant="outlined"
                sx={{ bgcolor: "#fafafa" }}
              />
            </Grid>
            
            {/* Address Info */}
            <Grid item xs={12}>
              <Typography sx={{textAlign:'center',mt:5}} variant="h6" gutterBottom>
                Address Details
              </Typography>
            </Grid>
            
            {/**Division,District,Upazila */}
            {[
              { name: "division", label: "Division *" },
              { name: "district", label: "District *" },
              { name: "upazila", label: "Upazila *" },
            ].map(({ name, label }) => (
              <Grid item xs={12} sm={6} key={name}>
                <TextField
                  label={label}
                  fullWidth
                  {...register(name, { required: "This field is required" })}
                  error={!!errors[name]}
                  helperText={errors[name]?.message}
                  variant="outlined"
                  sx={{ bgcolor: "#fafafa" }}
                />
              </Grid>
            ))}

            {/**Username */}
            <Grid item xs={12} sx={{mt:10}}>
              <TextField
                
                label="Username *"
                {...register("username", {
                  required: "This field is required"
                })}
                type="text" // Change type to text to allow numbers
                fullWidth
                error={!!errors.username} // Show red border if error
                helperText={errors.username?.message} // Show error message below field
              />
            </Grid>

            {/**email */}
            <Grid item xs={12} sm={6}>
              <TextField
                            
                            label="Email *"
                            {...register("credential", {
                                required: "This field is required",
                                validate: (value) =>
                                isValidEmailOrPhone(value) || "Enter a valid email",
                                onChange: () => {
                                if (registerError) addRegisterError(null);
                                }
                                
                            })}
                            type="text" // Change type to text to allow numbers
                            fullWidth
                            error={!!errors.credential || errorField === "credential"} // show error if from backend
                            helperText={
                                errors.credential?.message ||
                                (errorField === "credential" ? errorMessage : "")
                            }
                            />
            </Grid>

            {/**password */}
            <Grid item xs={12} sm={6}>
                <TextField
                  
                  label="Password *"
                  {...register("password",{required:"Password is required"})}
                  type="password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
            </Grid>

            {/**profile picture */}
            <Grid item xs={12}>
                <Box>
                <Typography variant="body2" color="primary">Porfile Picture</Typography>
                        <input
                          type="file"
                          {...register('profile',{required:'Profile picture must be required'})}
                          accept="image/*"
                        /><br></br>
                        {errors.profile && (
                        <Typography variant="caption" color="error">
                          {errors.profile.message}
                        </Typography>
                      )}
                </Box>
            </Grid>
                        
                {!errorField && errorMessage && (
                        <Typography color="error" align="center" sx={{ mb: 2 }}>
                            {errorMessage}
                        </Typography>
                    )}
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ py: 1.5, mt: 2 }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default RegisterHealthHub;
