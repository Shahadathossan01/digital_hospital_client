import { format } from "date-fns";
import { useStoreActions, useStoreState } from "easy-peasy";
import EditProfilePatientModal from "../../components/shared/EditProfilePatientModal/EditProfilePatientModal";
import { useEffect, useState } from "react";
import { Grid, Box, Button, Typography, Card, CardContent, Divider } from "@mui/material";
import ChangePassword from "../../components/shared/ChangePassword/ChangePassord";

const Profile = () => {
    const { user } = useStoreState((state) => state.user);
    const { getPatient } = useStoreActions((action) => action.patient);
    const { patient, updatedData } = useStoreState((state) => state.patient);
    const [open, setOpen] = useState(false);
    const [openCP, setOpenCP] = useState(false);

    const userID = user?.id;
    const userEmail = user?.email;

    useEffect(() => {
        getPatient(userID);
    }, [userID, getPatient, updatedData]);

    if (!patient) return null;

    const { firstName, lastName, phone, address, dateOfBirth, gender, blood, age, height, weight } = patient?.profile;
    const formatedDate = format(dateOfBirth, 'd/M/yyyy');

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
            <Grid item xs={12} sm={8} md={6} lg={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>Profile Details</Typography>
                        <Divider />
                        <Box mt={2}>
                            <Typography variant="h6">First Name: {firstName}</Typography>
                            <Typography variant="h6">Last Name: {lastName}</Typography>
                            <Typography variant="h6">Email: {userEmail}</Typography>
                            <Typography variant="h6">Phone: {phone}</Typography>
                            <Typography variant="h6">Address: {address}</Typography>
                            <Typography variant="h6">Date of Birth: {formatedDate}</Typography>
                            <Typography variant="h6">Gender: {gender}</Typography>
                            <Typography variant="h6">Blood Type: {blood}</Typography>
                            <Typography variant="h6">Age: {age}</Typography>
                            <Typography variant="h6">Height: {height}</Typography>
                            <Typography variant="h6">Weight: {weight}</Typography>
                        </Box>
                        <Box mt={3} display="flex" justifyContent="space-between">
                            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                                Edit Profile
                            </Button>
                            <Button variant="contained" color="secondary" onClick={handleClickOpenCP}>
                                Change Password
                            </Button>
                        </Box>
                        <EditProfilePatientModal userID={userID} open={open} handleClose={handleClose} />
                        <ChangePassword userEmail={userEmail} userID={userID} openCP={openCP} handleCloseCP={handleCloseCP} />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Profile;
