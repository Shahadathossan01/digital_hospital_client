import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Typography, Box, Divider, TextField, Button, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { useStoreActions, useStoreState } from "easy-peasy";
import MedicinList from "../MedicinList/MedicinList";
import AddMedicineForm from "../AddMedicineForm/AddMedicineForm";
import DiagnosisUpdateModal from "../DiagnosisUpdateModal/DiagnosisUpdateModal";
import AddInstructionForm from "../AddInstructionForm/AddInstructionForm";
import Grid from '@mui/material/Grid2';
import { Link } from "react-router-dom";
import TestRecommendationModal from "../TestRecommendationmodal/TestRecommendationModal";
import TestResult from "../TestResult/TestResult";
import TestRecommendation from "../TestRecommendation/TestRecommendation";
const Header=()=>{
  return(
    <Box sx={{textAlign:"center"}}>
      <Typography variant="h6" sx={{fontSize:"40px",textDecoration:"underline"}}>Sureline Health</Typography>
      <Box sx={{display:"flex",justifyContent:"center",gap:{xs:"5px",sm:"70px"},alignItems:"center",flexWrap:"wrap"}}>
      <Link style={{ textDecoration: 'none' }} href="https://www.surelinehealth.com" target="_blank" rel="noopener noreferrer">
        <Typography>www.surelinehealth.com</Typography>
      </Link>
        <Typography>sureline.official@gmail.com</Typography>
      </Box>
      <Typography sx={{marginTop:"5px"}}><strong>Tel:</strong> 019543666618</Typography>
    </Box>
  )
}
const DoctorHeader=({appointmentByIdData})=>{
  if(appointmentByIdData.length==0) return
  console.log(appointmentByIdData)
  return(
    <Box sx={{display:"flex",justifyContent:"space-between"}}>
      <Box>
        <Typography sx={{fontWeight:"bold"}}>{appointmentByIdData?.doctor?.title} {appointmentByIdData?.doctor?.firstName} {appointmentByIdData?.doctor?.lastName}</Typography>
        <Typography>{appointmentByIdData?.doctor?.designation}</Typography>
        <Typography>{appointmentByIdData?.doctor?.speciality}</Typography>
        <Typography>{appointmentByIdData?.doctor?.organization}</Typography>
        <Typography><strong>BMDC Reg. No-</strong>{appointmentByIdData?.doctor?.bmdcNumber}</Typography>
      </Box>
      <Box>
        <Typography><strong>Date:</strong> {format(new Date(appointmentByIdData?.doctor?.createdAt), "M/d/yyyy")}</Typography>
        <Typography><strong>Ref:</strong> {"todo"}</Typography>
      </Box>
    </Box>
  )
}
const PatientHeader=({appointmentByIdData})=>{
  return(
    <Box>
      <Typography variant="h6" sx={{textAlign:"center"}}>Patient Info.</Typography>
    <Box sx={{display:"flex",justifyContent:"center",gap:"20px",flexWrap:"wrap"}}>
       <Typography><strong>Patient Name:</strong> {appointmentByIdData?.patientDetails?.fullName}</Typography>
       <Typography><strong>Age:</strong> {appointmentByIdData?.patientDetails?.age}</Typography>
       <Typography><strong>Gender:</strong> {appointmentByIdData?.patientDetails?.gender}</Typography>
       <Typography><strong>Height:</strong> {appointmentByIdData?.patientDetails?.height}</Typography>
       <Typography><strong>Weight:</strong> {appointmentByIdData?.patientDetails?.weight}</Typography>
    </Box>
    </Box>
  )
}
const PatientInfoWithHandleDoctor=()=>{
  return(
    <Box>
      {/* <Box display="flex" alignItems="center"   gap={1} padding={2}>
                <Typography color="warning">Diagnosis: {appointmentByIdData?.prescription?.diagnosis || "N/A"}</Typography>
                {isDoctor && (
                  <Button size="small" onClick={handleClickOpen} variant="contained" color="primary">
                    Update
                  </Button>
                )}
              </Box>
              <DiagnosisUpdateModal item={appointmentByIdData} open={open} handleClose={handleClose} /> */}

      <Box sx={{display:"flex",alignItems:"center"}}>
        <Typography><strong>Problem:</strong>{"todo"}</Typography>
        <Button>edit</Button>
      </Box>
      <Box sx={{display:"flex",alignItems:"center"}}>
      <Typography><strong>Temperature:</strong>{"todo"}</Typography>
      <Button>edit</Button>
      </Box>
      <Box sx={{display:"flex",alignItems:"center"}}>
        <Typography><strong>Blood Presure:</strong>{"todo"}</Typography>
      <Button>edit</Button>
      </Box>
      <Box sx={{display:"flex",alignItems:"center"}}>
      <Typography><strong>Palse:</strong>{"todo"}</Typography>
      <Button>edit</Button>
      </Box>
      <Box sx={{display:"flex",alignItems:"center"}}>
      <Typography><strong>R/R:</strong>{"todo"}</Typography>
      <Button>edit</Button>
      </Box>
      <Box sx={{display:"flex",alignItems:"center"}}>
      <Typography><strong>Lungs:</strong>{"todo"}</Typography>
      <Button>edit</Button>
      </Box>
      <Box sx={{display:"flex",alignItems:"center"}}>
      <Typography><strong>Others</strong>{"todo"}</Typography>
      <Button>edit</Button>
      </Box>
    </Box>
  )
}
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
              {/* <Box sx={{ textAlign: 'right', mt: 2 }}>
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
              /> */}
    </Box>
  )
}
const AddCommentsForm=({isDoctor})=>{
  const {register,handleSubmit,reset}=useForm()
  const onSubmit=(data)=>{

  }
  return(
    <Box>
      {
                isDoctor &&
                
      <form  onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{display:"flex",alignItems:"center",gap:"20px"}}>
        <TextField
          {...register("comments")}
          id="comments"
          name="comments"
          label="comments"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Add comments
        </Button>
        </Box>
      </form>
              }
      </Box>
  )
}
const CommentsData=()=>{
  return(
    <Box>
      <Typography variant="h6">comments:</Typography>
      <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, vitae repudiandae!</Typography>
    </Box>
  )
}
const TestRecommendationNew=({item,isDoctor})=>{
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
    <Box>
    {/**New code */}  
      <Typography variant="h6" sx={{textAlign:"center"}}>Test Recommendation</Typography>

      {/**Add Test */}
      <Box>
      {
                isDoctor &&
                
      <form  onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{display:"flex",alignItems:"center",gap:"20px"}}>
        <TextField
          {...register("testName")}
          id="testName"
          name="testName"
          label="Test Name"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Add Test
        </Button>
        </Box>
      </form>
              }
      </Box>
      {/**List of tests */}
        <TestRecommendationList item={appointmentByIdData}></TestRecommendationList>
    </Box>  
  )
}
const Section1=({item,isDoctor})=>{
  return(
    <Box>
      <PatientInfoWithHandleDoctor></PatientInfoWithHandleDoctor><Divider></Divider>
      <TestRecommendationNew item={item} isDoctor={isDoctor}></TestRecommendationNew><Divider></Divider>
      <AddCommentsForm isDoctor={isDoctor}></AddCommentsForm>
      <CommentsData></CommentsData>
    </Box>
  )
}
const Section2=({isDoctor,appointmentByIdData})=>{
  console.log(appointmentByIdData)
  return(
    <Box>
      <Typography>Rx.</Typography>
      <Box>
      {isDoctor && <AddMedicineForm prescriptionID={appointmentByIdData?.prescription?._id} />}
      </Box>
      <Box>
      {appointmentByIdData?.prescription?.medicinInstructions?.length !='0' ? (
              appointmentByIdData?.prescription?.medicinInstructions.map((item, index) => (
                <MedicinList
                  isDoctor={isDoctor}
                  key={item._id}
                  number={index + 1}
                  item={item}
                />
              ))
            ) : (
              <Typography color="text.secondary">No medication instructions provided.</Typography>
            )}
      </Box>
      <Box sx={{display:"flex",alignItems:"center"}}>
        <Typography><strong>Follow-up withing:</strong>{"todo"}</Typography>
        <Button>edit</Button>
      </Box>
      <Box>
            {isDoctor && <AddInstructionForm prescriptionID={appointmentByIdData?.prescription?._id} />}
            <Typography variant="h6">Advice:</Typography>
            <Typography>{appointmentByIdData?.prescription?.instruction || "No Data."}</Typography>
          </Box>
    </Box>
  )
}
const MainSection=({item,isDoctor,appointmentByIdData})=>{
  return(
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2}>
      <Grid size={5}>
        <Section1 item={item} isDoctor={isDoctor}></Section1>
      </Grid>
      <Grid size={7}>
        <Section2 isDoctor={isDoctor} appointmentByIdData={appointmentByIdData}></Section2>
      </Grid>
    </Grid>
  </Box>
  )
}
const PresFooter=()=>{
  return(
    <Box sx={{textAlign:"center"}}>
      <Typography>Sureline Health অ্যাপ এবং ওয়েবসাইটের মাধ্যমে প্রয়োজনীয় সেবা গ্ৰহণ করুন সহজে।</Typography>
      <Typography>This prescription is generated from Sureline Health platfrom. Ref No- RKV88674j</Typography>
    </Box>
  )
}
const Prescription = ({ item, targetRef, isDoctor}) => {
  const { user } = useStoreState((state) => state.user);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { createPrescription } = useStoreActions((actions) => actions.prescription);
    const id=item?._id
    const {updatedDiag,medicineData,deletedMedicin,instructionData,createPresData}=useStoreState(state=>state.prescription)
    const {getAppointmentByid}=useStoreActions(actions=>actions.appointment)
    const {appointmentByIdData}=useStoreState(state=>state.appointment)
    
    useEffect(()=>{
      getAppointmentByid(id)
  
    },[getAppointmentByid,id,createPresData,updatedDiag,medicineData,deletedMedicin,instructionData])
  
    if(!appointmentByIdData) return null
  
  const appointmentID = item?._id;
  const prescriptionID = item?.prescription?._id;

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (data) => {
    createPrescription({ data, appointmentID });
    reset();
  };

  return (
    <Box>
    <Header></Header><Divider></Divider>
    <DoctorHeader appointmentByIdData={appointmentByIdData}></DoctorHeader><Divider></Divider>
    <PatientHeader appointmentByIdData={appointmentByIdData}></PatientHeader><Divider></Divider>
    <MainSection item={item} isDoctor={isDoctor} appointmentByIdData={appointmentByIdData}></MainSection><Divider></Divider>
    <PresFooter></PresFooter>
    </Box>
  );
};

export default Prescription;
