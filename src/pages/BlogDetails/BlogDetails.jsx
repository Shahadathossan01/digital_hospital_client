import { Box, Paper, Typography } from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid2';
const BlogDetails = () => {
    const {id}=useParams()
    const {getBlogsById}=useStoreActions(actions=>actions.blog)
    const {singleBlog}=useStoreState(state=>state.blog)

    useEffect(()=>{
        getBlogsById({id})
    },[getBlogsById,id])

    if(!singleBlog) return null
    return (
        <>
            <Box sx={{ flexGrow: 1, mt: 12, px: 2 }}>
                <Box elevation={3} sx={{ p: 3, borderRadius: 3 }}>
    <Grid container spacing={4} alignItems="center" justifyContent="center">
      {/* Left Side - Text */}
      <Grid item xs={12} sm={6}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
          {singleBlog?.title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {singleBlog?.subTitle}
        </Typography>
      </Grid>

      {/* Right Side - Image */}
      <Grid item xs={12} sm={6}>
        <Box
          component="img"
          src={singleBlog?.image}
          alt={singleBlog?.title}
          sx={{
            width: '100%',
            height: '300px',
            borderRadius: 2,
            boxShadow: 2,
          }}
        />
      </Grid>
    </Grid>
                </Box>
            </Box>

            <Box sx={{mt:12}}>
                <Typography variant="h4">{singleBlog?.header1}</Typography>
                <Typography>{singleBlog?.details1}</Typography>
            </Box>
            {
                singleBlog?.header2 && (
                <Box sx={{mt:12}}>
                    <Typography variant="h4">{singleBlog?.header2}</Typography>
                    <Typography>{singleBlog?.details2}</Typography>
                </Box>
                )
            }
            {
                singleBlog?.header3 && (
                <Box sx={{mt:12}}>
                    <Typography variant="h4">{singleBlog?.header3}</Typography>
                    <Typography>{singleBlog?.details3}</Typography>
                </Box>
                )
            }
        </>
    );
};

export default BlogDetails;