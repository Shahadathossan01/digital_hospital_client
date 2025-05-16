
import Slider from "react-slick";
import { Box } from "@mui/material";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const AddCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "0px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ul style={{ margin: 0, padding: 0 , borderRadius:"40px",}}> {dots} </ul>
      </div>
    ),
  };

  const images = [
    "https://res.cloudinary.com/dcinvxm2u/image/upload/v1747399526/1_h27mva.jpg",
    "https://res.cloudinary.com/dcinvxm2u/image/upload/v1747399526/1_h27mva.jpg",
  ];

  return (
    <Box
  sx={{
    width: "100%",
    overflow: "hidden",
    position: "relative",
    marginTop: {xs:"10px",sm:"30px",md:"30px"},
  }}
>
  <Slider {...settings}>
    {images.map((image, index) => (
      <Box key={index}>
        <img
          src={image}
          alt={`Slide ${index + 1}`}
          style={{
            width: "100%",
            maxHeight: "600px",
             // Use maxHeight instead of fixed height
            objectFit: "cover", // Show full image without cropping
            borderRadius: "10px",
          }}
        />
      </Box>
    ))}
  </Slider>
</Box>

  );
};

export default AddCarousel;
