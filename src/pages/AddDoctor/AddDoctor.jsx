import { Box } from "@mui/material";
import BecomeADoctorForm from "../BecomeADoctorForm/BecomeADoctorForm";

const AddDoctor = () => {
    return (
        <Box sx={{bgcolor:"white",padding:"10px",borderRadius:"20px"}}>
            <BecomeADoctorForm></BecomeADoctorForm>
        </Box>
    );
};

export default AddDoctor;