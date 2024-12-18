import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import MedicalRecordCard from "../../components/shared/MedicalRecordCard/MedicalRecordCard";
import { Typography, Container, Grid, Box } from "@mui/material";

const MedicalRecord = () => {
    const { getMedicalRecord } = useStoreActions(action => action.medicalRecord);
    const { data } = useStoreState(state => state.medicalRecord);
    const { user } = useStoreState(state => state.user);
    const userID = user?.id;
    const filteredData = data.filter(item => item.medicalRecord?.patient._id === userID);

    useEffect(() => {
        getMedicalRecord();
    }, [getMedicalRecord]);

    if (!user) return null;

    return (
        <Container>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginY: 2, color: '#3f51b5' }}>
                Your Medical Records
            </Typography>
            <Grid container spacing={3}>
                {
                    filteredData.map(item => (
                        <Grid item xs={12} sm={12} md={6} key={item._id}>
                            <Box display="flex" justifyContent="center" alignItems="center" height="100%" padding={2}>
                                <MedicalRecordCard item={item} />
                            </Box>
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    );
};

export default MedicalRecord;
