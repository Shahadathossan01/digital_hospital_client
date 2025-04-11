import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { Link } from "react-router-dom";
const BlogCard = ({ item }) => {
    if(!item) return null
    const id=item?._id
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
            <Link to={`/blogsDetails/${id}`}><Button>Details</Button></Link>
          </Box>
        </CardContent>
      </Card>
    );
  };
  
const BlogList = () => {
    const {getAllBlogs}=useStoreActions((actions)=>actions.blog)
    const {allBlogsData}=useStoreState(state=>state.blog)

    useEffect(()=>{
      getAllBlogs()
    },[getAllBlogs])
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
        {allBlogsData.map((item) => (
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