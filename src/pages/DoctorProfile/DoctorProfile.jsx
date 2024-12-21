import { format } from "date-fns";
import { useStoreActions, useStoreState } from "easy-peasy";
import EditProfilePatientModal from "../../components/shared/EditProfilePatientModal/EditProfilePatientModal";
import { useEffect, useState } from "react";
import { Grid, Box, Button, Typography, Card, CardContent, Divider } from "@mui/material";
import ChangePassword from "../../components/shared/ChangePassword/ChangePassord";
import ProfileAvatorCard from "../../components/shared/ProfileAvatorCard/ProfileAvatorCard";
import EditProfileDoctorModal from "../../components/shared/EditProfileDoctorModal/EditProfileDoctorModal";

const DoctorProfile = () => {
    const { user } = useStoreState((state) => state.user);
    const { getDoctorById } = useStoreActions((action) => action.doctor);
    const { doctor ,updatedProfileData,imageData} = useStoreState((state) => state.doctor);
    const [open, setOpen] = useState(false);
    const [openCP, setOpenCP] = useState(false);

    const userID = user?.id;
    const userEmail = user?.email;
    useEffect(() => {
        getDoctorById(userID);
    }, [userID, getDoctorById,updatedProfileData,imageData]);

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

    return (
        <Grid container spacing={4} justifyContent="center" padding="20px">
            <Grid item xs={12} sm={10} md={8} lg={6}>
                <Card sx={{ boxShadow: 3, padding: 2 }}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            Profile Details
                        </Typography>
                        <Divider />
                        <Box mt={2} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
                            <Box flex={1}>
                                <Typography variant="h6">First Name: {doctor?.profile?.firstName}</Typography>
                                <Typography variant="h6">Last Name: {doctor?.profile?.lastName}</Typography>
                                <Typography variant="h6">Email: {doctor?.profile?.email}</Typography>
                                <Typography variant="h6">Phone: {doctor?.profile?.phone}</Typography>
                                <Typography variant="h6">Address: {doctor?.profile?.address}</Typography>
                                <Typography variant="h6">Specialization: {doctor?.profile?.specialization}</Typography>
                                <Typography variant="h6">Designation: {doctor?.profile?.designation}</Typography>
                                <Typography variant="h6">Offline Chamber: {doctor?.profile?.offlineChamber}</Typography>
                            </Box>
                            <Box mt={{ xs: 2, sm: 0 }} ml={{ sm: 4 }}>
                                <ProfileAvatorCard item={doctor} />
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
                        <EditProfileDoctorModal userID={userID} open={open} handleClose={handleClose} />
                        <ChangePassword userEmail={userEmail} userID={userID} openCP={openCP} handleCloseCP={handleCloseCP} />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default DoctorProfile;
