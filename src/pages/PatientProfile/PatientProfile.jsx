import { format } from "date-fns";
import { useStoreActions, useStoreState } from "easy-peasy";
import EditProfilePatientModal from "../../components/shared/EditProfilePatientModal/EditProfilePatientModal";
import { useEffect, useState } from "react";
import { Grid, Box, Button, Typography, Card, CardContent, Divider } from "@mui/material";
import ChangePassword from "../../components/shared/ChangePassword/ChangePassord";
import ProfileAvatorCard from "../../components/shared/ProfileAvatorCard/ProfileAvatorCard";

const PatientProfile = () => {
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

    if (!patient) return null;

    // const formatedDate = format(dateOfBirth, 'd/M/yyyy');

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

    return (
        <>
        <Grid container spacing={4} justifyContent="center" padding="20px">
        <Grid item xs={12} sm={10} md={8} lg={6}>
            <Card sx={{ boxShadow: 3, padding: 2 }}>
                <CardContent>
                    <Typography sx={{textAlign:'center'}} variant="h4" gutterBottom>
                        Profile Details
                    </Typography>
                    <Divider />
                    <Box mt={2} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
                        <Box flex={1}>
                        <Typography variant="h6">First Name: {patient?.profile?patient.profile.firstName:''}</Typography>

                        <Typography variant="h6">Last Name: {patient?.profile?patient.profile.lastName:""}</Typography>

                        <Typography variant="h6">Email: {user?userEmail:""}</Typography>

                        <Typography variant="h6">Phone: {patient?.profile?patient.profile.phone:""}</Typography>

                        <Typography variant="h6">Address: {patient?.profile?patient.profile.address:""}</Typography>

                        <Typography variant="h6">Date of Birth: {patient?.profile?.dateOfBirth?format(patient.profile.dateOfBirth, 'd/M/yyyy'):""}</Typography>

                        <Typography variant="h6">Gender: {patient?.profile?patient.profile.gender:""}</Typography>

                        <Typography variant="h6">Blood Type: {patient?.profile?patient.profile.blood:""}</Typography>

                        <Typography variant="h6">Age: {patient?.profile?patient.profile.age:""}</Typography>

                        <Typography variant="h6">Height: {patient?.profile?patient.profile.height:""}</Typography>

                        <Typography  variant="h6">Weight: {patient?.profile?patient.profile.weight:""}</Typography>
                        </Box>
                        <Box mt={{ xs: 2, sm: 0 }} ml={{ sm: 4 }}>
                            <ProfileAvatorCard item={patient} />
                        </Box>
                    </Box>
                    <Box mt={3} display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} justifyContent="space-between">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClickOpen}
                            sx={{ textTransform: 'none' }}
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
                    </Box>
                    <EditProfilePatientModal userID={userID} open={open} handleClose={handleClose} />
                    <ChangePassword userEmail={userEmail} userID={userID} openCP={openCP} handleCloseCP={handleCloseCP} />
                </CardContent>
            </Card>
        </Grid>
    </Grid>
    </>
    );
};

export default PatientProfile;
