
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
// const Header=({item,isDoctor})=>{
//   if(!item){
//     return null
//   }
//   return(
//     <Box sx={{ p: { xs: 2, sm: 3, md: 4 } ,marginTop:'40px'}}>
//     <Typography variant="h6">
//       {isDoctor
//         ? `Patient: ${item?.patientDetails?.fullName?item?.patientDetails?.fullName:'N/A'}`
//         : `${item?.doctor?.title} ${item?.doctor?.firstName} ${item?.doctor?.lastName}`}
//     </Typography>
//     <Typography variant="subtitle1">Schedule Date: {item?.date?format(item?.date, 'yyyy-MM-dd'):''}</Typography>
//     <Typography variant="subtitle1">Schedule Slot: {item?.time}</Typography>
//     <Typography
// component="a"
// href={item?.googleMeetLink}
// target="_blank"
// rel="noopener noreferrer"
// sx={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
// >
// Google Meet Link
// </Typography>
//     <hr />
//   </Box>
//   )
// }

/**Test Recommendation List */


/**Test Recommendation and Result */



const AppointmentDetails = ({item, open, handleClose, isDoctor }) => { 
  const {user}=useStoreState(state=>state.user)
  const {register,handleSubmit,reset}=useForm()
  const [openTest, setOpenTest] = useState(false);
  const { toPDF, targetRef } = usePDF({ filename: 'prescription.pdf' });
  const {createTest}=useStoreActions(action=>action.testRecommendation)
  const {updatedData}=useStoreState(state=>state.testRecommendation)
  const apppintmentID=item?._id
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
          {/* {
            !isDoctor &&
          <Button autoFocus color="inherit" onClick={toPDF}>
            Download Prescription
          </Button>

          } */}
          <Button autoFocus color="inherit" onClick={toPDF}>
            Download Prescription
          </Button>
        </Toolbar>
      </AppBar>

      {/**Header */}
      {/* <Header item={item} isDoctor={isDoctor}></Header> */}
      
      {/**Test Recommendation and result */}
      {/* <TestRecomAndResult item={item} isDoctor={isDoctor}></TestRecomAndResult> */}
      <Box sx={{ p: { xs: 2, sm: 3 } ,marginTop:"50px"}}>
            <Prescription  isDoctor={user.role=='patient'?false:true} targetRef={targetRef} item={item} />
      </Box>
    </Dialog>
  );
};

export default AppointmentDetails;
