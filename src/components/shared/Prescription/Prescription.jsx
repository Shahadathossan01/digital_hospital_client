import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Typography, Box, Divider, TextField, Button, Grid, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { useStoreActions, useStoreState } from "easy-peasy";
import MedicinList from "../MedicinList/MedicinList";
import AddMedicineForm from "../AddMedicineForm/AddMedicineForm";
import DiagnosisUpdateModal from "../DiagnosisUpdateModal/DiagnosisUpdateModal";
import AddInstructionForm from "../AddInstructionForm/AddInstructionForm";

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
    <Box sx={{ backgroundColor: "#f0f4f7", minHeight: "100vh", p: { xs: 2, sm: 3, md: 4 } }}>
      {!appointmentByIdData?.prescription ? (
        <Paper
          elevation={3}
          sx={{
            maxWidth: 600,
            mx: "auto",
            p: 3,
            textAlign: "center",
            backgroundColor: "#fff",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="textSecondary" mb={2}>
            No prescription has been created yet!
          </Typography>
          {isDoctor && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register("diagnosis")}
                label="Diagnosis"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                required
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Create Prescription
              </Button>
            </form>
          )}
        </Paper>
      ) : (
        <Paper ref={targetRef}   elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          {/* Header Section */}
          <Box sx={{textAlign:"left"}}>
              <Typography>Date: {format(appointmentByIdData?.prescription?.date, "d/M/yyyy")}</Typography>

              <Typography color="info" variant="body1">
                Doctor: {appointmentByIdData?.doctor?.title} {appointmentByIdData?.doctor?.firstName} {appointmentByIdData?.doctor?.lastName}
              </Typography>
              <Typography color="info" variant="body1">
                Specialization: {appointmentByIdData?.doctor?.speciality || "N/A"}
              </Typography>
              <Typography color="info" variant="body2">
                Designation: {appointmentByIdData?.doctor?.designation || "N/A"}
              </Typography>
              
            </Box>  

          {/* Patient Info */}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Patient Information
          </Typography>
              <Box display="flex" alignItems="center"   gap={1} padding={2}>
                <Typography color="warning">Diagnosis: {appointmentByIdData?.prescription?.diagnosis || "N/A"}</Typography>
                {isDoctor && (
                  <Button size="small" onClick={handleClickOpen} variant="contained" color="primary">
                    Update
                  </Button>
                )}
              </Box>
              <DiagnosisUpdateModal item={appointmentByIdData} open={open} handleClose={handleClose} />

          <Grid container spacing={2} mb={2}>
            <Grid item xs={6} sm={4}>
            <Typography>Name: {appointmentByIdData?.patientDetails.fullName}</Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography>Age: {appointmentByIdData?.patientDetails?.age ||"N/A"}</Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography>Gender: {appointmentByIdData?.patientDetails?.gender ||"N/A"}</Typography>
            </Grid>
            {/* <Grid item xs={6} sm={4}>
              <Typography>Blood Group: {getByIdData?.patientDetails?. ||"N/A"}</Typography>
            </Grid> */}
            <Grid item xs={6} sm={4}>
              <Typography>Height: {appointmentByIdData?.patientDetails?.height ||"N/A"} f.</Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography>Weight: {appointmentByIdData?.patientDetails?.weight ||"N/A"} -kg</Typography>
            </Grid>
          </Grid>

          {/* Medication Instructions */}
          <Divider sx={{ my: 2 }} />
          <Box mb={2}>
            {isDoctor && <AddMedicineForm prescriptionID={appointmentByIdData?.prescription._id} />}
            <Typography variant="h6" gutterBottom>
              Medication Instructions
            </Typography>
            {appointmentByIdData?.prescription?.medicinInstructions?.length !='0' ? (
              appointmentByIdData?.prescription.medicinInstructions.map((item, index) => (
                <MedicinList
                  isDoctor={user.role === "patient" ? false : true}
                  key={item._id}
                  number={index + 1}
                  item={item}
                />
              ))
            ) : (
              <Typography color="text.secondary">No medication instructions provided.</Typography>
            )}
          </Box>

          {/* Additional Instructions */}
          <Divider sx={{ my: 2 }} />
          <Box>
            {isDoctor && <AddInstructionForm prescriptionID={prescriptionID} />}
            <Typography variant="h6" gutterBottom>
              Additional Instructions
            </Typography>
            <Typography>{appointmentByIdData?.prescription?.instruction || "No additional instructions provided."}</Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Prescription;
