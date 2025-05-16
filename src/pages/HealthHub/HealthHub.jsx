import { Box, Button, Card, CardContent, CardMedia, Chip, CircularProgress, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useStoreActions, useStoreState } from 'easy-peasy';
import{ useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { filterHealthHubByDivison, healthHubDivisionName } from '../../utils';


const BannerImage = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: '200px', sm: '300px', md: '350px', lg: '450px' },
        mt:3
      }}
    >
      <Box
        component="img"
        src="https://res.cloudinary.com/dcinvxm2u/image/upload/v1747399527/2_fybggc.jpg"
        alt="health_hub_banner"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'fit',
        }}
      />
    </Box>
  );
};


const InfoCard = ({ item }) => {
  const {
    category,
    country,
    description,
    district,
    division,
    facilities,
    pharmacyImage,
    pharmacyName,
    status,
    upazila,
    phone,
  } = item;

  const facilitiesArray = facilities.split(",").map((item) => item.trim());

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        flexWrap: "wrap",
        maxWidth: 1000,
        mx: "auto",
        my: 2,
        mb: 10,
      }}
    >
      {/* Image */}
      <CardMedia
  component="img"
  image={pharmacyImage}
  alt={pharmacyName}
  sx={{
    width: { xs: "100%", sm: 200 },
    height: { xs: "auto", sm: "auto" },
    objectFit: "cover",
  }}
/>


      {/* Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          p: 2,
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            <Typography component="div" variant="h6" fontWeight="bold">
              {pharmacyName}
            </Typography>
            <Typography
              variant="subtitle2"
              color="primary"
              sx={{ fontWeight: "medium" }}
            >
              *Partner
            </Typography>
          </Box>

          <Typography
            variant="subtitle2"
            color="text.secondary"
            mt={0.5}
          >
            Category: {category}
          </Typography>

          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {upazila} - {district} - {division}
          </Typography>

          <Typography variant="body2" color="text.secondary" mt={1}>
            {description}
          </Typography>

          {/* Facilities */}
          {facilitiesArray.length > 0 && (
            <Box mt={2}>
              <Typography
                variant="subtitle2"
                color="text.primary"
                gutterBottom
              >
                Facilities:
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                {facilitiesArray.map((item, index) => (
                  <Chip key={index} label={item} />
                ))}
              </Box>
            </Box>
          )}

          {/* Emergency Contact */}
          <Box mt={2}>
            <Typography variant="subtitle2" color="text.primary">
              Emergency Contact:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {phone}
            </Typography>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

const ListsOfHealthHub=({item})=>{
    return(
        <Box>
            <InfoCard item={item}></InfoCard>
        </Box>
    )
}
const HealthHub = () => {
    const {getAllHealthHub}=useStoreActions(actions=>actions.healthHub)
    const {allHealthHub,isLoading}=useStoreState(state=>state.healthHub)
    const [filterValue,setFilterValue]=useState('all')
    useEffect(()=>{
        getAllHealthHub()
    },[getAllHealthHub])


    const categoryDivision=healthHubDivisionName(allHealthHub)
    const filterdHealthHub=filterHealthHubByDivison(allHealthHub,filterValue)
    return (
      <>
  <BannerImage />

  {isLoading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    filterdHealthHub.length===0 ? (
      <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "50vh",
                textAlign: "center",
              }}
            >
              <Typography variant="h4" color="textSecondary">
                There are no health hubs available
              </Typography>
            </Box>
    ):
    (
      <Box sx={{ flexGrow: 1, mt: 12 }}>
      <Grid container spacing={2}>
        {/* Left Sidebar */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              position: 'sticky',
              top: 100,
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              p: 2,
              backgroundColor: '#f9f9f9',
              borderRadius: 2,
            }}
          >
            <Button
              onClick={() => setFilterValue('all')}
              variant={filterValue === 'all' ? 'contained' : 'outlined'}
            >
              All
            </Button>
            {categoryDivision.map((item, index) => (
              <Button
                key={index}
                onClick={() => setFilterValue(item)}
                variant={filterValue === item ? 'contained' : 'outlined'}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Grid>

        {/* Right Content */}
        <Grid item xs={12} md={9}>
            <Box
              sx={{
                maxHeight: 'calc(100vh - 150px)',
                overflowY: 'auto',
                pr: 2,
              }}
            >
              {filterdHealthHub.map((item) => (
                <ListsOfHealthHub key={item._id} item={item} />
              ))}
            </Box>
        </Grid>
      </Grid>
    </Box>
    )
  )}
</>

    );
};

export default HealthHub;