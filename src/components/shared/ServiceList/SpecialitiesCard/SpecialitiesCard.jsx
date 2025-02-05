import React from "react";
import { Card, CardContent, Typography, Button, CardMedia, Box, Rating } from "@mui/material";
import { Link } from "react-router-dom";

const SpecialitiesCard = ({ item }) => {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      {/* Image */}
      <CardMedia
        component="img"
        image={item.profile} // Replace with the image URL
        alt={item.firstName}
        sx={{
          width: "100%",
          height: 200,
          
          margin: "0 auto",
          objectFit: "cover",
          marginTop: -4, // Adjust the image to make it more prominent
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
        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          {item.speciality}
        </Typography>

        {/* Fee */}
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
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
          <Button variant="outlined" color="primary" sx={{ flex: 1 }}>
            View Profile
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SpecialitiesCard;
