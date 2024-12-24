import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import DoctorProfileModal from "../DoctorProfileModal/DoctorProfileModal";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Link, useNavigate } from "react-router-dom";

const DoctorCard = ({ item }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      {item.profile && (
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // Stack on xs, row on larger screens
            mb: 3,
            p: 2,
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: 3,
            borderRadius: 2,
            width:"400px"
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: { xs: 120, sm: 140 }, // Adjust width based on screen size
              height: { xs: 120, sm: 140 }, // Adjust height based on screen size
              borderRadius: "50%",
              objectFit: "cover",
              mb: { xs: 2, sm: 0 }, // Add margin on xs screens only
            }}
            image={item.image}
            alt="Doctor Profile"
          />
          <Box sx={{ display: "flex", flexDirection: "column", ml: { sm: 3 }, width: "100%" }}>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "text.primary", mb: 1 }}
              >
                Dr. {item?.profile?.firstName} {item?.profile?.lastName}
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", mb: 1 }}>
                Specialization: {item?.category}
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", mb: 1 }}>
                Designation: {item?.profile?.designation}
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", mb: 1 }}>
                Fee: ${item?.fee}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "column"}, gap: 2 }}>
                <Link to={`/paymentPage/${item._id}`}>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ textTransform: "none", width: { xs: "100%", sm: "auto" } }} // Full width on xs
                >
                  Apply For Appointment
                </Button>
                </Link>
                <Button
                  onClick={handleClickOpen}
                  variant="contained"
                  color="primary"
                  sx={{
                    textTransform: "none",
                    width: { xs: "100%", sm: "auto" }, // Full width on xs
                    mt: { xs: 2, sm: 0 }, // Margin-top only for xs
                  }}
                >
                  View Profile
                </Button>
              </Box>
            </CardContent>
          </Box>
          <DoctorProfileModal item={item} open={open} handleClose={handleClose} />
        </Card>
      )}
    </>
  );
};

export default DoctorCard;
