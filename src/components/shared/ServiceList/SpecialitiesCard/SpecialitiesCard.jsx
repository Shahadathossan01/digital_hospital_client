import React from "react";
import { Card, CardContent, Typography, Button, CardMedia, Box, Rating } from "@mui/material";

const SpecialitiesCard = ({ item }) => {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      {/* Image */}
      <CardMedia
        component="img"
        image={item.image} // Replace with the image URL
        alt="Specialist"
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
          {item.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
          {item.designation}
        </Typography>

        {/* Rating */}
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
          <Rating value={item.rating} precision={0.5} readOnly />
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            {item.rating} ({item.reviews} reviews)
          </Typography>
        </Box>

        {/* Category Name */}
        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          {item.categoryName}
        </Typography>

        {/* Fee */}
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 2 }}>
          Fee: ${item.fee}
        </Typography>

        {/* Button Container */}
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          {/* Book Now Button */}
          <Button variant="contained" color="primary" sx={{ flex: 1, marginRight: 1 }}>
            Book Now
          </Button>

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
