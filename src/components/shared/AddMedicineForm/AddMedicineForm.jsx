
import { useForm, Controller } from "react-hook-form";
import { Box, Button, TextField } from "@mui/material";
import { useStoreActions } from "easy-peasy";
import Grid from '@mui/material/Grid2';
const AddMedicineForm = ({prescriptionID}) => {
    const {createMedicine}=useStoreActions(action=>action.prescription)
    const { control, handleSubmit ,reset} = useForm({
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
           
        >
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2} justifyContent="center">
        <Grid size={{xs:12,sm:12,md:6,lg:4}} sx={{ display: "flex", justifyContent: "center" }}>
            <Controller
                name="medicinName"
                control={control}
                render={({ field }) => (
                    <TextField
                        required
                        {...field}
                        id="medicinName"
                        label="Medicine Name"
                        variant="outlined"
                        size="small"
                    />
                )}
            />
        </Grid>
        <Grid size={{xs:12,sm:12,md:6,lg:4}} sx={{ display: "flex", justifyContent: "center" }}>
            <Controller
                name="dosage"
                control={control}
                render={({ field }) => (
                    <TextField
                        required
                        {...field}
                        id="dosage"
                        label="Dosage - e.g. 50-mg"
                        variant="outlined"
                        size="small"
                    />
                )}
            />
        </Grid>
        <Grid size={{xs:12,sm:12,md:6,lg:4}} sx={{ display: "flex", justifyContent: "center" }}>
            <Controller
                name="frequency"
                control={control}
                render={({ field }) => (
                    <TextField
                        required
                        {...field}
                        id="frequency"
                        label="Frequency - e.g. (1-0-1)"
                        variant="outlined"
                        size="small"
                    />
                )}
            />
        </Grid>
        <Grid size={{xs:12,sm:12,md:6,lg:4}} sx={{ display: "flex", justifyContent: "center" }}>
            <Controller
                name="duration"
                control={control}
                render={({ field }) => (
                    <TextField
                        required
                        {...field}
                        id="duration"
                        label="Duration - e.g. (10 days or 2 months)"
                        variant="outlined"
                        size="small"
                    />
                )}
            />
        </Grid>
    </Grid>
            </Box>
            <Box sx={{textAlign:"center",marginTop:"20px"}}>
            <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="small"
                >
                    Add Medicine
                </Button>
            </Box>
            </form>
        </Box>
    );
};

export default AddMedicineForm;
