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
import { format } from 'date-fns';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AppointmentDetails = ({ item, open, handleClose,isDoctor}) => {
  const [openTest, setOpenTest] = React.useState(false);
  console.log(item)
  const handleClickOpenTest = () => {
    setOpenTest(true);
  };

  const handleCloseTest = () => {
    setOpenTest(false);
  };

  const { toPDF, targetRef } = usePDF({ filename: 'prescription.pdf' });
  const {time, googleMeetLink, testRecommendation } = item;

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
        <Box sx={{padding:'20px'}}>
              {
                !isDoctor &&
              <Typography variant="h6">
                Doctor: {item?.doctor?.profile.firstName} {item?.doctor?.profile.lastName}
              </Typography>
              }
              {
                isDoctor &&
              <Typography variant="h6">
                Patient: {item?.patient?.profile.firstName} {item?.patient?.profile.lastName}
              </Typography>
              }

              <Typography variant="subtitle1">Date: {format(item?.date,'yyyy-MM-dd')}</Typography>
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
          </Box>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Grid container spacing={2}>
            <Grid sx={{ border: '1px solid #e0e0e0', padding: 2 }} xs={12} sm={6} md={6}>
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
            </Grid>
            <Grid sx={{ border: '1px solid #e0e0e0', padding: 2 }} xs={12} sm={6} md={6}>
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
          </Grid>
        </Box>
        <Box sx={{display:'flex',justifyContent:'center'}}>
        <Box>
        <Typography variant='h5'  sx={{ textAlign: 'center' }}>
                  Prescription
              </Typography>
              {
                item.prescription && 
                <Prescription targetRef={targetRef} item={item} />

              }
        </Box>
        </Box>
      </Dialog>
    </React.Fragment>
  );
};

export default AppointmentDetails;
