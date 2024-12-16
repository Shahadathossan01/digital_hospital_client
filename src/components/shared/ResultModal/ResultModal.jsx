import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { CardMedia } from '@mui/material';
import { usePDF } from 'react-to-pdf';

const ResultModal=({image,open,handleClose})=>{
  const {toPDF,targetRef}=usePDF({filename:'result.pdf'})
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
        ref={targetRef}
        component="img"
        alt="green iguana"
        height="500"
        image={image}
      />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
          <Button onClick={()=>toPDF()} autoFocus>
            download
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default ResultModal;
