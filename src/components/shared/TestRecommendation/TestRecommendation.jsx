import { Button, Typography, TextField } from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const TestRecommendation = ({ item, pdf }) => {
    const { register, handleSubmit, reset } = useForm();
    const { uploadTestResult } = useStoreActions((action) => action.testRecommendation);
    const id = item._id;

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('image', data.image[0]);
        uploadTestResult({ id, formData });
        reset();
    };

    return (
        <div style={{ marginBottom: '10px' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="body1">
                    {item.testName} 
                    {item.image && !pdf && <span style={{ color: 'green' }}>uploaded</span>}
                </Typography>
                {
                    !pdf && (
                        <div>
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
                        </div>
                    )
                }
            </form>
        </div>
    );
};

export default TestRecommendation;
