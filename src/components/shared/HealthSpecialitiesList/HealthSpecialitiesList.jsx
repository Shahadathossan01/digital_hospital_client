import { Box, Button, Grid } from "@mui/material";
import SpecialitiesCard from "../ServiceList/SpecialitiesCard/SpecialitiesCard";



const HealthSpecialitiesList = () => {
    const doctors=[
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwhrDVk8HhQiusHNci8NZzfB0HbXJ-SInz1A&s", // Example image URL
            name: "Dr. John Doe",
            designation: "B.Sc & M.Sc in Cardiologist in London.Dhaka PG Hospial.",
            rating: 4.5,
            reviews: 120,
            categoryName: "Heart Specialist",
            fee: 50,
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwhrDVk8HhQiusHNci8NZzfB0HbXJ-SInz1A&s", // Example image URL
            name: "Dr. John Doe",
            designation: "B.Sc & M.Sc in Cardiologist in London.Dhaka PG Hospial.",
            rating: 4.5,
            reviews: 120,
            categoryName: "Heart Specialist",
            fee: 50,
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwhrDVk8HhQiusHNci8NZzfB0HbXJ-SInz1A&s", // Example image URL
            name: "Dr. John Doe",
            designation: "B.Sc & M.Sc in Cardiologist in London.Dhaka PG Hospial.",
            rating: 4.5,
            reviews: 120,
            categoryName: "Heart Specialist",
            fee: 50,
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwhrDVk8HhQiusHNci8NZzfB0HbXJ-SInz1A&s", // Example image URL
            name: "Dr. John Doe",
            designation: "B.Sc & M.Sc in Cardiologist in London.Dhaka PG Hospial.",
            rating: 4.5,
            reviews: 120,
            categoryName: "Heart Specialist",
            fee: 50,
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwhrDVk8HhQiusHNci8NZzfB0HbXJ-SInz1A&s", // Example image URL
            name: "Dr. John Doe",
            designation: "B.Sc & M.Sc in Cardiologist in London.Dhaka PG Hospial.",
            rating: 4.5,
            reviews: 120,
            categoryName: "Heart Specialist",
            fee: 50,
        },
        {
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwhrDVk8HhQiusHNci8NZzfB0HbXJ-SInz1A&s", // Example image URL
            name: "Dr. John Doe",
            designation: "B.Sc & M.Sc in Cardiologist in London.Dhaka PG Hospial.",
            rating: 4.5,
            reviews: 120,
            categoryName: "Heart Specialist",
            fee: 50,
        },
       
       
    ]
    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: {
            xs: "center", // Center horizontally on small screens
            sm: "flex-start", // Default alignment on larger screens
          },
          alignItems: "center", // Center vertically
        }}
      >
        {doctors.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={item.id}
            sx={{
              display: "flex", // Ensures proper card centering within each Grid item
              justifyContent: "center", // Center horizontally within the grid
            }}
          >
            <SpecialitiesCard item={item}></SpecialitiesCard>
          </Grid>
        ))}
      </Grid>
      <Box sx={{display:"flex",justifyContent:"center",marginTop:"20px"}}>
      <Button
          variant="contained"
          color="secondary"
          sx={{
            borderRadius: 2,
            paddingX: 4,
          }}
        >
          View All
        </Button>
      </Box>
    </Box>
    
      );
};

export default HealthSpecialitiesList;