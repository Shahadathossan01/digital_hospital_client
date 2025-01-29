
import { Card, CardContent, Typography, Button, CardMedia, Box } from "@mui/material";

const HealthConcernCard = ({item}) => {
  return (
    <Card
      sx={{
        width:"250px",
        margin: "auto",
        textAlign: "center",
        borderRadius: 3,
        boxShadow: 3,
        padding: 2,
      }}
    >
      {/* Image */}
      <CardMedia
        component="img"
        image={item.image} // Replace with your image URL
        alt="Health Concern"
        sx={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          margin: "0 auto",
          objectFit: "cover",
        }}
      />

      {/* Title */}
      <CardContent>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", marginBottom: 2 }}
        >
          {item.name}
        </Typography>

        {/* Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{
            borderRadius: 2,
            paddingX: 4,
          }}
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default HealthConcernCard;
