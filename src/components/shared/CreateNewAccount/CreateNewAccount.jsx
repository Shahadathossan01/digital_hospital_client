import { Box } from "@mui/material";
import BecomeADoctorForm from "../../../pages/BecomeADoctorForm/BecomeADoctorForm";

const CreateNewAccount = () => {
    return (
        <Box sx={{bgcolor:"white",padding:"10px",borderRadius:"20px"}}>
            <BecomeADoctorForm></BecomeADoctorForm>
        </Box>
    );
};

export default CreateNewAccount;