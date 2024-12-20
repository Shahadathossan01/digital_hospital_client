import { format } from "date-fns";
import MedicinList from "../MedicinList/MedicinList";
import { Typography, Box, Divider, TextField, Button } from "@mui/material";
import AddMedicineForm from "../AddMedicineForm/AddMedicineForm";
import { useForm } from "react-hook-form";
import { action, useStoreActions } from "easy-peasy";

const Prescription = ({ item, targetRef,isDoctor }) => {

  if (!item) return null;
  const {register,handleSubmit,reset}=useForm()
  const {createPrescription}=useStoreActions(action=>action.prescription)
  const { patient, doctor, prescription } = item;
  const { firstName, lastName, age, gender, blood, height, weight } = patient.profile;
  const formattedDate = format(prescription?.date, "d/M/yyyy");
  const appointmentID=item?._id
  const onSubmit=(data)=>{
    createPrescription({data,appointmentID})
  }

  return (
    <>
    {
       <Box
       sx={{
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'center',
         padding: 2,
         minHeight: '10vh',
         backgroundColor: '#f9f9f9',
         textAlign: 'center',
       }}
     >
       {!item?.prescription ? 
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
             There is no prescription created yet!
           </Typography>
           <form onSubmit={handleSubmit(onSubmit)}>
                   <TextField
                     {...register("diagnosis")}
                     id="diagnosis"
                     name="diagnosis"
                     label="Diagnosis"
                     variant="outlined"
                     fullWidth
                     sx={{ marginBottom: 2 }}
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
                     create prescription
                   </Button>
                 </form>
         </Box>
        : 
        <Box ref={targetRef} sx={{ padding: { xs: 2, sm: 3, md: 4 }, backgroundColor: "#f9f9f9" }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          gap: 2,
          paddingBottom: 2,
        }}
      >
        <Box sx={{ textAlign: "left" }}>
          <Typography variant="h6">Date: {formattedDate}</Typography>
          <Typography variant="h6">Patient Name: {firstName} {lastName}</Typography>

          <Box sx={{display:'flex',gap:'20px'}}>
          <Typography variant="h6">Diagnosis: {prescription?.diagnosis || "N/A"}</Typography>
          <Button variant="contained" color="primary"size="small">update</Button>
          </Box>

        </Box>
        <Box sx={{ textAlign: "left" }}>
          <Typography variant="h6">
            Dr. {doctor?.profile.firstName} {doctor?.profile.lastName}
          </Typography>
          <Typography variant="h6">Specialization: {doctor?.profile.specialization || "Specialization"}</Typography>
          <Typography variant="h6">Designation: {doctor?.profile.designation || "Designation"}</Typography>
        </Box>
      </Box>

      {/* Patient Details */}
      <Typography>Patient Info:</Typography>
      <hr />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          paddingBottom: 2,
        }}
      >
        <Typography variant="body1">Age: {age}</Typography>
        <Typography variant="body1">Gender: {gender}</Typography>
        <Typography variant="body1">Blood Group: {blood || "N/A"}</Typography>
        <Typography variant="body1">Height: {height || "N/A"}</Typography>
        <Typography variant="body1">Weight: {weight || "N/A"}</Typography>
      </Box>

      {/* Medication Instructions */}
      <Box sx={{ paddingBottom: 2 }}>
        <Typography variant="h5" gutterBottom>
          Medication Instructions:
        </Typography>
        <AddMedicineForm></AddMedicineForm>
        {prescription?.medicinInstructions?.length ? (
          prescription.medicinInstructions.map((item, index) => (
            <MedicinList key={item._id} number={index + 1} item={item} />
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No medication instructions provided.
          </Typography>
        )}
      </Box>

      {/* Additional Instructions */}
      <Box sx={{ paddingBottom: 2 }}>
        <Typography variant="h5" gutterBottom>
          Additional Instructions:
        </Typography>
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
        Add Additional Instructions
      </Typography>
      <form>
        <TextField
          id="testName"
          name="testName"
          label="Enter Your Instruction"
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
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
          Add Instruction
        </Button>
      </form>
              </Box>
        <Typography variant="body1">
          {prescription?.instruction || "No additional instructions provided."}
        </Typography>
      </Box>

      <Divider />
        </Box>
       }
     </Box>
    }
    </>
  );
};

export default Prescription;
