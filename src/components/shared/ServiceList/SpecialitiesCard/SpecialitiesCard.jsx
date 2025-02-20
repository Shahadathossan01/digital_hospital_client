import React, { useState } from "react";
import { Card, CardContent, Typography, Button, CardMedia, Box, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import DoctorProfileModal from "../../../../modal/DoctorProfileModal";

const SpecialitiesCard = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleOpenModal = (doctor) => {
    setSelectedDoctor(doctor);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedDoctor(null);
  };



  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 ,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      {/* Image */}
      <CardMedia
        component="img"
        image={item.profile} // Replace with the image URL
        alt={item.firstName}
         sx={{
    width: "100%",
    height: 120,
    objectFit: "cover",
    display:"flex",
    justifyContent:"center"
}}
      />

      {/* Card Content */}
      <CardContent sx={{  }}>
        {/* Name and Designation */}
        <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
          {item.firstName} {item.lastName}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
          {item.designation}
        </Typography>

        {/* Rating */}
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 ,gap:"5px"}}>
          <Rating value="0" readOnly />
          <Typography>(0)</Typography>
        </Box>

        {/* Category Name */}
        <Typography variant="body2" sx={{ marginBottom: 1}}>
          {item.speciality}
        </Typography>

        {/* Fee */}
        <Typography variant="body1" color="info" sx={{ marginBottom: 2,fontWeight:"bold" }}>
          Fee: {item.fee} {"taka"}
        </Typography>

        {/* Button Container */}
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          {/* Book Now Button */}
          <Link to={`/bookAppointment/${item._id}`}>
          <Button variant="contained" color="primary" sx={{ flex: 1, marginRight: 1 }}>
            Book Now
          </Button>
          </Link>

          {/* View Profile Button */}
          <Button  onClick={() => handleOpenModal(item)} variant="outlined" color="primary" sx={{ flex: 1 }}>
            View Profile
          </Button>
        </Box>
      </CardContent>
      <DoctorProfileModal open={open} handleClose={handleCloseModal} item={selectedDoctor}></DoctorProfileModal>
    </Card>
  );
};

export default SpecialitiesCard;
