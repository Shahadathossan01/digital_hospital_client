import { format } from "date-fns";
import MedicinList from "../MedicinList/MedicinList";
import { Typography, Box, Divider } from "@mui/material";

const Prescription = ({ item, targetRef }) => {
    if(!item) return 
    const { patient, doctor, prescription } = item;
    const { firstName, lastName, age, gender, blood, height, weight } = patient.profile;
    const formattedDate = format(prescription.date, 'd/M/yyyy');

    return (
        <Box ref={targetRef} sx={{ padding: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                <Box>
                    <Typography variant="h6">Date: {formattedDate}</Typography>
                    <Typography variant="h6">Patient Name: {firstName} {lastName}</Typography>
                    <Typography variant="h6">Diagnosis: {prescription.diagnosis}</Typography>
                </Box>
                <Box>
                    <Typography variant="h6">Dr. {doctor?.profile.firstName} {doctor?.profile?.lastName}</Typography>
                    <Typography variant="h6">{doctor?.profile.specialization}</Typography>
                    <Typography variant="h6">{doctor?.profile.designation}</Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                <Typography variant="body1">Age: {age}</Typography>
                <Typography variant="body1">Gender: {gender}</Typography>
                <Typography variant="body1">Blood: {blood}</Typography>
                <Typography variant="body1">Height: {height}</Typography>
                <Typography variant="body1">Weight: {weight}</Typography>
            </Box>
            <Box>
                {
                    prescription?.medicinInstructions.map((item, index) => (
                        <MedicinList number={index + 1} key={item._id} item={item} />
                    ))
                }
            </Box>
            <Box sx={{ padding: '10px' }}>
                <Typography variant="h5">Additional Instructions:</Typography>
                <Typography>{prescription?.instruction}</Typography>
            </Box>
            <Divider />
        </Box>
    );
};

export default Prescription;
