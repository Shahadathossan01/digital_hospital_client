import { Box, Divider } from "@mui/material";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper
} from '@mui/material';
import { useStore, useStoreActions, useStoreState } from "easy-peasy";
import { useForm } from 'react-hook-form';
import {
    Card,
    CardContent,
    CardMedia,
    CardActions,
  } from '@mui/material';
import { useEffect, useState } from "react";
import OpenModal from "../../modal/OpenModal";

const BlogForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const {createBlogs}=useStoreActions(actions=>actions.blog)
  const onSubmit = async (data) => {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('subTitle', data.subTitle);
      formData.append('header1', data.header1);
      formData.append('details1', data.details1);
      formData.append('header2', data.header2 || '');
      formData.append('details2', data.details2 || '');
      formData.append('header3', data.header3 || '');
      formData.append('details3', data.details3 || '');
      formData.append('image', data.image[0]);
      createBlogs({formData})
      reset()
  };

  return (
    <Box elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        Create New Blog
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <Grid container spacing={2}>
          {[
            { name: 'title', label: 'Title', required: true },
            { name: 'subTitle', label: 'Sub Title', required: true },
            { name: 'header1', label: 'Header 1', required: true },
            { name: 'details1', label: 'Details 1', required: true, multiline: true },
            { name: 'header2', label: 'Header 2' },
            { name: 'details2', label: 'Details 2', multiline: true },
            { name: 'header3', label: 'Header 3' },
            { name: 'details3', label: 'Details 3', multiline: true }
          ].map(({ name, label, required, multiline }) => (
            <Grid item xs={6} sm={4} md={3} key={name}>
              <TextField
                label={label}
                fullWidth
                multiline={multiline || false}
                minRows={multiline ? 3 : undefined}
                {...register(name, required ? { required: `${label} is required` } : {})}
                error={!!errors[name]}
                helperText={errors[name]?.message}
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <input
              type="file"
              {...register('image', { required: 'Image is required' })}
              accept="image/*"
            />
            {errors.image && (
              <Typography variant="body2" color="error">
                {errors.image.message}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit Blog
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
const UpdateBlogForm = ({ id,handleClose }) => {
    const { register, handleSubmit, reset } = useForm();
    const { updateBlogs } = useStoreActions(actions => actions.blog);
  
    const onSubmit = async (data) => {
      const formData = new FormData();
  
      if (data.title) formData.append('title', data.title);
      if (data.subTitle) formData.append('subTitle', data.subTitle);
      if (data.header1) formData.append('header1', data.header1);
      if (data.details1) formData.append('details1', data.details1);
      if (data.header2) formData.append('header2', data.header2);
      if (data.details2) formData.append('details2', data.details2);
      if (data.header3) formData.append('header3', data.header3);
      if (data.details3) formData.append('details3', data.details3);
      if (data.image?.[0]) formData.append('image', data.image[0]);
  
      updateBlogs({ id, formData });
      reset();
      handleClose()
    };
  
    return (
      <Box elevation={3} sx={{ maxWidth: 800}}>
        <Typography variant="h5" gutterBottom>
          Update Blog
        </Typography>
  
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <Grid container spacing={2}>
            {[
              { name: 'title', label: 'Title' },
              { name: 'subTitle', label: 'Sub Title' },
              { name: 'header1', label: 'Header 1' },
              { name: 'details1', label: 'Details 1', multiline: true },
              { name: 'header2', label: 'Header 2' },
              { name: 'details2', label: 'Details 2', multiline: true },
              { name: 'header3', label: 'Header 3' },
              { name: 'details3', label: 'Details 3', multiline: true }
            ].map(({ name, label, multiline }) => (
              <Grid item xs={12} sm={6} md={4} key={name}>
                <TextField
                  label={label}
                  fullWidth
                  multiline={multiline || false}
                  minRows={multiline ? 3 : undefined}
                  {...register(name)}
                />
              </Grid>
            ))}
  
            <Grid item xs={12}>
              <input
                type="file"
                {...register('image')}
                accept="image/*"
              />
            </Grid>
  
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Update Blog
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    );
  };
  
  const BlogCard = ({ blog }) => {
    const {deleteBlogs}=useStoreActions((actions)=>actions.blog)
    const [open,setOpen]=useState(false)

    const handleOpen=()=>{
        setOpen(true)
    }
    const handleClose=()=>{
        setOpen(false)
    }
    return (
      <Card sx={{ maxWidth: 830, mx: 'auto', mb: 4, boxShadow: 3, p: 2 }}>
        <Grid container spacing={2}>
          {/* Left - Image */}
          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              image={blog.image}
              alt={blog.title}
              sx={{ width: '100%', height: '100%', borderRadius: 2, objectFit: 'cover' }}
            />
          </Grid>
  
          {/* Right - Action buttons */}
          <Grid item xs={12} md={8} display="flex" justifyContent="flex-end" alignItems="flex-start">
            <Box>
              <Button
                size="small"
                color="primary"
                variant="outlined"
                onClick={() => handleOpen()}
                sx={{ mr: 1 }}
              >
                Update
              </Button>
              <OpenModal open={open} handleClose={handleClose}>
                 <UpdateBlogForm handleClose={handleClose} id={blog._id}></UpdateBlogForm>
              </OpenModal>
              <Button
                size="small"
                color="error"
                variant="contained"
                onClick={() => deleteBlogs({id:blog._id})}
              >
                Delete
              </Button>
            </Box>
          </Grid>
        </Grid>
  
        {/* Content below the image + actions */}
        <Box mt={3}>
          <Typography variant="h5" gutterBottom>{blog.title}</Typography>
          <Typography variant="subtitle1" gutterBottom>{blog.subTitle}</Typography>
  
          <Typography variant="h6">{blog.header1}</Typography>
          <Typography variant="body2" paragraph>{blog.details1}</Typography>
  
          {blog.header2 && (
            <>
              <Typography variant="h6">{blog.header2}</Typography>
              <Typography variant="body2" paragraph>{blog.details2}</Typography>
            </>
          )}
  
          {blog.header3 && (
            <>
              <Typography variant="h6">{blog.header3}</Typography>
              <Typography variant="body2" paragraph>{blog.details3}</Typography>
            </>
          )}
        </Box>
      </Card>
    );
  };
  

const BlogList = () => {
    const {allBlogsData,createdBlog,deletedData,updatedData}=useStoreState((state)=>state.blog)
    const {getAllBlogs}=useStoreActions(actions=>actions.blog)

    useEffect(()=>{
        getAllBlogs()
    },[getAllBlogs,createdBlog,deletedData,updatedData])
  return (
    <Box>
      {allBlogsData.map((blog) => (
        <BlogCard
          key={blog._id}
          blog={blog}
        />
      ))}
    </Box>
  );
};
const AdminBlogs = () => {
    return (
        <>
            <Box>
                <BlogForm></BlogForm>
            </Box><Divider></Divider>
            <Box sx={{mt:5}}>
                <BlogList></BlogList>
            </Box>
        </>
    );
};

export default AdminBlogs;