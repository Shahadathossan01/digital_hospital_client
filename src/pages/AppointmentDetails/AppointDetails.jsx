
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
import TestResult from '../../components/shared/TestResult/TestResult';
import Prescription from '../../components/shared/Prescription/Prescription';
import { usePDF } from 'react-to-pdf';
import TestRecommendationModal from '../../components/shared/TestRecommendationmodal/TestRecommendationModal';
import { get, useForm } from 'react-hook-form';
import { action, useStoreActions, useStoreState } from 'easy-peasy';
import { forwardRef, useEffect, useState } from 'react';
import PdfPrescription from '../../components/shared/PdfPrescription/PdfPrescription';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AppointmentDetails = ({item, open, handleClose, isDoctor }) => { 
  const {user}=useStoreState(state=>state.user)
  const { createPrescription } = useStoreActions((actions) => actions.prescription);
  const {register,handleSubmit,reset}=useForm()
  const [openTest, setOpenTest] = useState(false);
  const { toPDF, targetRef } = usePDF({ filename: 'prescription.pdf' });
  const {createTest}=useStoreActions(action=>action.testRecommendation)
  const {updatedData}=useStoreState(state=>state.testRecommendation)
  const apppintmentID=item?._id
  const [isShow,setIsShow]=useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  // const handlePDF=()=>{
  //   setIsShow(true)
  //   setTimeout(() => {
  //       toPDF();
  //       setIsShow(false); 
  //   }, 200);
  // }
  const handlePDF = async () => {
    setIsShow(true);
  
    // Wait for state update to complete
    setTimeout(async () => {
      const content = document.getElementById("pdf-content");
      if (!content) return; // Prevent errors if content is missing
  
      const canvas = await html2canvas(content, { useCORS: true });
      const imgData = canvas.toDataURL("image/png");
  
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("document.pdf");
  
      setIsShow(false);
    }, 300); // Give enough time for rendering
  };



  const appointmentID = item?._id;
  const onSubmit = (data) => {
    createPrescription({ data, appointmentID });
    reset();
  };

     const id=item?._id
    const {updatedProblem,medicineData,deletedMedicin,instructionData,createPresData}=useStoreState(state=>state.prescription)
    const {getAppointmentByid,resetAppointmentByIdData}=useStoreActions(actions=>actions.appointment)
    const {appointmentByIdData}=useStoreState(state=>state.appointment)
    
    useEffect(()=>{
        getAppointmentByid(id)
    },[getAppointmentByid,id,createPresData,updatedProblem,medicineData,deletedMedicin,instructionData])

    const handleCloseBtn=()=>{
      resetAppointmentByIdData()
      handleClose()
    }

    
    if(!appointmentByIdData) return null
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
          <IconButton edge="start" color="inherit" onClick={handleCloseBtn} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Prescription
          </Typography>
          {/* {
            !isDoctor &&
          <Button autoFocus color="inherit" onClick={toPDF}>
            Download Prescription
          </Button>

          } */}
          <Button autoFocus color="inherit" onClick={handlePDF}>
            Download
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: { xs: 2, sm: 3 } ,marginTop:"50px"}}>
            {
              appointmentByIdData.prescription?(
                <Prescription appointmentByIdData={appointmentByIdData} isDoctor={user.role=='patient'?false:true} item={appointmentByIdData} />
              ):(
                <Box>
              <Typography variant="h6" color="textSecondary" mb={2}>
              {isDoctor?"Let's Start..":"No Provide Yet!"}
          </Typography>
          {isDoctor && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register("problem")}
                label="problem"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                required
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                To Start Write A Prescription
              </Button>
            </form>
          )}
            </Box>
              )
            }
           {
            isShow && (
              <PdfPrescription onLoad={() => setIsImageLoaded(true)}   appointmentByIdData={appointmentByIdData} item={appointmentByIdData}></PdfPrescription>
            )
           }
            
      </Box>
    </Dialog>
  );
};

export default AppointmentDetails;
