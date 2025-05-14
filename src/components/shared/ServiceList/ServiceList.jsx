import { Box } from '@mui/material';
import ServiceCard from '../ServiceCard/ServiceCard';
import Grid from '@mui/material/Grid2';
const ServiceList = ({ serviceItem }) => {
  return (
    <Box sx={{ }}>
  <Grid
    container
    spacing={2}
    sx={{
      justifyContent: {
        xs: "center",
        sm: "flex-start",
        padding:"20px"
      },
      alignItems: "center",
    }}
  >
    {serviceItem.map((item) => (
      <Grid
        size={{xs:12,sm:6,md:4,lg:3}}
        key={item.id}
        sx={{
          display: "flex", // Ensures proper card centering within each Grid item
          justifyContent: "center", // Center horizontally within the grid
        }}
      >
        <ServiceCard item={item} />
      </Grid>
    ))}
  </Grid>
    </Box>

  );
};

export default ServiceList;
