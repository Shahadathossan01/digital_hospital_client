import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Typography, Box, Divider, TextField, Button, Paper, CardContent } from "@mui/material";
import { useForm } from "react-hook-form";
import { useStoreActions, useStoreState } from "easy-peasy";
import MedicinList from "../MedicinList/MedicinList";
import AddMedicineForm from "../AddMedicineForm/AddMedicineForm";
import DiagnosisUpdateModal from "../DiagnosisUpdateModal/DiagnosisUpdateModal";
import Grid from '@mui/material/Grid2';
import { Link } from "react-router-dom";
import TestRecommendationModal from "../TestRecommendationmodal/TestRecommendationModal";
import TestResult from "../TestResult/TestResult";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ResultModal from "../ResultModal/ResultModal";
import OpenModal from "../../../modal/OpenModal";
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
  return(
    <Box sx={{display:"flex",justifyContent:"space-between",margin:"30px 0px"}}>
      <Box>
        <Typography sx={{fontWeight:"bold"}}>{appointmentByIdData?.doctor?.title} {appointmentByIdData?.doctor?.firstName} {appointmentByIdData?.doctor?.lastName}</Typography>
        <Typography>{appointmentByIdData?.doctor?.designation}</Typography>
        <Typography>{appointmentByIdData?.doctor?.speciality}</Typography>
        <Typography>{appointmentByIdData?.doctor?.organization}</Typography>
        <Typography><strong>BMDC Reg. No-</strong>{appointmentByIdData?.doctor?.bmdcNumber}</Typography>
      </Box>
      <Box>
        <Typography><strong>Date:</strong> {format(new Date(appointmentByIdData?.prescription?.createdAt), "M/d/yyyy")}</Typography>
        <Typography><strong>Ref:</strong> {appointmentByIdData?.prescription?.ref}</Typography>
      </Box>
    </Box>
  )
}
const PatientHeader=({appointmentByIdData})=>{
  return(
    <Box>
      <Typography variant="h6" sx={{textAlign:"center",textDecoration:"underline",marginTop:"10px"}}>Patient Info.</Typography>
      <Box sx={{textAlign:"center",margin:"30px 0px"}}>
        <Grid container spacing={0} >
            <Grid size={{xs:12,sm:4,md:4}} sx={{}}><Typography><strong>Name:</strong> {appointmentByIdData?.patientDetails?.fullName}</Typography></Grid>
            <Grid size={{xs:12,sm:2,md:2}} sx={{}}><Typography><strong>Age:</strong> {appointmentByIdData?.patientDetails?.age}</Typography></Grid>
            <Grid size={{xs:12,sm:2,md:2}} sx={{}}><Typography><strong>Gender:</strong> {appointmentByIdData?.patientDetails?.gender}</Typography></Grid>
            <Grid size={{xs:12,sm:2,md:2}} sx={{}}><Typography><strong>Height:</strong> {appointmentByIdData?.patientDetails?.height}-ft</Typography></Grid>
            <Grid size={{xs:12,sm:2,md:2}} sx={{}}><Typography><strong>Weight:</strong> {appointmentByIdData?.patientDetails?.weight}-kg</Typography></Grid>
        </Grid>
      </Box>
    </Box>
  )
}
const ActionFrom=({handleClose,id,handleAction,type})=>{
   const {register,handleSubmit,reset}=useForm()
   const onSubmit=(data)=>{
    handleAction({data,id})
    reset()
    handleClose()
  }
  return(
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register(type)}
                id={type}
                name={type}
                label={type}
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
                confirm
              </Button>
            </form>
    </Box>
  )
}

const ProblemAction=({id})=>{
  const {updatePrescription}=useStoreActions(action=>action.prescription)
  const [open,setOpen]=useState(false)
  const handleOpen=()=>{
    setOpen(true)
  }
  const handleClose=()=>{
    setOpen(false)
  }

  return(
    <Box>
      <Button onClick={handleOpen}>edit</Button>
      <OpenModal open={open} handleClose={handleClose}>
        <ActionFrom id={id} type="problem" handleClose={handleClose} handleAction={updatePrescription}></ActionFrom>
      </OpenModal>
    </Box>
  )
}
const TemperatureAction=({id})=>{
  const {updatePrescription}=useStoreActions(action=>action.prescription)
  const [open,setOpen]=useState(false)
  const handleOpen=()=>{
    setOpen(true)
  }
  const handleClose=()=>{
    setOpen(false)
  }

  return(
    <Box>
      <Button onClick={handleOpen}>edit</Button>
      <OpenModal open={open} handleClose={handleClose}>
        <ActionFrom id={id} type="temperature" handleClose={handleClose} handleAction={updatePrescription}></ActionFrom>
      </OpenModal>
    </Box>
  )
}
const BloodPresureAction=({id})=>{
  const {updatePrescription}=useStoreActions(action=>action.prescription)
  const [open,setOpen]=useState(false)
  const handleOpen=()=>{
    setOpen(true)
  }
  const handleClose=()=>{
    setOpen(false)
  }

  return(
    <Box>
      <Button onClick={handleOpen}>edit</Button>
      <OpenModal open={open} handleClose={handleClose}>
        <ActionFrom id={id} type="blood_presure" handleClose={handleClose} handleAction={updatePrescription}></ActionFrom>
      </OpenModal>
    </Box>
  )
}
const PalseAction=({id})=>{
  const {updatePrescription}=useStoreActions(action=>action.prescription)
  const [open,setOpen]=useState(false)
  const handleOpen=()=>{
    setOpen(true)
  }
  const handleClose=()=>{
    setOpen(false)
  }

  return(
    <Box>
      <Button onClick={handleOpen}>edit</Button>
      <OpenModal open={open} handleClose={handleClose}>
        <ActionFrom id={id} type="palse" handleClose={handleClose} handleAction={updatePrescription}></ActionFrom>
      </OpenModal>
    </Box>
  )
}
const R_RAction=({id})=>{
  const {updatePrescription}=useStoreActions(action=>action.prescription)
  const [open,setOpen]=useState(false)
  const handleOpen=()=>{
    setOpen(true)
  }
  const handleClose=()=>{
    setOpen(false)
  }

  return(
    <Box>
      <Button onClick={handleOpen}>edit</Button>
      <OpenModal open={open} handleClose={handleClose}>
        <ActionFrom id={id} type="r_r" handleClose={handleClose} handleAction={updatePrescription}></ActionFrom>
      </OpenModal>
    </Box>
  )
}
const LungsAction=({id})=>{
  const {updatePrescription}=useStoreActions(action=>action.prescription)
  const [open,setOpen]=useState(false)
  const handleOpen=()=>{
    setOpen(true)
  }
  const handleClose=()=>{
    setOpen(false)
  }

  return(
    <Box>
      <Button onClick={handleOpen}>edit</Button>
      <OpenModal open={open} handleClose={handleClose}>
        <ActionFrom id={id} type="lungs" handleClose={handleClose} handleAction={updatePrescription}></ActionFrom>
      </OpenModal>
    </Box>
  )
}
const OthersAction=({id})=>{
  const {updatePrescription}=useStoreActions(action=>action.prescription)
  const [open,setOpen]=useState(false)
  const handleOpen=()=>{
    setOpen(true)
  }
  const handleClose=()=>{
    setOpen(false)
  }

  return(
    <Box>
      <Button onClick={handleOpen}>edit</Button>
      <OpenModal open={open} handleClose={handleClose}>
        <ActionFrom id={id} type="others" handleClose={handleClose} handleAction={updatePrescription}></ActionFrom>
      </OpenModal>
    </Box>
  )
}

const PatientInfoWithHandleDoctor=({isDoctor,item})=>{
  const {getPrescriptionById}=useStoreActions(actions=>actions.prescription)
  const {getPrescriptionByIdData,updatedData}=useStoreState(state=>state.prescription)
  const id=item?.prescription?._id
  useEffect(()=>{
    if(!id) return
    getPrescriptionById({id})
  },[id,getPrescriptionById,updatedData])
 
  if(!getPrescriptionByIdData) return null

  return(
    <Box>

      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <Typography><strong style={{color:"orange"}}>Problem:</strong> {getPrescriptionByIdData?.problem || "N/A"}</Typography>
        {isDoctor && (
          <ProblemAction id={id}></ProblemAction>
        )}
      </Box><Divider></Divider>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <Typography><strong>Temperature:</strong> {getPrescriptionByIdData?.temperature || "N/A"}</Typography>
      {
        isDoctor && (
          <TemperatureAction id={id}></TemperatureAction>
        )
      }
      </Box><Divider></Divider>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <Typography><strong>Blood Presure:</strong> {getPrescriptionByIdData?.blood_presure || "N/A"}</Typography>
        {
          isDoctor && (
            <BloodPresureAction id={id}></BloodPresureAction>
          )
        }
      </Box><Divider></Divider>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <Typography><strong>Palse:</strong> {getPrescriptionByIdData?.palse || "N/A"}</Typography>
      {
        isDoctor && (
          <PalseAction id={id}></PalseAction>
        )
      }
      </Box><Divider></Divider>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <Typography><strong>R/R:</strong> {getPrescriptionByIdData?.r_r || "N/A"}</Typography>
      {
        isDoctor && (
          <R_RAction id={id}></R_RAction>
        )
      }
      </Box><Divider></Divider>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <Typography><strong>Lungs:</strong> {getPrescriptionByIdData?.lungs || "N/A"}</Typography>
      {
        isDoctor && (
          <LungsAction id={id}></LungsAction>
        )
      }
      </Box><Divider></Divider>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <Typography><strong>Others:</strong> {getPrescriptionByIdData?.others || "N/A"}</Typography>
      {
        isDoctor && (
          <OthersAction id={id}></OthersAction>
        )
      }
      </Box>
    </Box>
  )
}
const TestRecommendation = ({ item ,isDoctor,index}) => {
  const { register, handleSubmit, reset } = useForm();
  const { uploadTestResult,deleteTest } = useStoreActions((action) => action.testRecommendation);
  const id = item._id;
   const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  const onSubmit = (data) => {
      const formData = new FormData();
      formData.append('image', data.image[0]);
      uploadTestResult({ id, formData });
      reset();
  };

  return (
      <>
         
          <Box >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {index + 1}. {item.testName}
            </Typography>
          </Box> <Divider></Divider>
      </>
  );
};
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
                  margin:"10px"
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
                  No test yet!
                </Typography>
                </Box>
                :
                <ol>
                {item?.testRecommendation?.map((rec,index) => (
                  <TestRecommendation isDoctor={user.role=='patient'?false:true} key={rec._id} item={rec} index={index} />
                ))}
              </ol>
              }
    </Box>
  )
}
const AddCommentsForm=({isDoctor,id})=>{
  const {updatePrescription}=useStoreActions(action=>action.prescription)
  const {register,handleSubmit,reset}=useForm()
  const onSubmit=(data)=>{
    updatePrescription({data,id})
    reset()
  }
  return(
    <Box>
      {
                isDoctor &&
                
      <form  onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{display:"flex",alignItems:"center",gap:"20px",justifyContent:"space-evenly",marginTop:"10px"}}>
        <TextField
          required
          {...register("comments")}
          id="comments"
          name="comments"
          label="comments"
          // size="small"

        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
        >
          Add comments
        </Button>
        </Box>
      </form>
              }
      </Box>
  )
}

const Comments=({isDoctor,item})=>{
  const {getPrescriptionById}=useStoreActions(actions=>actions.prescription)
  const {getPrescriptionByIdData,updatedData}=useStoreState(state=>state.prescription)
  const id=item?.prescription?._id
  useEffect(()=>{
    getPrescriptionById({id})
  },[id,getPrescriptionById,updatedData])
 
  if(!getPrescriptionByIdData) return null
  return(
    <Box sx={{marginTop:"50px"}}>
       <Typography variant="h6" sx={{textDecoration:"underline"}}>comments:</Typography>
       <AddCommentsForm id={id} isDoctor={isDoctor}></AddCommentsForm>
       {
        getPrescriptionByIdData?.comments?(
          <Typography>{getPrescriptionByIdData?.comments}</Typography>
        ):(
          <Typography>No comments added</Typography>
        )
       }
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
    <Box sx={{marginTop:"50px"}}> 
      <Typography variant="h6" sx={{textDecoration:"underline"}}>Test Recommendation:</Typography>

      {/**Add Test */}
      <Box sx={{margin:"10px"}}>
      {
        isDoctor &&
      <form  onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{display:"flex",alignItems:"center",gap:"20px",justifyContent:"space-evenly"}}>
        <TextField
          {...register("testName")}
          id="testName"
          name="testName"
          label="Test Name"
          required
          size="small"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="small"
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
      <PatientInfoWithHandleDoctor item={item} isDoctor={isDoctor}></PatientInfoWithHandleDoctor><Divider></Divider>
      <TestRecommendationNew item={item} isDoctor={isDoctor}></TestRecommendationNew>
      <Comments item={item} isDoctor={isDoctor}></Comments>
    </Box>
  )
}

const AddInstructionForm = ({id}) => {
  const {updatePrescription}=useStoreActions(action=>action.prescription)
    const {register,handleSubmit,reset}=useForm()
    const onSubmit=(data)=>{
      updatePrescription({data,id})
        reset()
    }
    return (
    <Box
      
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{display:"flex",alignItems:"center",gap:"10px"}}>
        <TextField
          required
          {...register("advice")}
          id="advice"
          name="advice"
          label="Enter Your Advice"
          variant="outlined"
          size='small'
         
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size='small'
        >
          Add Advice
        </Button>
        </Box>
      </form>
    </Box>
    );
};
const FollowUPAction=({id})=>{
  const {updatePrescription}=useStoreActions(action=>action.prescription)
  const [open,setOpen]=useState(false)
  const handleOpen=()=>{
    setOpen(true)
  }
  const handleClose=()=>{
    setOpen(false)
  }

  return(
    <Box>
      <Button onClick={handleOpen}>edit</Button>
      <OpenModal open={open} handleClose={handleClose}>
        <ActionFrom id={id} type="followUp" handleClose={handleClose} handleAction={updatePrescription}></ActionFrom>
      </OpenModal>
    </Box>
  )
}
const Section2=({isDoctor,appointmentByIdData,item})=>{
  const {getPrescriptionById}=useStoreActions(actions=>actions.prescription)
  const {getPrescriptionByIdData,updatedData}=useStoreState(state=>state.prescription)
  const id=appointmentByIdData?.prescription?._id
  useEffect(()=>{
    getPrescriptionById({id})
  },[id,getPrescriptionById,updatedData])
  return(
    <Box>
      <Typography variant="h6">Rx.</Typography>
      <Box sx={{marginTop:"20px"}}>
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
              <Typography color="text.secondary" sx={{ textAlign: "center", mb: 2,mt:4 }}>
              No Medicine Instructions Provided Yet! 
          </Typography>
            )}
      </Box>
       <Box sx={{marginTop:"0px"}}>
                 <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <Box>
                       <Box sx={{display:"flex",alignItems:"center",mb:4}}>
                         <Typography><strong style={{textDecoration:"underline"}}>Follow-up within:</strong> {getPrescriptionByIdData?.followUp || "N/A"}</Typography>
                         {
                           isDoctor && (
                             <FollowUPAction id={id}></FollowUPAction>
                           )
                         }
                       </Box>
                         {isDoctor && <AddInstructionForm id={appointmentByIdData?.prescription?._id} />}
                       <Box>
                         <Typography sx={{textDecoration:"underline"}} variant="h6">Advice:</Typography>
                         <Typography>{getPrescriptionByIdData?.advice || "Not Provided."}</Typography>
                       </Box>
                    </Box>
                    <Box sx={{mt:20}}>
                       <Signature item={item} />
                    </Box>
                 </Box>
           </Box>
    </Box>
  )
}
const MainSection=({item,isDoctor,appointmentByIdData})=>{
  return(
    <>
    <Box sx={{ flexGrow: 1,marginTop:"40px" }}>
    <Grid container spacing={8}>
      <Grid size={{xs:12,sm:12,md:5}} sx={{borderRight:{xs:"",md:"1px solid gray"},padding:"10px"}}>
        <Section1 item={item} isDoctor={isDoctor}></Section1>
      </Grid>
      <Grid size={{xs:12,sm:12,md:7}}>
        <Section2 item={item} isDoctor={isDoctor} appointmentByIdData={appointmentByIdData}></Section2>
      </Grid>
    </Grid>
  </Box><Divider></Divider>
  </>
  )
}
const Signature = ({item}) => {
  if(!item) return null
  return (
    <Box sx={{ maxWidth: 300,  textAlign: 'center' }}>
      <CardContent>
        <Box
          component="img"
          src={item?.doctor?.signature}
          alt="Signature"
          sx={{ width: '100%', height: 'auto', objectFit: 'contain'}}
        />
        <Typography variant="h6" color="text.primary" fontWeight={600}>
          Signature
        </Typography>
      </CardContent>
    </Box>
  );
};
const PresFooter = ({ item }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={8}>
          <Box sx={{ textAlign: "center", marginTop: "30px" }}>
            <Typography variant="h6">
              Sureline Health অ্যাপ এবং ওয়েবসাইটের মাধ্যমে প্রয়োজনীয় সেবা গ্ৰহণ করুন সহজে।
            </Typography>
            <Typography variant="body2">
              This prescription is generated from Sureline Health platform.{" "}
              <strong>Ref. No-</strong> {item?.prescription?.ref}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};


const PdfPrescription = ({ item, targetRef, isDoctor,isShow,appointmentByIdData}) => {

  if(!appointmentByIdData) return null
  return (
    <Box>
       <Box id="pdf-content"   sx={{padding:"15px"}}>
          <Header></Header><Divider></Divider>
          <DoctorHeader appointmentByIdData={appointmentByIdData}></DoctorHeader><Divider></Divider>
          <PatientHeader appointmentByIdData={appointmentByIdData}></PatientHeader><Divider></Divider>
          <MainSection item={item} isDoctor={isDoctor} appointmentByIdData={appointmentByIdData}></MainSection>
          <PresFooter  item={item}></PresFooter>
       </Box>
    </Box>
  );
};

export default PdfPrescription;
