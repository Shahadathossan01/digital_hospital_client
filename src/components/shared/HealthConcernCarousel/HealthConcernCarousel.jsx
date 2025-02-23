import React from "react";
import Slider from "react-slick";
import { Box, Button, useTheme } from "@mui/material";
import HealthConcernCard from "../HealthConcernCard/HealthConcernCard";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const HealthConcernCarousel = ({ healthConcerns }) => {
  const theme = useTheme(); // Use MUI theme for breakpoints

  // Custom Arrows for the carousel
  const PrevArrow = ({ onClick }) => (
    <Button
      onClick={onClick}
      sx={{
        position: "absolute",
        bottom: "10px",
        left: "10px",
        zIndex: 1,
        minWidth: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "#795548",
        color: "white",
        "&:hover": { backgroundColor: "#3e2723" },
      }}
    >
      <ChevronLeft />
    </Button>
  );

  const NextArrow = ({ onClick }) => (
    <Button
      onClick={onClick}
      sx={{
        position: "absolute",
        bottom: "10px",
        right: "10px",
        zIndex: 1,
        minWidth: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "#795548",
        color: "white",
        "&:hover": { backgroundColor: "#3e2723" },
      }}
    >
      <ChevronRight />
    </Button>
  );

  // Settings for React Slick with MUI breakpoints
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Default slides to show
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg, // Large screen breakpoint
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: theme.breakpoints.values.md, // Medium screen breakpoint
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm, // Small screen breakpoint
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: theme.breakpoints.values.xs, // Extra small screen breakpoint
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box sx={{ width: "100%",marginTop:"20px",paddingBottom:"18px"}}>
      <Slider {...settings}>
        {healthConcerns.map((item) => (
          <Box
            key={item.id}
            sx={{
              
            }}
          >
            <HealthConcernCard item={item} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default HealthConcernCarousel;
