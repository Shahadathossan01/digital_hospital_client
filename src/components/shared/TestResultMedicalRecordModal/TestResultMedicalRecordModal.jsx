import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { CardMedia } from '@mui/material';
import { usePDF } from 'react-to-pdf';
import TestResult from '../TestResult/TestResult';

const TestResultMedicalRecordModal=({open,handleClose,testRecommendation})=>{
  
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        <DialogContent >
            {
              testRecommendation.length=='0'
              ?
              <h1>There is no Test Result here!</h1>
              :
              <ol>
                  {
                    testRecommendation?.map(item=>(
                        <TestResult key={item._id} item={item}></TestResult>
                    ))
                  }
              </ol>
            }
                        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default TestResultMedicalRecordModal;
