import { format, isEqual, set } from "date-fns";
import { useStoreActions, useStoreState } from "easy-peasy";
import EditProfilePatientModal from "../../components/shared/EditPatientProfile/EditPatientProfile";
import { useEffect, useState } from "react";
import { Box, Button, Typography, Card, CardContent, Divider, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton } from "@mui/material";
import ChangePassword from "../../components/shared/ChangePassword/ChangePassord";
import ProfileAvatorCard from "../../components/shared/ProfileAvatorCard/ProfileAvatorCard";
import EditProfileDoctorModal from "../../components/shared/EditProfileDoctorModal/EditProfileDoctorModal";
import EditButton from "../../components/ui/EditButton/EditButton";
import SlotEditButton from "../../components/ui/SlotEditButton/SlotEditButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { createSchedule, getTotalDaysInMonth } from "../../utils";
import Grid from '@mui/material/Grid2';
const DoctorProfile = () => {
    const { user } = useStoreState((state) => state.user);

    const { getDoctorById,addNewSlot,deleteSlot,updateSchedule} = useStoreActions((action) => action.doctor);

    const { doctor ,updatedProfileData,imageData,statusData} = useStoreState((state) => state.doctor);

    const [open, setOpen] = useState(false);
    const [openCP, setOpenCP] = useState(false);

    const userID = user?._id;
    const userEmail = user?.email;
    useEffect(() => {
        getDoctorById(userID);
    }, [userID, getDoctorById,updatedProfileData,imageData,statusData]);

    if (!doctor) return null;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenCP = () => {
        setOpenCP(true);
    };

    const handleCloseCP = () => {
        setOpenCP(false);
    };
   
    const PersonalInfo=({doctor})=>{
        if(!doctor) return null
        const {firstName,lastName,dateOfBirth,gender,mobile,nationality,nidOrPassport,organization,title,}=doctor
        console.log(doctor)
        return(
            <>
                <Typography color="primary" sx={{textAlign:"center"}}>Personal Info:</Typography>
                    <Box sx={{padding:"5px",display:"flex",flexDirection:"column",gap:1}}>

                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography variant="body2">
                                Full Name
                            </Typography>
                            <Typography variant="body3">
                              {title}  {firstName} {lastName}
                            </Typography>
                        </Box><Divider/>
                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography variant="body2">
                                Date of Birth
                            </Typography>
                            <Typography variant="body3">
                                {format(new Date(dateOfBirth),"M/d/yyyy")}
                            </Typography>
                        </Box><Divider/>
                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography variant="body2">
                                Gender
                            </Typography>
                            <Typography variant="body3">
                                {gender}
                            </Typography>
                        </Box><Divider/>
                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography variant="body2">
                                Mobile
                            </Typography>
                            <Typography variant="body3">
                                {mobile}
                            </Typography>
                        </Box><Divider/>
                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography variant="body2">
                                Nationality:
                            </Typography>
                            <Typography variant="body3">
                                {nationality}
                            </Typography>
                        </Box><Divider/>
                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography variant="body2">
                                Nid/Passport
                            </Typography>
                            <Typography variant="body3">
                                {nidOrPassport}
                            </Typography>
                        </Box><Divider/>
                                                
                    </Box>
            </>
        )
    }
    const ProfessionalInfo=({doctor})=>{
        if(!doctor) return null
        const {bmdcNumber,bmdcExpiryDate,degrees,designation,fee,organization}=doctor
        console.log(doctor)
        return(
            <>
                <Typography color="primary" sx={{textAlign:"center"}}>Professional Info:</Typography>
                    <Box sx={{padding:"5px",display:"flex",flexDirection:"column",gap:1}}>

                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography variant="body2">
                                BMDC Number
                            </Typography>
                            <Typography variant="body3">
                              {bmdcNumber}
                            </Typography>
                        </Box><Divider/>
                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography variant="body2">
                                BMDC EXpiry Date
                            </Typography>
                            <Typography variant="body3">
                               {format(bmdcExpiryDate,"M/d/yyyy")}
                            </Typography>
                        </Box><Divider/>
                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography variant="body2">
                                Degrees
                            </Typography>
                            <Typography variant="body3">
                                {degrees}
                            </Typography>
                        </Box><Divider/>
                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography color="success" fontWeight="bold" variant="body2">
                                Fee
                            </Typography>
                            <Typography color="success" fontWeight="bold" variant="body3">
                                {fee}
                            </Typography>
                        </Box><Divider/>
                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography variant="body2">
                                Designation
                            </Typography>
                            <Typography variant="body3">
                                {designation}
                            </Typography>
                        </Box><Divider/>
                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography variant="body2">
                                Organization
                            </Typography>
                            <Typography variant="body3">
                                {organization}
                            </Typography>
                        </Box><Divider/>                   
                    </Box>
            </>
        )
    }

    return (
        <Box>
          <Card sx={{ boxShadow: 3}}>
                    <CardContent>
                        <Box flexGrow={1}>
                            <Grid container spacing={1}>
                                <Grid size={{xs:12,sm:12,md:5,lg:4}}>
                                    <ProfileAvatorCard item={doctor} />
                                </Grid>
                                <Grid size={{xs:12,sm:12,md:7,lg:8}}>
                                    <Box flexGrow={1}>
                                        <Grid container spacing={1}>
                                            <Grid size={{xs:12,sm:6,md:12,lg:6}}>
                                                <PersonalInfo doctor={doctor}></PersonalInfo>
                                            </Grid>
                                            <Grid size={{xs:12,sm:6,md:12,lg:6}}>
                                                <ProfessionalInfo doctor={doctor}></ProfessionalInfo>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Box>
                                <Typography variant="h6">Biography</Typography><Divider/>
                                <Typography variant="body">
                                    {doctor?.biography}
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{textAlign:"center",marginTop:"20px"}}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleClickOpen}
                                sx={{ textTransform: 'none' }}
                            >
                                Edit Profile
                            </Button>
                            </Box>    
                        
                        <EditProfileDoctorModal userID={userID} open={open} handleClose={handleClose} />
                    </CardContent>
          </Card>
        </Box>
    );
};

export default DoctorProfile;
