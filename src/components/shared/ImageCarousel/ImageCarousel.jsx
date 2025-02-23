
import Slider from "react-slick";
import { Box } from "@mui/material";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ImageCarousel = () => {
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
    "https://res.cloudinary.com/dmel68anu/image/upload/v1739467963/syhrycaeg1sbkubwq8xv.jpg",
    "http://res.cloudinary.com/dmel68anu/image/upload/v1739551136/vmrxrcdajyzzpdreid0p.png",
  ];

  return (
    <Box
  sx={{
    width: "100%",
    overflow: "hidden",
    position: "relative",
    marginTop: "30px",
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
            maxHeight: "400px",
             // Use maxHeight instead of fixed height
            objectFit: "contain", // Show full image without cropping
            borderRadius: "10px",
          }}
        />
      </Box>
    ))}
  </Slider>
</Box>

  );
};

export default ImageCarousel;
