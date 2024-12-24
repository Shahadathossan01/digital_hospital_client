import * as React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Dialog,
  Button,
  Box,
  Grid,
  Slide,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { format } from 'date-fns';
import TestRecommendation from '../../components/shared/TestRecommendation/TestRecommendation';
import TestResult from '../../components/shared/TestResult/TestResult';
import Prescription from '../../components/shared/Prescription/Prescription';
import { usePDF } from 'react-to-pdf';
import TestRecommendationModal from '../../components/shared/TestRecommendationmodal/TestRecommendationModal';
import { useForm } from 'react-hook-form';
import { action, useStoreActions, useStoreState } from 'easy-peasy';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AppointmentDetails = ({ item, open, handleClose, isDoctor }) => {
  if(!item) return
  const {user}=useStoreState(state=>state.user)
  const {register,handleSubmit,reset}=useForm()
  const [openTest, setOpenTest] = React.useState(false);
  const { toPDF, targetRef } = usePDF({ filename: 'prescription.pdf' });
  const { time, googleMeetLink, testRecommendation } = item;
  const {createTest}=useStoreActions(action=>action.testRecommendation)
  const apppintmentID=item?._id
  
  const onSubmit=(data)=>{
    createTest({data,apppintmentID})
    reset()
  }

  const handleClickOpenTest = () => {
    setOpenTest(true);
  };

  const handleCloseTest = () => {
    setOpenTest(false);
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'fixed'}}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Appointment Details
          </Typography>
          {
            !isDoctor &&
          <Button autoFocus color="inherit" onClick={toPDF}>
            Download Prescription
          </Button>

          }
        </Toolbar>
      </AppBar>
      <Box sx={{ p: { xs: 2, sm: 3, md: 4 } ,marginTop:'40px'}}>
        <Typography variant="h6">
          {isDoctor
            ? `Patient: ${item?.patient?.profile.firstName} ${item?.patient?.profile.lastName}`
            : `Doctor: ${item?.doctor?.profile.firstName} ${item?.doctor?.profile.lastName}`}
        </Typography>
        <Typography variant="subtitle1">Date: {item?.date?format(item?.date, 'yyyy-MM-dd'):''}</Typography>
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
      <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, backgroundColor: '#f9f9f9' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ border: '1px solid #e0e0e0', p: 2 }}>
              <Typography variant="h5" gutterBottom>
                Test Recommendation
              </Typography>
              {
                isDoctor &&
                <Box
        sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        padding: 3,
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        maxWidth: 400,
        margin: "0 auto",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Add New Test
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("testName")}
          id="testName"
          name="testName"
          label="Test Name"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            padding: "10px 0",
            fontWeight: "bold",
          }}
        >
          Add Test
        </Button>
      </form>
                </Box>
              }
              {
                testRecommendation.length=='0'?
                <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: '#555',
                    fontWeight: 'bold',
                    '@media (max-width: 600px)': {
                      fontSize: '1rem',
                    },
                  }}
                >
                  There is no test recommendation here!
                </Typography>
                </Box>
                :
                <ol>
                {testRecommendation?.map((rec,index) => (
                  <TestRecommendation isDoctor={user.role=='patient'?false:true} key={rec._id} item={rec} index={index} />
                ))}
              </ol>
              }
              <Box sx={{ textAlign: 'right', mt: 2 }}>
                {
                  testRecommendation.length !='0' &&
                <Button variant="contained" onClick={handleClickOpenTest}>
                  Download Recommendations
                </Button>

                }
              </Box>
              <TestRecommendationModal
                testRecommendation={testRecommendation}
                openTest={openTest}
                handleCloseTest={handleCloseTest}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ border: '1px solid #e0e0e0', p: 2 }}>
              <Typography variant="h5" gutterBottom>
                Test Results
              </Typography>
              {
                testRecommendation.length=='0'?
                <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: '#555',
                    fontWeight: 'bold',
                    '@media (max-width: 600px)': {
                      fontSize: '1rem',
                    },
                  }}
                >
                  There is no test results here!
                </Typography>
                </Box>
                :
                <ol>
                {testRecommendation?.map((result,index) => (
                  <TestResult index={index} key={result._id} item={result} />
                ))}
              </ol>
              }
              
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ textAlign: 'center', mt: 4, p: { xs: 2, sm: 3 } }}>
        <Typography sx={{textAlign:'start'}} variant="h5">Prescription</Typography>
            <Prescription isDoctor={user.role=='patient'?false:true} targetRef={targetRef} item={item} />
      </Box>
    </Dialog>
  );
};

export default AppointmentDetails;
