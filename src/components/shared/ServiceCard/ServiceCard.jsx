import React from "react";
import { Card, CardContent, Typography, CardMedia, Box } from "@mui/material";

const ServiceCard = ({item}) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: "10px", // Rounded corners
        boxShadow: 3, // Light shadow for the card
        overflow: "hidden", // Ensures the image fits correctly
        textAlign: "center", // Centers the header and body text
      }}
    >
      <CardMedia
        component="img"
        alt="Video Call"
        height="200"
        image={item.img} // Replace with your image URL
        sx={{
          objectFit: "cover", // Ensures the image covers the card's top
        }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          {item.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {item.body}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
