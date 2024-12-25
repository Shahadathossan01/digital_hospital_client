import { format } from "date-fns";
import { useStoreActions, useStoreState } from "easy-peasy";
import EditProfilePatientModal from "../../components/shared/EditProfilePatientModal/EditProfilePatientModal";
import { useEffect, useState } from "react";
import { Grid, Box, Button, Typography, Card, CardContent, Divider, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton } from "@mui/material";
import ChangePassword from "../../components/shared/ChangePassword/ChangePassord";
import ProfileAvatorCard from "../../components/shared/ProfileAvatorCard/ProfileAvatorCard";
import EditProfileDoctorModal from "../../components/shared/EditProfileDoctorModal/EditProfileDoctorModal";
import EditButton from "../../components/ui/EditButton/EditButton";
import SlotEditButton from "../../components/ui/SlotEditButton/SlotEditButton";
import DeleteIcon from "@mui/icons-material/Delete";
const DoctorProfile = () => {
    const { user } = useStoreState((state) => state.user);
    const { getDoctorById,addNewSlot,deleteSlot} = useStoreActions((action) => action.doctor);
    const { doctor ,updatedProfileData,imageData,statusData} = useStoreState((state) => state.doctor);
    const [open, setOpen] = useState(false);
    const [openCP, setOpenCP] = useState(false);

    const userID = user?.id;
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

    const doctorID=doctor._id

    return (
        <Box>
            <Grid container spacing={4} justifyContent="center" padding="20px">
            <Grid item xs={12} sm={10} md={8} lg={6}>
                <Card sx={{ boxShadow: 3, padding: 2 }}>
                    <CardContent>
                        <Typography sx={{textAlign:'center'}} variant="h4" gutterBottom>
                            Profile Details
                        </Typography>
                        <Typography variant="h4" gutterBottom>
                            Specialization: {doctor?.category}
                        </Typography>
                        <Divider />
                        <Box mt={2} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}>
                            <Box flex={1}>
                                <Typography variant="h6">First Name: {doctor?.profile?.firstName}</Typography>
                                <Typography variant="h6">Last Name: {doctor?.profile?.lastName}</Typography>
                                <Typography variant="h6">Email: {doctor?.profile?.email}</Typography>
                                <Typography variant="h6">Phone: {doctor?.profile?.phone}</Typography>
                                <Typography variant="h6">Address: {doctor?.profile?.address}</Typography>
                                <Typography variant="h6">Designation: {doctor?.profile?.designation}</Typography>
                                <Typography variant="h6">Offline Chamber: {doctor?.profile?.offlineChamber}</Typography>

                                <Typography variant="h6"> Fee: <span style={{ color: "green", fontWeight: "bold" }}>$ {doctor?.fee?doctor.fee:0}</span></Typography>
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
<Box>
    <Typography sx={{textAlign:'center'}} variant="h4">Schedule</Typography>
    <Box sx={{overflowX: "auto" }}>
      <Box sx={{ margin: "20px" }}>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell>
                 <Box sx={{display:'flex',gap:'10px',justifyContent:'center',alignItems:'center'}}>
                 <strong>Slots</strong>
                 </Box>
               </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctor?.schedule.map((day) => (
              <TableRow key={day._id.$oid}>
                <TableCell>
                  <Typography>
                    {format(new Date(day.date), 'dd-MM-yyyy')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{display:'flex',alignItems:'center'}}>
                  <Typography>{day.status}</Typography>
                  <EditButton scheduleID={day._id} doctorID={doctorID}></EditButton>
                  </Box>
                </TableCell>
                <TableCell>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Time</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                        <TableCell>
                          <Box sx={{display:'flex',justifyContent:'center'}}>
                            <strong>Action</strong>
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {day.slots.map((slot) => (
                        <TableRow key={slot._id.$oid}>
                          <TableCell>
                            <Typography>{slot.time}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography>{slot.status}</Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <SlotEditButton scheduleID={day._id} doctorID={doctorID} slotID={slot._id}></SlotEditButton>
                            <IconButton
                              onClick={()=>deleteSlot({doctorID,scheduleID:day._id,slotID:slot._id})}
                              aria-label="delete"
                              color="error"
                              size="small"
                              sx={{
                                "&:hover": {
                                  backgroundColor: "rgba(255, 0, 0, 0.1)",
                                },
                              }}
                              >
                                <DeleteIcon />
                            </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                      <Button onClick={()=>addNewSlot({doctorID,scheduleID:day._id})} variant="contained" size="small">Add new Slot</Button>
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </Box>
</Box>
    </Box>

        
    );
};

export default DoctorProfile;
