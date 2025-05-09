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
import { useStoreActions } from "easy-peasy";
import * as React from 'react';
import { useTheme } from '@mui/material/styles';;
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
  const { registerUser } = useStoreActions(action => action.user);
  const [facilities, setFacilities] = React.useState([]);
  const categories = ["Model", "No Model"];
  const paymentServices = ["bKash", "Nagad", "Rocket"];
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('profile', data.profile[0]);
    formData.append('signature', data.pharmacy[0]);
    formData.append("username",data.username)
    formData.append("nid",data.nid)
    formData.append("pharmacyName",data.pharmacyName)
    formData.append("phanmacyReg",data.phanmacyReg)
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
    reset()    
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
                <Typography variant="body2" color="primary">Pharmacy Picture</Typography>
                        <input
                          required
                          type="file"
                          {...register('pharmacy', { required: 'Pharmacy Picture is required' })}
                          accept="image/*"
                        />
                        {errors.image && (
                          <Typography variant="body2" color="error">
                            {errors.image.message}
                          </Typography>
                        )}
              </Grid>

            {/**Pharmacy Name */}
            <Grid item xs={12}>
              <TextField
                required
                label="Pharmacy Name"
                {...register("pharmacyName", {
                  required: "This field is required"
                })}
                type="text" // Change type to text to allow numbers
                fullWidth
                error={!!errors.pharmacyName} // Show red border if error
                helperText={errors.pharmacyName?.message} // Show error message below field
              />
            </Grid>

            {/**PharmacyReg and NID */}
            {[
              { name: "phanmacyReg", label: "Pharmacy Reg. No" },
              { name: "nid", label: "NID" },
            ].map(({ name, label, multiline }) => (
              <Grid item xs={12} sm={6} key={name}>
                <TextField
                  required
                  label={label}
                  fullWidth
                  multiline={multiline}
                  rows={multiline ? 3 : 1}
                  {...register(name, { required: "This field is required" })}
                  error={!!errors[name]}
                  helperText={errors[name]?.message}
                  variant="outlined"
                  sx={{ bgcolor: "#fafafa" }}
                />
              </Grid>
            ))}

            {/** Phone */}
            <Grid item xs={12} sm={6} key={name}>
              <TextField
                required
                label="Phone"
                fullWidth
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
                required
                select
                label="Category"
                fullWidth
                defaultValue=""
                {...register("category", { required: "Select a category" })}
                error={!!errors.category}
                helperText={errors.category?.message}
              >
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
                required
                select
                label="Payment Service"
                fullWidth
                defaultValue=""
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
                required
                label="Payment Number"
                fullWidth
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
              { name: "division", label: "Division" },
              { name: "district", label: "District" },
              { name: "upazila", label: "Upazila" },
            ].map(({ name, label }) => (
              <Grid item xs={12} sm={6} key={name}>
                <TextField
                  required
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
                required
                label="Username"
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

            {/**password */}
            <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Password"
                  {...register("password")}
                  type="password"
                  fullWidth
                />
            </Grid>

            {/**profile picture */}
            <Grid item xs={12}>
                <Box>
                <Typography variant="body2" color="primary">Porfile Picture</Typography>
                        <input
                          required
                          type="file"
                          {...register('profile', { required: 'Profile is required' })}
                          accept="image/*"
                        />
                        {errors.image && (
                          <Typography variant="body2" color="error">
                            {errors.image.message}
                          </Typography>
                        )}
                </Box>
            </Grid>
                        

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
