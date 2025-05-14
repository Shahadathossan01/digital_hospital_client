import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardMedia,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useStoreActions, useStoreState } from 'easy-peasy';

export default function ProfileAvatorCard({ item }) {
  const { register, handleSubmit, reset, watch } = useForm();
  const { updateDoctorImage } = useStoreActions(action => action.doctor);
  const { updatePatientImage } = useStoreActions(action => action.patient);
  const { user } = useStoreState(state => state.user);

  const [previewImage, setPreviewImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);

  const userID = item._id;

  // Set initial image from DB
  useEffect(() => {
    const imageFromDB = user.role === "doctor" ? item?.profile : item?.image;
    setCurrentImage(imageFromDB);
  }, [item, user.role]);

  // Watch selected file for preview
  const selectedFile = watch('image');

  useEffect(() => {
    if (selectedFile && selectedFile[0]) {
      const file = selectedFile[0];
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);

      // Clean up preview URL on component unmount or new image
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [selectedFile]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('image', data.image[0]);

    try {
      if (user.role === 'doctor') {
        await updateDoctorImage({ userID, formData });
      } else if (user.role === 'patient') {
        await updatePatientImage({ userID, formData });
      }

      // After successful upload, replace preview with DB image (or re-fetch)
      setPreviewImage(null);

      // Simulate new DB image (you might want to re-fetch from server instead)
      setCurrentImage(URL.createObjectURL(data.image[0]));

      reset();
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardMedia
        component="img"
        image={previewImage || currentImage || "/default-avatar.png"}
        alt="Profile image"
        sx={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          objectFit: "cover",
          marginTop: 2,
        }}
      />
      <Box style={{ marginBottom: '10px', marginTop: '10px' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            required
            {...register('image', { required: 'Please choose a file' })}
            type="file"
            name="image"
            fullWidth
            inputProps={{ accept: "image/*" }}
          />
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", margin: 1 }}>
            <Button type="submit" variant="contained" color="primary" size="small">
              Upload New Photo
            </Button>
          </Box>
        </form>
      </Box>
    </Card>
  );
}
