import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CardMedia from '@mui/material/CardMedia';
import { usePDF } from 'react-to-pdf';

const ResultModal = ({ image, open, handleClose }) => {
    const { toPDF, targetRef } = usePDF({ filename: 'result.pdf' });
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
                        alt="Test result"
                        height="500"
                        image={image}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">
                        Close
                    </Button>
                    <Button onClick={() => toPDF()} variant="contained" color="primary" autoFocus>
                        Download
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default ResultModal;
