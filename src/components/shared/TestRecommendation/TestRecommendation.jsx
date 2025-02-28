import { Button, Typography, TextField, Box, Tooltip, IconButton, Chip } from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useForm } from "react-hook-form";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ResultModal from "../ResultModal/ResultModal";
import { useState } from "react";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
const TestRecommendation = ({ item, pdf ,isDoctor,index}) => {
    console.log(item)
    const { register, handleSubmit, reset } = useForm();
    const { uploadTestResult,deleteTest } = useStoreActions((action) => action.testRecommendation);
    const id = item._id;
     const [open, setOpen] = useState(false);
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('image', data.image[0]);
        uploadTestResult({ id, formData });
        reset();
    };

    return (
        <>
      
            <Box sx={{display:"flex",alignItems:"center",gap:"5px",flexWrap:"wrap"}}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {index + 1}. {item.testName}
              </Typography>
              <form style={{display:"flex",alignItems:"center"}} onSubmit={handleSubmit(onSubmit)}>
      
        <input required {...register('image')}
            type="file" 
            name="image" />
          <Button type="submit">
             Upload
          </Button>
    </form>
            {
                item?.image?(
                    <VisibilityIcon onClick={handleClickOpen}  color="success"></VisibilityIcon>
                ):(
                    <VisibilityOffIcon></VisibilityOffIcon>
                )
            }
              <HighlightOffIcon color="warning"  onClick={()=>deleteTest(id)} />
            </Box>
            <ResultModal open={open} handleClose={handleClose} image={item?.image} />
        </>
    );
};

export default TestRecommendation;
