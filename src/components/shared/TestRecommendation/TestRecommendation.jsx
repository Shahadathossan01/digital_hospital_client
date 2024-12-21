import { Button, Typography, TextField, Box, Tooltip, IconButton } from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useForm } from "react-hook-form";
import DeleteIcon from '@mui/icons-material/Delete';

const TestRecommendation = ({ item, pdf ,isDoctor,index}) => {
  console.log(isDoctor)
    const { register, handleSubmit, reset } = useForm();
    const { uploadTestResult,deleteTest } = useStoreActions((action) => action.testRecommendation);
    const id = item._id;

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('image', data.image[0]);
        uploadTestResult({ id, formData });
        reset();
    };

    return (
        <>
        {
            isDoctor ?
            <Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
    padding: 2,
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    marginBottom: 2,
  }}
>
  <Typography variant="body1" sx={{ fontWeight: "bold", flex: 1 }}>
    {index + 1}. {item.testName}
  </Typography>
  <Tooltip title="Delete Appointment" arrow>
    <IconButton
      onClick={()=>deleteTest(id)}
      sx={{
        color: "error.main",
        border: "1px solid",
        borderColor: "error.main",
        "&:hover": {
          backgroundColor: "error.light",
        },
      }}
      aria-label="delete"
    >
      <DeleteIcon />
    </IconButton>
  </Tooltip>
</Box>

            :
        <Box style={{ marginBottom: '10px' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="body1">
                    {item.testName} 
                    {item.image && !pdf && <span style={{ color: 'green' }}>uploaded</span>}
                </Typography>
                {
                    !pdf && (
                        <Box>
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
                        </Box>
                    )
                }
            </form>
        </Box>

        }
        </>
    );
};

export default TestRecommendation;
