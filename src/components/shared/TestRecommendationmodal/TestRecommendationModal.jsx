import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { CardMedia } from '@mui/material';
import { usePDF } from 'react-to-pdf';

const TestRecommendationModal=({openTest,handleCloseTest,testRecommendation})=>{
  const {toPDF,targetRef}=usePDF({filename:'testRecommendation.pdf'})
  const handleConfirm=()=>{
    toPDF()
    handleCloseTest()
  }
  return (
    <React.Fragment>
      <Dialog
        open={openTest}
        onClose={handleCloseTest}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        <DialogContent >
            <div ref={targetRef}>
            <ol>
            {
              testRecommendation?.map(item=>(
                <li key={item._id}>{item.testName}</li>
              ))
            }
            </ol>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm}>confirm</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default TestRecommendationModal;
