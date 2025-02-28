import React, { useState } from "react";
import { Card, CardContent, Typography, Button, CardMedia, Box, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import DoctorProfileModal from "../../../../modal/DoctorProfileModal";

const SpecialitiesCard = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const defaultImage="https://thumbs.dreamstime.com/b/male-doctor-avatar-icon-wearing-white-coat-cross-symbol-simple-black-340009237.jpg"
  const handleOpenModal = (doctor) => {
    setSelectedDoctor(doctor);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: 250,  // Fixed width
        height: 380, // Fixed height
        padding: 2,
      }}
    >
      {/* Image */}
      <CardMedia
        component="img"
        image={item?.profile?item?.profile:defaultImage}
        alt="No image uploaded"
        sx={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />

      {/* Card Content */}
      <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
        {/* Name and Designation */}
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
          {item.firstName} {item.lastName}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
          {item.designation}
        </Typography>

        {/* Rating */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 1 }}>
          <Rating value={0} readOnly />
          <Typography sx={{ marginLeft: "5px" }}>(0)</Typography>
        </Box>

        {/* Category Name */}
        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          {item.speciality}
        </Typography>

        {/* Fee */}
        <Typography variant="body1" color="info" sx={{ marginBottom: 2, fontWeight: "bold" }}>
          Fee: {item.fee} Taka
        </Typography>
      </CardContent>

      {/* Button Container */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1, width: "100%" }}>
        <Link to={`/bookAppointment/${item._id}`} style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary" sx={{ flex: 1 }}>
            Book Now
          </Button>
        </Link>
        <Button onClick={() => handleOpenModal(item)} variant="outlined" color="primary" sx={{ flex: 1 }}>
          View Profile
        </Button>
      </Box>

      <DoctorProfileModal open={open} handleClose={handleCloseModal} item={selectedDoctor} />
    </Card>
  );
};

export default SpecialitiesCard;
