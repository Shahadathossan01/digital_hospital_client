import { Button, Typography, TextField, Box, Tooltip, IconButton, Chip } from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useForm } from "react-hook-form";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TestRecommendation = ({ item, pdf ,isDoctor,index}) => {
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
            <Box display="flex" alignItems="center" mb={1}>
      <Typography variant="h6" sx={{ mr: 1 }}>
       {index+1} {'.'} {item.testName}
      </Typography>
      {item.image && !pdf && (
        <Chip
          label="Uploaded"
          color="success"
          size="small"
          icon={<CheckCircleIcon />}
          sx={{
            height: 24,
            fontSize: '0.75rem',
            fontWeight: 'bold',
          }}
        />
      )}
    </Box>
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
