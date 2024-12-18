import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import TestRecommendation from '../../components/shared/TestRecommendation/TestRecommendation';
import TestResult from '../../components/shared/TestResult/TestResult';
import Prescription from '../../components/shared/Prescription/Prescription';
import { usePDF } from 'react-to-pdf';
import TestRecommendationModal from '../../components/shared/TestRecommendationmodal/TestRecommendationModal';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AppointmentDetails = ({ item, open, handleClose }) => {
  const [openTest, setOpenTest] = React.useState(false);

  const handleClickOpenTest = () => {
    setOpenTest(true);
  };

  const handleCloseTest = () => {
    setOpenTest(false);
  };

  const { toPDF, targetRef } = usePDF({ filename: 'prescription.pdf' });
  const { firstName, lastName } = item.doctor.profile;
  const { date, time, googleMeetLink, testRecommendation } = item;

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Appointment Details
            </Typography>
            <Button autoFocus color="inherit" onClick={() => toPDF()}>
              Download Prescription
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Grid container spacing={2}>
            <Grid sx={{ border: '1px solid #e0e0e0', padding: 2 }} xs={12} sm={6}>
              <Typography variant="h6">
                Doctor Name: {firstName} {lastName}
              </Typography>
              <Typography variant="subtitle1">Date: {date}</Typography>
              <Typography variant="subtitle1">Time: {time}</Typography>
              <Typography
                component="a"
                href={googleMeetLink}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
              >
                Google Meet Link
              </Typography>
              <hr />

              <Box>
                <Typography variant="h5" gutterBottom>
                  Test Recommendation
                </Typography>
                <div>
                  <ol>
                    {testRecommendation?.map(item => (
                      <TestRecommendation key={item._id} item={item} />
                    ))}
                  </ol>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" onClick={handleClickOpenTest}>
                      Download Recommendations
                    </Button>
                  </div>
                  <TestRecommendationModal
                    testRecommendation={testRecommendation}
                    openTest={openTest}
                    handleCloseTest={handleCloseTest}
                  />
                </div>
              </Box>

              <Box>
                <Typography variant='h5' gutterBottom>
                  Test Result
                </Typography>
                <ol>
                  {testRecommendation?.map(item => (
                    <TestResult key={item._id} item={item} />
                  ))}
                </ol>
              </Box>
            </Grid>
            <Grid sx={{ border: '1px solid #e0e0e0', padding: 2 }} xs={12} sm={6}>
              <Typography variant='h5'  sx={{ textAlign: 'center' }}>
                  Prescription
              </Typography>
              <Prescription targetRef={targetRef} item={item} />
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </React.Fragment>
  );
};

export default AppointmentDetails;
