import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Margin, Padding } from '@mui/icons-material';

export default function ProfileAvatorCard({item}) {
     const { register, handleSubmit, reset } = useForm();
     const {updateDoctorImage}=useStoreActions(action=>action.doctor)
     const {updatePatientImage}=useStoreActions(action=>action.patient)
     const {user}=useStoreState(state=>state.user)
     const userID=item._id
    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('image', data.image[0]);
        {
          (user.role=='doctor') && updateDoctorImage({userID,formData})
        }
        {
          (user.role=='patient') && updatePatientImage({userID,formData})
        }
        reset()
    };
  return (
    <Card sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <CardMedia
  component="img"
  image={item?.profile}
  alt="No image uploaded"
  sx={{
    width: 120,
    height: 120,
    borderRadius: "50%",
    objectFit: "cover",
}}
/>
       <Box style={{ marginBottom: '10px',marginTop:"10px"}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField 
                                required
                                {...register('image', { required: 'Please choose a file' })}
                                type="file" 
                                name="image" 
                                
                          
                                fullWidth
                            />
                            <Box  sx={{display:"flex",justifyContent:"center",alignItems:"center",margin:1}}>
                            <Button type="submit" variant="contained" color="primary" size="small">
                                Upload New Photo
                            </Button>

                            </Box>
            </form>
        </Box>
    </Card>
  );
}
