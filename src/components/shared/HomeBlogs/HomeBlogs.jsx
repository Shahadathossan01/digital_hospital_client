import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";

const Header = () => {
    return (
      <Box sx={{ textAlign: 'center', marginBottom: 3 ,marginTop:3}}>
        <Typography 
          variant="h7" 
          sx={{ 
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }, 
            fontWeight: 'bold', 
            color: 'primary.main',
          }}
        >
          Blogs and Articles for You (10)
        </Typography>
      </Box>
    );
  };
  const BlogCard = ({item}) => {
    return (
        <Card sx={{ borderRadius: 2, boxShadow: 3, transition: "0.3s", "&:hover": { boxShadow: 6} }}>
        <CardMedia
                component="img"
                image={item.image} // Replace with the image URL
                alt="Specialist"
                sx={{
                  width: "100%",
                  height: 200,
                  minWidth:"500px",
                  margin: "0 auto",
                  objectFit: "cover",
                  marginTop: -4, // Adjust the image to make it more prominent
                }}
              />
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Published: {item.publishedDate}
          </Typography>
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
        <Box sx={{ flexGrow: 1,marginTop:"50px"}}>
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


const HomeBlogs = () => {
    return (
        <Box sx={{marginTop:"70px"}}>
            <Header></Header>
            <BlogList></BlogList>
        </Box>
    );
};

export default HomeBlogs;