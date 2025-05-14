import { Box, Button, Card, CardContent, CardMedia, Chip, CircularProgress, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useStoreActions, useStoreState } from 'easy-peasy';
import{ useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { filterHealthHubByDivison, healthHubDivisionName } from '../../utils';

const InfoCard = ({item}) => {
    const {category,country,description,district,division,facilities,pharmacyImage,pharmacyName,status,upazila,phone}=item
    const facilitiesArray = facilities.split(',').map(item => item.trim());
    return (
      <Card sx={{ display: 'flex',flexWrap:'wrap', maxWidth: 1000, mx: 'auto', my: 2 ,mb:10}}>
        {/* Image */}
        <CardMedia
          component="img"
          sx={{ width: {xs:'100%',sm:300} }}
          image={pharmacyImage}
          alt={name}
        />
  
        {/* Content */}
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Box sx={{display:'flex',justifyContent:'space-between'}}>
                <Typography component="div" variant="h5" fontWeight="bold">
                  {pharmacyName}
                </Typography>
                <Typography variant="subtitle1" color="primary" component="div">
                *Partner
                </Typography>
            </Box>
            <Typography variant="subtitle1" color="info" component="div">
                Category: {category}
                </Typography>
            <Typography variant="body1" color="text.secondary" component="div">
               {upazila}-{district}-{division}
            </Typography>
  
            <Typography variant="body2" color="text.secondary" mt={1}>
              {description}
            </Typography>
  
  
            {facilitiesArray.length > 0 && (
              <Box mt={2}>
                <Typography variant="subtitle2" color="text.primary">
                  Facilities:
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                    {facilitiesArray.map((item, index) => (
                      <Chip key={index} label={item} /> 
                    ))}
                </Box>
              </Box>
            )}

            <Box>
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

    if (isLoading) {
        return (
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
        );
      }
      
      if (allHealthHub.length === 0) {
        return (
          <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
            textAlign: "center"
          }}
          >
            <Typography variant="h4" color="textSecondary">
              There is no health hub are available
            </Typography>
          </Box>
        );
      }

    const categoryDivision=healthHubDivisionName(allHealthHub)
    const filterdHealthHub=filterHealthHubByDivison(allHealthHub,filterValue)
    return (
      <Box sx={{ flexGrow: 1, mt: 12 }}>
      <Grid container spacing={2}>
        {/* Left Sidebar */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              position: 'sticky',
              top: 100, // adjust based on your header height
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              p: 2,
              backgroundColor: '#f9f9f9',
              borderRadius: 2,
            }}
          >
            <Button onClick={()=>setFilterValue('all')} variant={filterValue === 'all' ? 'contained' : 'outlined'}>All</Button>
            {
              categoryDivision.map((item,index)=>(
                <Button onClick={()=>setFilterValue(item)} key={index} variant={filterValue === item ? 'contained' : 'outlined'}>{item}</Button>
              ))
            }
            
          </Box>
        </Grid>
  
        {/* Right Scrollable Content */}
        <Grid item xs={12} md={9}>
          <Box
            sx={{
              maxHeight: 'calc(100vh - 150px)', // adjust if needed
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
    );
};

export default HealthHub;