import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CardMedia } from '@mui/material';

const ResultModal=({image,open,handleClose})=>{
  
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        <DialogContent>
        <CardMedia
        component="img"
        alt="green iguana"
        height="500"
        image={image}
      />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
          <Button onClick={handleClose} autoFocus>
            download
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default ResultModal;
