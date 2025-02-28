
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
                <Grid container spacing={2}>
                    <Grid size={{xs:12,sm:12,md:6}}>
                    <Controller
                    name="medicinName"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="medicinName"
                            label="Medicine Name"
                            variant="outlined"
                          
                            sx={{ marginBottom: 2 }}
                        />
                    )}
                />
                    </Grid>
                    <Grid size={{xs:12,sm:12,md:6}}>
                    <Controller
                    name="dosage"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="dosage"
                            label="Dosage - e.g. 50-mg"
                            variant="outlined"
                            
                            sx={{ marginBottom: 2 }}
                        />
                    )}
                />
                    </Grid>
                    <Grid size={{xs:12,sm:12,md:6}}>
                    <Controller
                    name="frequency"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="frequency"
                            label="Frequency -e.g. (1-0-1)"
                            variant="outlined"
                           
                            sx={{ marginBottom: 2 }}
                        />
                    )}
                />
                    </Grid>
                    <Grid size={{xs:12,sm:12,md:6}}>
                    <Controller
                    name="duration"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="duration"
                            label="Duration -e.g(10 days or 2 months)"
                            variant="outlined"
                            
                            sx={{ marginBottom: 2 }}
                        />
                    )}
                />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{textAlign:"center"}}>
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
            </Box>
            </form>
        </Box>
    );
};

export default AddMedicineForm;
