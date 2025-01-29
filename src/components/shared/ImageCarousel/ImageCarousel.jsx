
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
          bottom: "10px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ul style={{ margin: 0, padding: 0 ,backgroundColor:"white", borderRadius:"40px"}}> {dots} </ul>
      </div>
    ),
  };

  const images = [
    "https://thumbs.dreamstime.com/b/medicine-doctor-analysis-electronic-medical-record-interface-display-dna-digital-healthcare-network-connection-hologram-162019589.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrgF4b8DkghsDsdWgHByRnYb1bWZp015F1zw&s",
  ];

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden", // Ensures no part of the previous/next image is visible
        position: "relative", // Needed for dots to position correctly
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
                height: "300px", // Set height for images
                objectFit: "cover", // Ensures the image scales proportionally
                borderRadius: "10px", // Optional rounded corners
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ImageCarousel;
