import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { CardMedia, Box, Typography } from '@mui/material';
import { usePDF } from 'react-to-pdf';
import { format } from 'date-fns';
import MedicinList from '../MedicinList/MedicinList';

const PrescriptionMRecordModal=({open,handleClose,patient,doctor,prescription})=> {
    const {firstName,lastName,age,gender,blood,height,weight}=patient.profile;
    const {specialization,designation}=doctor.profile;
    const formattedDate=format(prescription?.date?prescription.date:null, 'd/M/yyyy');
    const {toPDF,targetRef}=usePDF({filename:'testRecommendation.pdf'});
    const handleConfirm=()=> {
        toPDF();
        handleClose();
    }
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth="md" // Adjust according to your needs
            >
                <DialogContent>
                    {
                        !prescription
                        ?
                        <Typography variant="h5" align="center" color="textSecondary">
                            There is no prescription yet!
                        </Typography>
                        :
                        <Box ref={targetRef}>
                          <Typography variant='h3' sx={{textAlign:'center'}}>Prescription</Typography>
                            <Box display="flex" justifyContent="space-between" padding="10px">
                                <div>
                                    <Typography variant="h6">Date: {formattedDate}</Typography>
                                    <Typography variant="h6">Patient Name: {firstName} {lastName}</Typography>
                                    <Typography variant="h6">Diagnosis: {prescription?.diagnosis}</Typography>
                                </div>
                                <div>
                                    <Typography variant="h6">Dr. {doctor.profile.firstName} {doctor.profile.lastName}</Typography>
                                    <Typography variant="h6">{specialization}</Typography>
                                    <Typography variant="h6">{designation}</Typography>
                                </div>
                            </Box>
                            <Box display="flex" justifyContent="space-between" padding="10px">
                                <Typography variant="h6">Age: {age}</Typography>
                                <Typography variant="h6">Gender: {gender}</Typography>
                                <Typography variant="h6">Blood: {blood}</Typography>
                                <Typography variant="h6">Height: {height}</Typography>
                                <Typography variant="h6">Weight: {weight}</Typography>
                            </Box>
                            <Box>
                                {
                                    prescription?.medicinInstructions.map((item,index)=> (
                                        <MedicinList key={item._id} item={item} number={index + 1} />
                                    ))
                                }
                            </Box>
                            <Box padding="10px">
                                <Typography variant="h5">Additional Instructions:</Typography>
                                <Typography>{prescription?.instruction}</Typography>
                            </Box>
                        </Box>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button disabled={!prescription} onClick={handleConfirm}>Download</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default PrescriptionMRecordModal;
