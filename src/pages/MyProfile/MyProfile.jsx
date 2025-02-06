import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect, useState } from "react";
import ProfileAvatorCard from "../../components/shared/ProfileAvatorCard/ProfileAvatorCard";
import EditProfilePatientModal from "../../components/shared/EditPatientProfile/EditPatientProfile";
import ChangePassword from "../../components/shared/ChangePassword/ChangePassord";
import { format } from "date-fns";
import OpenModal from "../../modal/OpenModal";
import EditPatientProfile from "../../components/shared/EditPatientProfile/EditPatientProfile";

const ProfileDetails=({patient})=>{
    const { user } = useStoreState((state) => state.user);
    return(
        <>
            <Box>
                <Typography variant="h6" sx={{display:"flex",justifyContent:"center"}}>Profile Details:</Typography>
                    <Box sx={{p:2}}>
                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography variant="body1">
                                First Name
                            </Typography>
                            <Typography variant="body3">{patient?.profile?patient.profile.firstName:user?.username}</Typography>
                        </Box><hr />

                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography >
                                Last Name
                            </Typography>
                            <Typography variant="body3">{patient?.profile?patient.profile.lastName:""}
                            </Typography>
                        </Box><hr />

                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography >
                                Phone
                            </Typography>
                            <Typography variant="body3">{patient?.profile?patient.profile.phone:""}
                            </Typography>
                        </Box><hr />

                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography >
                                Address
                            </Typography>
                            <Typography variant="body3">{patient?.profile?patient.profile.address:""}</Typography>
                        </Box><hr />

                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography >
                               Date of Birth
                            </Typography>
                            <Typography variant="body3">{patient?.profile?.dateOfBirth?format(patient.profile.dateOfBirth, 'd/M/yyyy'):""}</Typography>
                        </Box><hr />

                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography >
                               Gender
                            </Typography>
                            <Typography variant="body3">{patient?.profile?patient.profile.gender:""}</Typography>
                        </Box><hr />

                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography >
                               Blood
                            </Typography>
                            <Typography variant="body3">{patient?.profile?patient.profile.blood:""}</Typography>
                        </Box><hr />

                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography >
                               Age
                            </Typography>
                            <Typography variant="body3">{patient?.profile?patient.profile.age:""}</Typography>
                        </Box><hr />

                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography >
                            Height
                            </Typography>
                            <Typography variant="body3">{patient?.profile?patient.profile.height:""}</Typography>
                        </Box><hr />

                        <Box sx={{display:"flex",justifyContent:"space-between"}}>
                            <Typography >
                            Weight
                            </Typography>
                            <Typography variant="body3">{patient?.profile?patient.profile.weight:"N/A"}</Typography>
                        </Box><hr />
                    </Box>
            </Box>
        </>
    )
}

const MyProfile = () => {
    const { user } = useStoreState((state) => state.user);
        const { getPatient } = useStoreActions((action) => action.patient);
        const { patient, updatedData,patientImageData } = useStoreState((state) => state.patient);
        const [open, setOpen] = useState(false);
        const [openCP, setOpenCP] = useState(false);
    
        const userID = user?.id;
        const userEmail = user?.email;
    
        useEffect(() => {
            getPatient(userID);
        }, [userID, getPatient, updatedData,patientImageData]);
    


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

        if(!patient){
            return (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          height:"50px",
                          width:"50px"
                        }}
                      >
                        <CircularProgress />
                      </Box>
                    );
        }

    return (
        <>
            <Box flexGrow={1} sx={{paddingBottom:"20px"}}>
                <Grid container spacing={2}>
                    <Grid size={{xs:12,sm:4,md:4}}>
                        <Box sx={{display:"flex",justifyContent:"center"}}>
                            <ProfileAvatorCard item={patient}></ProfileAvatorCard>
                        </Box>
                        <Box sx={{display:"flex",flexDirection:"column",gap:"20px",marginTop:"20px"}}>
                        <Button
                            variant="contained"
                            onClick={handleClickOpen}
                            sx={{ textTransform: 'none',bgcolor:"#64dd17"}}
                        >
                            Edit Profile
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleClickOpenCP}
                            sx={{ textTransform: 'none' }}
                        >
                            Change Password
                        </Button>
                        <OpenModal open={open} handleClose={handleClose}>
                            <EditPatientProfile handleClose={handleClose} userID={userID}></EditPatientProfile>
                        </OpenModal>
                        {/* <EditProfilePatientModal userID={userID} open={open} handleClose={handleClose} /> */}
                        <OpenModal handleClose={handleCloseCP} open={openCP}>
                            <ChangePassword handleClose={handleCloseCP} userEmail={userEmail} userID={userID} />
                        </OpenModal>
                        </Box>
                    </Grid>
                    <Grid size={{xs:12,sm:8,md:8}}>
                        <ProfileDetails patient={patient}></ProfileDetails>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
};

export default MyProfile;
