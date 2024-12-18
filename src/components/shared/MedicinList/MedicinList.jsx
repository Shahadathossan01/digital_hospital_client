import { useStoreActions } from "easy-peasy";
import { Button, Typography, Box } from "@mui/material";

const MedicinList = ({ item, number }) => {
    const { medicinDelete } = useStoreActions((action) => action.prescription);
    const id = item._id;
    const { medicinName, dosage, frequency, duration } = item;

    return (
        <Box sx={{ paddingLeft: '10px', display: 'flex', gap: '20px', marginBottom: '10px', alignItems: 'center' }}>
            <Typography variant="h6">{number}. {medicinName} {dosage} - {frequency} for {duration} month</Typography>
            <Button variant="contained" color="secondary" onClick={() => medicinDelete(id)} size="small">
                Delete
            </Button>
        </Box>
    );
};

export default MedicinList;
