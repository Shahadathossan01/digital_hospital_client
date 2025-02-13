
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
import { get, useForm } from 'react-hook-form';
import { action, useStoreActions, useStoreState } from 'easy-peasy';
import { forwardRef, useEffect, useState } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


/**Header */
const Header=({item,isDoctor})=>{
  if(!item){
    return null
  }
  return(
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } ,marginTop:'40px'}}>
    <Typography variant="h6">
      {isDoctor
        ? `Patient: ${item?.patientDetails?.fullName?item?.patientDetails?.fullName:'N/A'}`
        : `${item?.doctor?.title} ${item?.doctor?.firstName} ${item?.doctor?.lastName}`}
    </Typography>
    <Typography variant="subtitle1">Schedule Date: {item?.date?format(item?.date, 'yyyy-MM-dd'):''}</Typography>
    <Typography variant="subtitle1">Schedule Slot: {item?.time}</Typography>
    <Typography
component="a"
href={item?.googleMeetLink}
target="_blank"
rel="noopener noreferrer"
sx={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
>
Google Meet Link
</Typography>
    <hr />
  </Box>
  )
}

/**Test Recommendation List */
const TestRecommendationList=({item})=>{
  const {user}=useStoreState(state=>state.user)
  const [openTest, setOpenTest] = useState(false);
  const handleClickOpenTest = () => {
    setOpenTest(true);
  };

  const handleCloseTest = () => {
    setOpenTest(false);
  };
  return(
    <Box>

{
                item?.testRecommendation?.length=='0'?
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
                {item?.testRecommendation?.map((rec,index) => (
                  <TestRecommendation isDoctor={user.role=='patient'?false:true} key={rec._id} item={rec} index={index} />
                ))}
              </ol>
              }
              <Box sx={{ textAlign: 'right', mt: 2 }}>
                {
                  item?.testRecommendation?.length !='0' &&
                <Button variant="contained" onClick={handleClickOpenTest}>
                  Download Recommendations
                </Button>

                }
              </Box>
              <TestRecommendationModal
                testRecommendation={item?.testRecommendation}
                openTest={openTest}
                handleCloseTest={handleCloseTest}
              />
    </Box>
  )
}

/**Test Recommendation and Result */
const TestRecomAndResult=({item,isDoctor,getByIdData})=>{
  const {register,handleSubmit,reset}=useForm()
  const {createTest}=useStoreActions(action=>action.testRecommendation)
  const apppintmentID=item?._id
  const id=item?._id

    const {createTestData,deletedData,updatedData}=useStoreState(state=>state.testRecommendation)
  const {updatedDiag,medicineData,deletedMedicin,instructionData}=useStoreState(state=>state.prescription)
  const {getAppointmentByid}=useStoreActions(actions=>actions.appointment)
  const {appointmentByIdData}=useStoreState(state=>state.appointment)
  
  useEffect(()=>{
    getAppointmentByid(id)

  },[id,createTestData,getAppointmentByid,deletedData,updatedData])

  if(!appointmentByIdData) return null
  
  const onSubmit=(data)=>{
    createTest({data,apppintmentID})
    reset()
  }


  if(!item) {
    return null
  }
  return(
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
              {/**Test Recom.. list */}
              <TestRecommendationList item={appointmentByIdData}></TestRecommendationList>

            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ border: '1px solid #e0e0e0', p: 2 }}>
              <Typography variant="h5" gutterBottom>
                Test Results
              </Typography>
              {
                appointmentByIdData?.testRecommendation?.length=='0'?
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
                {appointmentByIdData?.testRecommendation?.map((result,index) => (
                  <TestResult index={index} key={result._id} item={result} />
                ))}
              </ol>
              }
              
            </Box>
          </Grid>
        </Grid>
      </Box>
  )
}


const AppointmentDetails = ({item, open, handleClose, isDoctor }) => { 
  const {user}=useStoreState(state=>state.user)
  const {register,handleSubmit,reset}=useForm()
  const [openTest, setOpenTest] = useState(false);
  const { toPDF, targetRef } = usePDF({ filename: 'prescription.pdf' });
  const {createTest}=useStoreActions(action=>action.testRecommendation)
  const {updatedData}=useStoreState(state=>state.testRecommendation)
  const apppintmentID=item?._id

  // const {createTestData,deletedData}=useStoreState(state=>state.testRecommendation)
  // const {updatedDiag,medicineData,deletedMedicin,instructionData}=useStoreState(state=>state.prescription)
  // const {getAppointmentByid}=useStoreActions(actions=>actions.appointment)
  // const {appointmentByIdData}=useStoreState(state=>state.appointment)
  
  // useEffect(()=>{
  //   getAppointmentByid(id)

  // },[id,createTestData,getAppointmentByid,deletedData,updatedDiag,medicineData,deletedMedicin,instructionData,updatedData])

  // if(!appointmentByIdData) return null

  // console.log(appointmentByIdData)
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      {/**Navbar */}
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

      {/**Header */}
      <Header item={item} isDoctor={isDoctor}></Header>
      
      {/**Test Recommendation and result */}
      <TestRecomAndResult item={item} isDoctor={isDoctor}></TestRecomAndResult>
      <Box sx={{ textAlign: 'center', mt: 4, p: { xs: 2, sm: 3 } }}>
        <Typography sx={{textAlign:'start'}} variant="h5">Prescription</Typography>
            <Prescription  isDoctor={user.role=='patient'?false:true} targetRef={targetRef} item={item} />
      </Box>
    </Dialog>
  );
};

export default AppointmentDetails;
