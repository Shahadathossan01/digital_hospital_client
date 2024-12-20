import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";

const AddMedicineForm = () => {
    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            medicineName: "",
            dosage: "",
            frequency: "",
            duration: ""
        }
    });

    const onSubmit = (data) => {
        console.log("Form Data Submitted:", data);
        // Handle form submission logic here
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
                    name="medicineName"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="medicineName"
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
                            label="Dosage"
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
                            label="Frequency"
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
                            label="Duration (months)"
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
