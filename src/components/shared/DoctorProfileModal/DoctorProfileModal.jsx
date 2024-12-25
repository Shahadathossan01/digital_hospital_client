import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const DoctorProfileModal=({open,handleClose,item})=>{
    const {firstName,lastName,address,phone,designation,offlineChamber,email}=item.profile
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{mt:5}}>
          <Typography gutterBottom>
            First Name: {firstName}
          </Typography>
          <Typography gutterBottom>
            Last Name: {lastName}
          </Typography>
          <Typography gutterBottom>
            Email: {email}
          </Typography>
          <Typography gutterBottom>
            Address: {address}
          </Typography>
          <Typography gutterBottom>
            Phone: {phone}
          </Typography>
          <Typography gutterBottom>
            Specialization: {item?.category}
          </Typography>
          <Typography gutterBottom>
            Designation: {designation}
          </Typography>
          <Typography gutterBottom>
            Offline Chapber: {offlineChamber}
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
export default DoctorProfileModal