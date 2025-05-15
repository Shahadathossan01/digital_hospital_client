import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Button,
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
} from "@mui/material";
import OpenModal from "../../modal/OpenModal";
import { useForm } from "react-hook-form";
import { isValidEmailOrPhone } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
const EditReferedCode = ({singlePromoCode,handleClose}) => {
  const {updatePromoCode}=useStoreActions(actions=>actions.promoCode)
  const id=singlePromoCode?._id
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    updatePromoCode({id,data})
    reset()
    handleClose()
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
        p: 3,
      }}
    >
      <TextField
        label="Referral Code"
        variant="outlined"
        fullWidth
        {...register('code', { required: 'Referral code is required' })}
        error={!!errors.code}
        helperText={errors.code?.message}
      />
      <Button type="submit" variant="contained" color="primary">
        Edit
      </Button>
    </Box>
  );
};
const ReferedCode=({singlePromoCode})=>{
  const [open,setOpen]=useState(false)
  const handleOpen=()=>{
    setOpen(true)
  }
  const handleClose=()=>{
    setOpen(false)
  }
    return(
        <Box>
              <Typography>Refered Code: {singlePromoCode?.code}</Typography>
              <Button onClick={handleOpen} size="small" variant="contained" color="primary">
                change refered code
              </Button>
              <OpenModal open={open} handleClose={handleClose}>
                <EditReferedCode handleClose={handleClose}  singlePromoCode={singlePromoCode}></EditReferedCode>
              </OpenModal>
          </Box>
    )
}
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
const EditProfile=({userId})=>{

  const categories = ["Model", "No Model"];
  const paymentServices = ["bKash", "Nagad", "Rocket"];
  const { updateHealthHub } = useStoreActions(action => action.healthHub);
 const [facilities, setFacilities] = useState([]);

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
  updateHealthHub({id:userId,formData})
  reset()
  setFacilities([])    
};

return (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="flex-start"
    padding={4}
    minHeight="100vh"
  >
    <Box
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
        Edit Profile
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          
          <Grid item xs={12}>
              <Box>
              <Typography variant="body2" color="primary">Porfile Picture</Typography>
                  <input
                    type="file"
                    {...register('profile')}
                    accept="image/*"
                  />
              </Box>
          </Grid>

          <Grid item xs={12}>
              <Typography variant="body2" color="primary">Pharmacy Picture</Typography>
                      <input
                        type="file"
                        {...register('pharmacy')}
                        accept="image/*"
                      />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='Pharmacy Name'
                fullWidth
                {...register('pharmacyName')}
                variant="outlined"
                sx={{ bgcolor: "#fafafa" }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label='phanmacyReg'
                fullWidth
                {...register('phanmacyReg')}
                variant="outlined"
                sx={{ bgcolor: "#fafafa" }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label='nid'
                fullWidth
                {...register('nid')}
                variant="outlined"
                sx={{ bgcolor: "#fafafa" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='phone'
                fullWidth
                {...register('phone')}
                variant="outlined"
                sx={{ bgcolor: "#fafafa" }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Category"
              fullWidth
              defaultValue=""
              {...register("category",)}
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

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Payment Service"
              fullWidth
              defaultValue=""
              {...register("service")}
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
              label="Payment Number"
              fullWidth
              {...register("number",)}
              error={!!errors.number}
              helperText={errors.number?.message}
            />
          </Grid>
       
              <Grid item xs={12} sm={6}>
                  <MultipleSelectChip facilities={facilities} setFacilities={setFacilities}></MultipleSelectChip>
              </Grid>

              <Grid item xs={12}>
              <TextField
                label="description"
                fullWidth
                multiline
                rows={3}
                {...register('description')}

                variant="outlined"
                sx={{ bgcolor: "#fafafa" }}
              />
            </Grid>


              {/* Address Info */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Address Details
            </Typography>
          </Grid>

          {[
            { name: "division", label: "Division" },
            { name: "district", label: "District" },
            { name: "upazila", label: "Upazila" },
          ].map(({ name, label }) => (
            <Grid item xs={12} sm={6} key={name}>
              <TextField
                label={label}
                fullWidth
                {...register(name)}
                variant="outlined"
                sx={{ bgcolor: "#fafafa" }}
              />
            </Grid>
          ))}



          
       
  
          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ py: 1.5, mt: 2 }}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  </Box>
);
}
const ProfileView = ({ profileData, onEdit,userId}) => {
  const [open,setOpen]=useState(false)
  const handleOpen=()=>{
    setOpen(true)
  }
  const handleClose=()=>{
    setOpen(false)
  }
  const {getSinglePromoCode}=useStoreActions(actions=>actions.promoCode)
  const {singlePromoCode,updatedData}=useStoreState(state=>state.promoCode)

  useEffect(()=>{
    getSinglePromoCode({id:userId})
  },[getSinglePromoCode,userId,updatedData])

  const {
    profile,
    pharmacyImage,
    username,
    nid,
    pharmacyName,
    phanmacyReg,
    facilities,
    description,
    division,
    district,
    upazila,
    phone,
    category,
    payment
  } = profileData;
  const facilityList =
    typeof facilities === "string" ? facilities.split(",") : facilities;


  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 4, bgcolor: "#f9f9f9" }}>
      <Grid container spacing={4}>
        {/* Pharmacy Image and Actions */}
        <Grid item xs={12}>
          <Box
  sx={{
    position: "relative",
    width: "100%",
    height: 300,
    overflow: "hidden",
    borderRadius: 2,
    mb: 2,
  }}
>
  <img
    src={pharmacyImage}
    alt="Pharmacy"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "contain", // changed from 'cover' to 'contain'
      borderRadius: "8px",
    }}
  />
</Box>

        </Grid>

        {/* Profile Header */}
        <Grid item xs={12} textAlign="center">
          <Avatar
            src={profile}
            sx={{ width: 80, height: 80, margin: "0 auto" }}
          />
          <Typography variant="h5" fontWeight="bold" mt={2}>
            {username}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Pharmacy Name: {pharmacyName}
          </Typography>
       
              <Button variant="contained" color="primary" onClick={handleOpen}>
                Edit Profile
              </Button>
              <OpenModal open={open} handleClose={handleClose}>
                <EditProfile userId={userId}></EditProfile>
              </OpenModal>
        </Grid>

        <Grid item xs={12}>
              <ReferedCode singlePromoCode={singlePromoCode}></ReferedCode>
        </Grid>
        <Grid item xs={12}>
          <Divider>
            <Chip label="Pharmacy Details" />
          </Divider>
        </Grid>

        {/* Pharmacy Info */}
        <Grid item xs={12} sm={6}>
          <List>
            <ListItem>
              <ListItemText primary="NID" secondary={nid} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Pharmacy Reg. No" secondary={phanmacyReg} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Category" secondary={category} />
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" fontWeight="bold">
            Facilities:
          </Typography>
          <Grid container spacing={1}>
            {facilityList?.map((item, index) => (
              <Grid item key={index}>
                <Chip label={item.trim()} />
              </Grid>
            ))}
          </Grid>

          <Typography variant="subtitle1" fontWeight="bold" mt={2}>
            Description:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Divider>
            <Chip label="Address Info" />
          </Divider>
        </Grid>

        {/* Address Info */}
        <Grid item xs={12} sm={6}>
          <List>
            <ListItem>
              <ListItemText primary="Division" secondary={division} />
            </ListItem>
            <ListItem>
              <ListItemText primary="District" secondary={district} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Upazila" secondary={upazila} />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} sm={6}>
          <List>
            <ListItem>
              <ListItemText primary="Phone" secondary={`0${phone}`} />
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12}>
          <Divider>
            <Chip label="Payment Info" />
          </Divider>
        </Grid>

        {/* Payment Info */}
        <Grid item xs={12} sm={6}>
          <List>
            <ListItem>
              <ListItemText primary="Payment Service" secondary={payment.service} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Payment Number" secondary={payment.number} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};

const HealthHubProfile = () => {
    const {user}=useStoreState(state=>state.user)
    const {getHealthHub}=useStoreActions(actions=>actions.healthHub)
    const {healthHub,updatedData}=useStoreState(state=>state.healthHub)

    useEffect(()=>{
        getHealthHub({id:user?._id})
    },[getHealthHub,user,updatedData])
    if(!healthHub) return null
    const profileData={
        ...healthHub,
        username:user.username
    }
  
    return (
        <Box>
            <ProfileView profileData={profileData} userId={user?._id}></ProfileView>
        </Box>
    );
};

export default HealthHubProfile;