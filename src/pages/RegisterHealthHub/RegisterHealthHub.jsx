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

const categories = ["Model", "No Model"];
const paymentServices = ["bKash", "Nagad", "Rocket"];
const RegisterHealthHub = () => {
    const navigate = useNavigate();
    const { registerUser } = useStoreActions(action => action.user);


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
    formData.append("facilities",data.facilities)
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
    // reset()    
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
                      {/* Pharmacy Info */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Pharmacy Information
              </Typography>
            </Grid>
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

            {[
              { name: "username", label: "USERNAME" },
              { name: "nid", label: "NID" },
              { name: "pharmacyName", label: "Pharmacy Name" },
              { name: "phanmacyReg", label: "Pharmacy Reg. No" },
              { name: "facilities", label: "Facilities (comma separated)" },
              { name: "description", label: "Description", multiline: true },
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

            {/* Address Info */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Address Details
              </Typography>
            </Grid>

            {[
              { name: "country", label: "Country" },
              { name: "division", label: "Division" },
              { name: "district", label: "District" },
              { name: "upazila", label: "Upazila" },
              { name: "phone", label: "Phone" },
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

            

            {/* Payment Info */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Payment Information
              </Typography>
            </Grid>

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
            <Grid item xs={12} sm={6}>
            <TextField
                                        required
                                        label="Password"
                                        {...register("password")}
                                        type="password"
                                        fullWidth
                                    />
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
