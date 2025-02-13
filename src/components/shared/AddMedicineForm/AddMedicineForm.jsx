import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useStoreActions } from "easy-peasy";

const AddMedicineForm = ({prescriptionID}) => {
    const {createMedicine}=useStoreActions(action=>action.prescription)
    const { control, handleSubmit, setValue ,reset} = useForm({
        defaultValues: {
            medicinName: "",
            dosage: "",
            frequency: "",
            duration: ""
        }
    });

    const onSubmit = (data) => {
        createMedicine({data,prescriptionID})
        reset()
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                padding: 3,
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                maxWidth: 400,
                margin: "0 auto",
                paddingBottom: 3
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                Add Medicine Instructions
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                <Controller
                    name="medicinName"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="medicinName"
                            label="Medicine Name"
                            variant="outlined"
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                    )}
                />
                <Controller
                    name="dosage"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="dosage"
                            label="Dosage - e.g. 50-mg"
                            variant="outlined"
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                    )}
                />
                <Controller
                    name="frequency"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="frequency"
                            label="Frequency -e.g. (1-0-1)"
                            variant="outlined"
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                    )}
                />
                <Controller
                    name="duration"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="duration"
                            label="Duration -e.g(10 days or 2 months)"
                            variant="outlined"
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                    )}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                        padding: "10px 0",
                        fontWeight: "bold",
                    }}
                >
                    Add Medicine
                </Button>
            </form>
        </Box>
    );
};

export default AddMedicineForm;
