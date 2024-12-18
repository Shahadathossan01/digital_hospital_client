import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TestRecommendationModal from '../TestRecommendationmodal/TestRecommendationModal';
import TestResultMedicalRecordModal from '../TestResultMedicalRecordModal/TestResultMedicalRecordModal';
import PrescriptionMRecordModal from '../PrescriptionMRecordModal/PrescriptionMRecordModal';
import { Box, Divider } from '@mui/material';

export default function MedicalRecordCard({ item }) {
    const { patient, doctor, testRecommendation, prescription } = item?.medicalRecord;
    const [openTestRe, setOpenTestRe] = React.useState(false);

    const handleClickOpenTestRe = () => {
        setOpenTestRe(true);
    };

    const handleCloseTestRe = () => {
        setOpenTestRe(false);
    };

    const [openTestResult, setOpenTestResult] = React.useState(false);

    const handleClickOpenTestResult = () => {
        setOpenTestResult(true);
    };

    const handleCloseTestResult = () => {
        setOpenTestResult(false);
    };

    const [openPres, setOpenPres] = React.useState(false);

    const handleClickOpenPres = () => {
        setOpenPres(true);
    };

    const handleClosePres = () => {
        setOpenPres(false);
    };

    return (
        <Card sx={{ width:500,maxWidth: 400, margin: 2 ,border:'1px solid black'}}>
            <CardContent>
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                    Patient Name: {patient?.profile.firstName} {patient?.profile.lastName}
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                    Doctor Name: {doctor?.profile.firstName} {doctor?.profile.lastName}
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                    Diagnosis: {prescription?.diagnosis}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                    Test Recommendation
                    <Button size="small" onClick={handleClickOpenTestRe}>view</Button>
                    <TestRecommendationModal openTest={openTestRe} handleCloseTest={handleCloseTestRe} testRecommendation={testRecommendation} />
                </Typography>
                <Divider />
                <Typography gutterBottom variant="h5" component="div">
                    Test Result
                    <Button size="small" onClick={handleClickOpenTestResult}>view</Button>
                    <TestResultMedicalRecordModal open={openTestResult} handleClose={handleCloseTestResult} testRecommendation={testRecommendation} />
                </Typography>
                <Divider />
                <Typography gutterBottom variant="h5" component="div">
                    Prescription
                    <Button size="small" onClick={handleClickOpenPres}>view</Button>
                    <PrescriptionMRecordModal open={openPres} handleClose={handleClosePres} doctor={doctor} patient={patient} prescription={prescription} />
                </Typography>
            </CardContent>
        </Card>
    );
}
