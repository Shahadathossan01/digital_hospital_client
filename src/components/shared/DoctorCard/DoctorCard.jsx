import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import DoctorProfileModal from "../DoctorProfileModal/DoctorProfileModal";
import { useStoreActions, useStoreState } from "easy-peasy";

const DoctorCard = ({ item }) => {
  const { getUrl } = useStoreActions((action) => action.sslCommerz);
  const { getPatient } = useStoreActions((action) => action.patient);
  const { patient } = useStoreState((state) => state.patient);
  const { user } = useStoreState((state) => state.user);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user?.id) {
      getPatient(user.id);
    }
  }, [getPatient, user]);

  if (!item?.profile) return null;

  const { firstName, lastName, specialization, designation } = item.profile;

  const handleApply = () => {
    const payload = {
      patientID: patient?._id,
      doctorID: item?._id,
      patientName: `${patient?.profile?.firstName} ${patient?.profile?.lastName}`,
      fee: item?.fee,
    };
    getUrl(payload);
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isBusy = item?.appointmentLimit <= item?.appointments?.length;

  return (
    <Card sx={{ display: "flex", flexDirection: "row", mb: 3, p: 2, alignItems: "center" }}>
      <CardMedia
        component="img"
        sx={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          objectFit: "cover",
        }}
        image="https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"
        alt="Doctor Profile"
      />
      <Box sx={{ display: "flex", flexDirection: "column", ml: 3, flex: 1 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "text.primary" }}>
            Dr. {firstName} {lastName}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Specialization: {specialization}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Designation: {designation}
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Fee: ${item.fee}
          </Typography>
          <Typography variant="body1" sx={{ color: isBusy ? "error.main" : "success.main" }}>
            Status: {isBusy ? "Busy" : "Available"}
          </Typography>
          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Button
              onClick={handleApply}
              disabled={isBusy}
              variant="contained"
              color={isBusy ? "error" : "success"}
              sx={{ textTransform: "none" }}
            >
              Apply For Appointment
            </Button>
            <Button onClick={handleClickOpen} variant="contained" color="primary" sx={{ textTransform: "none" }}>
              View Profile
            </Button>
          </Box>
        </CardContent>
      </Box>
      <DoctorProfileModal item={item} open={open} handleClose={handleClose} />
    </Card>
  );
};

export default DoctorCard;
