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
import { Box, Divider, IconButton, Stack } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function MedicalRecordCard({ item }) {
    const { patient, doctor, testRecommendation, prescription } = item?.medicalRecord;
    const [openTestRe, setOpenTestRe] = React.useState(false);
    const [openTestResult, setOpenTestResult] = React.useState(false);
    const [openPres, setOpenPres] = React.useState(false);

    const handleClickOpenTestRe = () => setOpenTestRe(true);
    const handleCloseTestRe = () => setOpenTestRe(false);

    const handleClickOpenTestResult = () => setOpenTestResult(true);
    const handleCloseTestResult = () => setOpenTestResult(false);

    const handleClickOpenPres = () => setOpenPres(true);
    const handleClosePres = () => setOpenPres(false);

    return (
        <Card 
            sx={{ 
                width: 400, 
                margin: 2, 
                border: '1px solid #ddd', 
                borderRadius: 2, 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden'
            }}
        >
            <CardContent>
                {/* Patient and Doctor Information */}
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    Patient Name: {patient?.profile.firstName} {patient?.profile.lastName}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    Doctor Name: {doctor?.profile.firstName} {doctor?.profile.lastName}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    Diagnosis: {prescription?.diagnosis || "Not Available"}
                </Typography>

                {/* Test Recommendation Section */}
                <Box mt={2}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6">Test Recommendation</Typography>
                        <IconButton onClick={handleClickOpenTestRe} color="primary">
                            <VisibilityIcon />
                        </IconButton>
                    </Stack>
                    <TestRecommendationModal 
                        openTest={openTestRe} 
                        handleCloseTest={handleCloseTestRe} 
                        testRecommendation={testRecommendation} 
                    />
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Test Result Section */}
                <Box mt={2}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6">Test Result</Typography>
                        <IconButton onClick={handleClickOpenTestResult} color="primary">
                            <VisibilityIcon />
                        </IconButton>
                    </Stack>
                    <TestResultMedicalRecordModal 
                        open={openTestResult} 
                        handleClose={handleCloseTestResult} 
                        testRecommendation={testRecommendation} 
                    />
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Prescription Section */}
                <Box mt={2}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6">Prescription</Typography>
                        <IconButton onClick={handleClickOpenPres} color="primary">
                            <VisibilityIcon />
                        </IconButton>
                    </Stack>
                    <PrescriptionMRecordModal 
                        open={openPres} 
                        handleClose={handleClosePres} 
                        doctor={doctor} 
                        patient={patient} 
                        prescription={prescription} 
                    />
                </Box>
            </CardContent>
        </Card>
    );
}
