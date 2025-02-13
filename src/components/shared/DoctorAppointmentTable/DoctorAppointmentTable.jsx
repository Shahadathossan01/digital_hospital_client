
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
import { filterAppointments, filterDoctorAppointments } from '../../../utils';
import { Dashboard } from '@mui/icons-material';

const columns = ["No","Docto Name","Created","Schedule Start","Status","Action"];

const TableRowAction=({item})=>{
    const { user } = useStoreState((state) => state.user);
    const [open, setOpen] = useState(false);
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
                backgroundColor: item?.status === 'panding' ? 'error.main' : 'info.main',
              }}
            >
              details
            </Button>
            {/* <Tooltip title="Delete Appointment">
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
            </Tooltip> */}
            <AppointmentDetails isDoctor={user.role=='patient'?false:true} item={item} open={open} handleClose={handleClose} />
        </Box>
    )
}
const AppointmentTableRow=({item,index,dashboard})=>{
  console.log(item)
    if(!item){
        return
    }
    return(
        <TableRow>
            <TableCell>{index+1}</TableCell>
            <TableCell>{item?.patientDetails.fullName}</TableCell>
            <TableCell>{format(new Date(item?.createdAt), "M/d/yyyy")}</TableCell>
            <TableCell>{format(new Date(item?.date),"M/d/yyyy")}  {item?.time}</TableCell>
            <TableCell sx={{
    color:
      item?.status === "completed"
        ? "success.main"
        : item?.status === "confirmed"
        ? "primary.main"
        : "error.main", // For "cancelled"
  fontWeight:"bold"}}>{item?.status=="confirmed"?"Accepted please wait.":item?.status}</TableCell>
            <TableCell>
                <TableRowAction item={item}></TableRowAction>
            </TableCell>
        </TableRow>
    )
}

const AppointmentTableBody=({dashboard,filteredDoctorAppointment})=>{
     

      if(filteredDoctorAppointment?.length==0){
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
                  filteredDoctorAppointment?.map((item,index)=>(
                      <AppointmentTableRow dashboard key={item._id} item={item} index={index}></AppointmentTableRow>
                  ))
              }
          </TableBody>
        
        </>
    )
}

export default function DoctorAppointmentTable({dashboard,appointments}) {


  const [filterValue,setFilterValue]=useState(dashboard?"today":"all")

     const handleFilterValue=(data)=>{
      setFilterValue(data)
     }
     const filteredDoctorAppointment=filterDoctorAppointments(appointments,filterValue)

  const columns = ["No","Patient Name","Created","Schedule Start","Status","Action"]

  return (
    <>
    {
      !dashboard &&
      <Box sx={{display:"flex",alignItems:"center",gap:1}}>
      <Typography>Filter By:</Typography>
      <form>
         <select onChange={(e)=>{handleFilterValue(e.target.value)}}>
           <option value="all">All</option>
           {/* <option value="panding">Panding</option> */}
           <option value="confirmed">Accepted</option>
           <option value="completed">Completed</option>
           <option value="cancelled">Cancelled</option>
         </select>
      </form>
    </Box>
    }
    
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
          <AppointmentTableBody filteredDoctorAppointment={filteredDoctorAppointment} dashboard={dashboard}></AppointmentTableBody>
        </Table>
      </TableContainer>
    </Box>
    </>
  );
}
