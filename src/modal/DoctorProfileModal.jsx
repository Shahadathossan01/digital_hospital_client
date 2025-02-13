import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Divider, Rating, Typography } from '@mui/material';
const Profile=({item})=>{
  console.log(item)
  return(
    <Box sx={{display:"flex",
      justifyContent:"center",
      alignItems:"center",gap:3,flexWrap:"wrap"}}>
       {/* Doctor Profile Image */}
       <Box
          component="img"
          src={item?.profile}
          alt="Doctor Profile"
          sx={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            objectFit: "cover",
          }}
                        />

                        {/* Doctor Information */}
                        <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                            <Typography variant="h6" fontWeight="bold">
                            {item?.title} {item?.firstName} {item?.lastName}
                            </Typography>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: { xs: "center", md: "flex-start" } }}>
                                <Rating value={0} readOnly />
                                <Typography variant="body2">(0)</Typography>
                            </Box>

                            <Typography variant="body2" color="text.secondary">
                            {item?.speciality}
                            </Typography>
                        </Box>
                        <Box sx={{display:"flex",flexDirection:"column",gap:"2px"}}>
                          <Typography variant="body3">BMDC Number:{item.bmdcNumber}</Typography><Divider></Divider>

                          <Typography variant="body3">BMDC Expiry Date:{item.bmdcExpiryDate}</Typography><Divider></Divider>

                          <Typography variant="body3">Date of Birth:{item?.dateOfBirth}</Typography><Divider></Divider>

                          <Typography variant="body3">Degree: {item?.degrees}</Typography><Divider></Divider>

                          <Typography variant="body3">Designation:{item?.designation}</Typography><Divider></Divider>

                          <Typography variant="body3">Fee:{item?.fee}</Typography><Divider></Divider>

                          <Typography variant="body3">Gender:{item?.gender}</Typography><Divider></Divider>

                          <Typography variant="body3">Mobile:{item?.mobile}</Typography><Divider></Divider>

                          <Typography variant="body3">Nationality:{item?.nationality}</Typography><Divider></Divider>

                          <Typography variant="body3">NID/Passport:{item?.nidOrPassport}</Typography><Divider></Divider>

                          <Typography variant="body3">Organization:{item?.organization}</Typography><Divider></Divider>
                        </Box>
    </Box>
  )
}
export default function DoctorProfileModal({open,handleClose,item}){
   
  if(!item) return null

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Profile item={item}></Profile>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
