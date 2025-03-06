
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, CircularProgress, IconButton, Tooltip, Typography } from '@mui/material';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { format, isAfter, isBefore, isToday, parseISO } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import AppointmentDetails from '../../../pages/AppointmentDetails/AppointDetails';
import { filterAppointments } from '../../../utils';
import { InsertEmoticon } from '@mui/icons-material';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
const columns = ["No","Docto Name","Created","Schedule Start","Status","Action"];

const TableRowAction=({item})=>{
    const { deletePatientAppointment } = useStoreActions((action) => action.patient);
    const { user } = useStoreState((state) => state.user);
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
      const handleClickOpen = (item) => {
        setSelectedItem(item)
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
        setSelectedItem(null)
      };
        if(!item) return null
        const today=isToday(parseISO(item?.date),new Date)
          const upcomming=isAfter(parseISO(item?.date),new Date)
    return(
        <Box sx={{display:"flex",justifyContent:"space-between"}}>
            <Button
              onClick={()=>handleClickOpen(item)}
            disabled={(item?.status === 'panding') || item?.status=="cancelled" || upcomming}
              variant="contained"
              size="small"
              sx={{
                backgroundColor: item?.status === 'panding' ? 'error.main' : 'info.main',
              }}
            >
              prescription
            </Button>
            <Box>
              {
                              (today && item?.status !== "completed" && item?.status !== "cancelled" && item?.status !== "panding")?(
                                <IconButton 
                  component="a" 
                  href={item.googleMeetLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  color="secondary"
                >
                  <VideoChatIcon fontSize="large" />
                </IconButton>
                                
                              ):(
                                <IconButton>
                                  <VideocamOffIcon fontSize='large'></VideocamOffIcon>
                                </IconButton>
                              )
                            }
            </Box>
            {/* <Tooltip title="Delete Appointment">
              <IconButton
              // disabled={(item?.status === 'panding') || (item.status="confirmed")}
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
            </Tooltip> */}
            {
              open && (
                <AppointmentDetails isDoctor={user.role=='patient'?false:true} item={selectedItem} open={open} handleClose={handleClose} />
              )
            }
        </Box>
    )
}
const AppointmentTableRow=({item,index})=>{
   if(!item){
          return
      }
      const upcomming=isAfter(parseISO(item?.date),new Date)
      const today=isToday(parseISO(item?.date),new Date)
      const over=!today && isBefore(parseISO(item?.date),new Date)
      const getColor = () => {
        if (item?.status === "completed") return "success.main";
        if (item?.status === "confirmed") {
          if (upcomming) return "info.main";
          if (today) return "primary.main";
          if (over) return "warning.main";
        }
        if (item?.status === "cancelled") return "error.main";
        if (item?.status === "panding") return "secondary.main";
        return ""; // Default color if no condition is met
      };
  return(
    <TableRow key={item._id}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{item?.doctor?.firstName ||"N/A"} {item?.doctor?.lastName}</TableCell>
                    <TableCell>{format(new Date(item?.createdAt), "M/d/yyyy")}</TableCell>
                    <TableCell>{format(new Date(item?.date),"M/d/yyyy")}  {item?.time}</TableCell>
                    <TableCell sx={{
          color: getColor(),
          fontWeight: "bold",
        }}>
          {(item?.status === "confirmed" && upcomming) && "upcomming"}
    {(item?.status === "confirmed" && today) && "today"} 
    {(item?.status === "confirmed" && over) && "time up!"} 
    {item?.status === "completed" && "completed"} 
    {item?.status === "cancelled" && "cancelled"}
    {item?.status === "panding" && "panding"}
        </TableCell>
                    <TableCell>
                        <TableRowAction item={item}></TableRowAction>
                    </TableCell>
                </TableRow>
  )
}

const AppointmentTableBody=({filterValue})=>{
      const { getPatient } = useStoreActions((action) => action.patient);
      const { patient, delteState } = useStoreState((state) => state.patient);
      const { updatedData } = useStoreState((state) => state.testRecommendation);
      const { deletedMedicin } = useStoreState((state) => state.prescription);
      const user=localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null
      const userID = user?._id;
      useEffect(() => {
          getPatient(userID);
        
      }, [getPatient, userID, delteState, updatedData, deletedMedicin]);
     if (!patient) {
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
      const appointments=patient?.appointments
      const filterAppointment = [...appointments].filter((item) => item.status === filterValue);
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
                    <AppointmentTableRow key={item?._id} item={item} index={index}></AppointmentTableRow>
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
