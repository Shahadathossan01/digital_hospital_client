
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, CircularProgress, IconButton, Tooltip, Typography } from '@mui/material';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import AppointmentDetails from '../../../pages/AppointmentDetails/AppointDetails';
import { filterAppointments } from '../../../utils';

const columns = ["No","Docto Name","Created","Schedule Start","Status","Action"];

const TableRowAction=({item})=>{
    const { deletePatientAppointment } = useStoreActions((action) => action.patient);
    const { user } = useStoreState((state) => state.user);
    const [open, setOpen] = useState(false);
    const userID = user.id;
    const appointmentID = item._id;
    const doctorID = item?.doctor?._id;
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    return(
        <Box sx={{display:"flex",justifyContent:"space-between"}}>
            <Button
              onClick={handleClickOpen}
            disabled={item?.status === 'panding'}
              variant="contained"
              size="small"
              sx={{
                backgroundColor: item?.status === 'panding' ? 'error.main' : 'success.main',
              }}
            >
              view
            </Button>
            <Tooltip title="Delete Appointment">
              <IconButton
              disabled={(item?.status === 'panding') || (item.status="confirmed")}
                onClick={() =>
                  deletePatientAppointment({
                    patientID: userID,
                    appointmentID,
                    doctorID,
                  })
                }
                sx={{ color: 'error.main' }}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <AppointmentDetails isDoctor={user.role=='patient'?false:true} item={item} open={open} handleClose={handleClose} />
        </Box>
    )
}
const AppointmentTableRow=({item,index})=>{
    if(!item){
        return
    }
    return(
        <TableRow>
            <TableCell>{index+1}</TableCell>
            <TableCell>{item?.doctor?.firstName} {item?.doctor?.lastName}</TableCell>
            <TableCell>{format(new Date(item?.createdAt), "M/d/yyyy")}</TableCell>
            <TableCell>{format(new Date(item?.date),"M/d/yyyy")}  {item?.time}</TableCell>
            <TableCell>{item?.status}</TableCell>
            <TableCell>
                <TableRowAction item={item}></TableRowAction>
            </TableCell>
        </TableRow>
    )
}

const AppointmentTableBody=({filterValue})=>{
     const { user } = useStoreState((state) => state.user);
      const { getPatient } = useStoreActions((action) => action.patient);
      const { patient, delteState } = useStoreState((state) => state.patient);
      const { updatedData } = useStoreState((state) => state.testRecommendation);
      const { deletedMedicin } = useStoreState((state) => state.prescription);
      const userID = user?.id;
    
      useEffect(() => {
        if (userID) {
          getPatient(userID);
        }
      }, [getPatient, userID, delteState, updatedData, deletedMedicin]);

     if (!user || !patient) {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <CircularProgress />
          </Box>
        );
      }
      console.log(filterValue)
      const appointments=patient?.appointments
      const filterAppointment=filterAppointments(appointments,filterValue)
      console.log(filterAppointment)
      if(filterAppointment?.length==0){
        return (
          <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          No Data
        </Typography>
        )
      }

    return(
        <>
        <TableBody>
              {
                  filterAppointment?.map((item,index)=>(
                      <AppointmentTableRow key={item._id} item={item} index={index}></AppointmentTableRow>
                  ))
              }
          </TableBody>
        
        </>
    )
}

export default function AppointmentTable({filterValue}) {


  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 400}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <AppointmentTableBody filterValue={filterValue}></AppointmentTableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
