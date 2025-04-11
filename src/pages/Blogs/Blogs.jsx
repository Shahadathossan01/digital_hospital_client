import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const BlogCard = ({ item }) => {
    return (
      <Card
        sx={{
          width: 300, // Set a fixed width
          height: 350, // Set a fixed height
          borderRadius: 2,
          boxShadow: 3,
          transition: "0.3s",
          "&:hover": { boxShadow: 6 },
        }}
      >
        <CardMedia
          component="img"
          image={item.image}
          alt="Specialist"
          sx={{
            width: "100%",
            height: 180, // Keep a fixed height
            objectFit: "cover",
          }}
        />
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {item.title}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Published: {item.publishedDate}
            </Typography>
            <Button>Details</Button>
          </Box>
        </CardContent>
      </Card>
    );
  };
  
const BlogList = () => {
   const blogs= [
        {
          "id": "blog-1",
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEePh6rZuIiL3TeXJXVzFfK6CGOkqaoHV1qQ&s",
          "title": "Effective Home Remedies for Common Colds",
          "publishedDate": "2025-01-15"
        },
        {
          "id": "blog-2",
          "image": "https://www.kimssunshine.co.in/wp-content/uploads/2024/06/How-to-Manage-High-Blood-Pressure-Naturally-1024x768.jpg",
          "title": "Managing High Blood Pressure Naturally",
          "publishedDate": "2025-01-18"
        },
        {
          "id": "blog-3",
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFVYBkzK8hCEdQF7pDSiebuuZkiTR43VrYlw&s",
          "title": "How to Improve Digestive Health with Diet",
          "publishedDate": "2025-01-20"
        },
        {
          "id": "blog-4",
          "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGDSZdi4UdqGjQN191ebyG2Jjzjcs_B-4D3A&s",
          "title": "The Best Exercises for Joint Pain Relief",
          "publishedDate": "2025-01-22"
        },
        {
          "id": "blog-5",
          "image": "https://www.rickysinghmd.com/wp-content/uploads/2020/03/Boost-your-Immune-System.png",
          "title": "Natural Ways to Boost Your Immune System",
          "publishedDate": "2025-01-25"
        }
      ]
      
      
      return (
        <Box sx={{ flexGrow: 1,marginTop:"10px"}}>
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
        {blogs.map((item) => (
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
            <BlogCard item={item}></BlogCard>
          </Grid>
        ))}
      </Grid>
    </Box>
    
      );
};
const Blogs = () => {
    return (
        <Box sx={{marginTop:{xs:"40px",sm:"40px",md:"60px",lg:"80px"}}}>
                    
                    <BlogList></BlogList>
                </Box>
    );
};

export default Blogs;