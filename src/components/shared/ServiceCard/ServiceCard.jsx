import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

const ServiceCard = ({ item }) => {
  return (
    <Link to={item?.path} style={{ textDecoration: "none" }}> {/* Remove underline from the link */}
      <Card
        sx={{
          maxWidth: 345,
          borderRadius: "10px",
          boxShadow: 3, 
          overflow: "hidden", 
          textAlign: "center",
        }}
      >
        <CardMedia
          component="img"
          alt="Video Call"
          height="200"
          image={item.img} 
          sx={{
            objectFit: "cover",
          }}
        />
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold"}} 
          >
            {item.title}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"

          >
            {item.body}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ServiceCard;
