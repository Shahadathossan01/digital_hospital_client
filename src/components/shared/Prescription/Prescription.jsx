import React, { useState } from "react";
import { format } from "date-fns";
import { Typography, Box, Divider, TextField, Button, Grid, Paper } from "@mui/material";
import { useForm } from "react-hook-form";
import { useStoreActions, useStoreState } from "easy-peasy";
import MedicinList from "../MedicinList/MedicinList";
import AddMedicineForm from "../AddMedicineForm/AddMedicineForm";
import DiagnosisUpdateModal from "../DiagnosisUpdateModal/DiagnosisUpdateModal";
import AddInstructionForm from "../AddInstructionForm/AddInstructionForm";

const Prescription = ({ item, targetRef, isDoctor }) => {
  const { user } = useStoreState((state) => state.user);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { createPrescription } = useStoreActions((actions) => actions.prescription);

  if (!item) return null;

  console.log(item.patient)
  const { patient, doctor, prescription } = item;
  // const { firstName, lastName, age, gender, blood, height, weight } = patient.profile;
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
      {!item?.prescription ? (
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
          <Box sx={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'20px',}}>
              <Box sx={{textAlign:'left'}}>
              <Typography variant="h6">Date: {format(item?.prescription?.date, "d/M/yyyy")}</Typography>

              <Typography variant="h6">Patient: {item?.patient?.profile?.firstName?item?.patient?.profile?.firstName:''} {item?.patient?.profile?.firstName?item?.patient?.profile?.lastName:''}</Typography>

              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="h6">Diagnosis: {prescription?.diagnosis || "N/A"}</Typography>
                {isDoctor && (
                  <Button size="small" onClick={handleClickOpen} variant="contained" color="primary">
                    Update
                  </Button>
                )}
              </Box>
              </Box>
              <DiagnosisUpdateModal item={item} open={open} handleClose={handleClose} />
              <Box sx={{textAlign:'left'}}>
              <Typography variant="h6">
                Dr. {doctor?.profile.firstName} {doctor?.profile.lastName}
              </Typography>
              <Typography variant="h6">
                Specialization: {doctor?.category || ""}
              </Typography>
              <Typography variant="h6">
                Designation: {doctor?.profile.designation || ""}
              </Typography>
              </Box>
            </Box>  

          {/* Patient Info */}
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>
            Patient Information
          </Typography>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={6} sm={4}>
              <Typography>Age: {item?.patient?.profile?.age?item.patient.profile.age:''}</Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography>Gender: {item?.patient?.profile?.gender?item.patient.profile.gender:''}</Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography>Blood Group: {item?.patient?.profile?.blood?item.patient.profile.blood:''}</Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography>Height: {item?.patient?.profile?.height?item.patient.profile.height:''} f.</Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Typography>Weight: {item?.patient?.profile?.weight?item.patient.profile.weight:''} -kg</Typography>
            </Grid>
          </Grid>

          {/* Medication Instructions */}
          <Divider sx={{ my: 2 }} />
          <Box mb={2}>
            {isDoctor && <AddMedicineForm prescriptionID={prescriptionID} />}
            <Typography variant="h6" gutterBottom>
              Medication Instructions
            </Typography>
            {prescription?.medicinInstructions?.length !='0' ? (
              prescription.medicinInstructions.map((item, index) => (
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
            <Typography>{prescription?.instruction || "No additional instructions provided."}</Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Prescription;
