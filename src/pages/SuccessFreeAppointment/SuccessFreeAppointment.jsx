import { Box, Button, Paper, Typography, useMediaQuery } from '@mui/material';
import { format } from 'date-fns';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';
import { useTheme } from 'styled-components';

const SuccessFreeAppointment = () => {
    const { freeAppointmentId } = useParams();
    console.log(freeAppointmentId)
     const { getAppointments } = useStoreActions((actions) => actions.appointment);
      const { appointments } = useStoreState((state) => state.appointment);
    
      useEffect(() => {
        getAppointments();
      }, [getAppointments]);
    
     if(!appointments) return null
     const filteredAppointment=appointments.reduce((acc,cur)=>{
        if(cur._id==freeAppointmentId){
            acc={
                ...cur
            }
        }

        return acc;
     },{})
     if(!filteredAppointment) return null
      return (
        <>
            <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            px: 2,
          }}
        >
          <Paper
            elevation={4}
            sx={{
              maxWidth: "500px",
              width: "100%",
              textAlign: "center",
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 2}}
            >
              {filteredAppointment?"🎉 Free Appointment Confirmed!":"Network Error!! Please try again.."}
            </Typography>
    
            {filteredAppointment ? (
              <>
                <Typography variant="body1"><strong>Applyed Date:</strong> {filteredAppointment?.createdAt?(format(new Date(filteredAppointment?.createdAt), "M/d/yyyy")):("N/A")}</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Doctor Name:</strong> {filteredAppointment?.doctor?.title}{" "}
                  {filteredAppointment?.doctor?.firstName}{" "}
                  {filteredAppointment?.doctor?.lastName}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Schedule Date:</strong>
                  {filteredAppointment?.date?(format(new Date(filteredAppointment?.date), "M/d/yyyy")):"N/A"}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Schedule Slot:</strong> {filteredAppointment?.time}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Total Fee:</strong> ${filteredAppointment?.totalFee}
                </Typography>
              </>
            ) : (
              <Typography variant="body1" color="error.main">
                No appointment found for this Transaction ID.
              </Typography>
            )}
    
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/"
              sx={{
                mt: 3,
                textTransform: "none",
                px: 3,
                py: 1.5,
                width: "100%",
              }}
            >
              Go to Home Page
            </Button>
          </Paper>
        </Box>
        </>
      );
};

export default SuccessFreeAppointment;