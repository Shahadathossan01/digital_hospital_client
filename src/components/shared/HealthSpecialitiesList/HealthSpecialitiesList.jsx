import { Box, Button, Typography } from "@mui/material";
import SpecialitiesCard from "../ServiceList/SpecialitiesCard/SpecialitiesCard";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid2';


const HealthSpecialitiesList = ({home,filterDoctor}) => {
  if(filterDoctor.length==0){
    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Typography>There is no doctor available now.</Typography>
    </Box>
  }
    const cardItem=home?filterDoctor?.slice(0,24):filterDoctor
    return (
        <Box sx={{ flexGrow: 1 }}>
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
        {cardItem.map((item) => (
          <Grid
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
      {
        (home && filterDoctor.length!==0)&&
        <Box sx={{display:"flex",justifyContent:"center",marginTop:"20px"}}>
          <Link to="/findDoctors">
      <Button
          variant="contained"
          color="secondary"
          sx={{
            borderRadius: 2,
          }}
        >
          View All
        </Button>
      </Link>
      </Box>

      }
    </Box>
    
      );
};

export default HealthSpecialitiesList;