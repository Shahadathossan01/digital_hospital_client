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
    };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image={item?.image}
        alt="No image uploaded"
      />
       <Box style={{ marginBottom: '10px' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                            <TextField 
                                {...register('image', { required: 'Please choose a file' })}
                                type="file" 
                                name="image" 
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                            <Button type="submit" variant="contained" color="primary" size="small">
                                Upload
                            </Button>
                            <hr />
            </form>
        </Box>
    </Card>
  );
}
