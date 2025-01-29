import { Grid, Box } from '@mui/material';
import ServiceCard from '../ServiceCard/ServiceCard';

const ServiceList = ({ serviceItem }) => {
  return (
    <Box sx={{ }}>
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
    {serviceItem.map((item) => (
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
        <ServiceCard item={item} />
      </Grid>
    ))}
  </Grid>
</Box>

  );
};

export default ServiceList;
