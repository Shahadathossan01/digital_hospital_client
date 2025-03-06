
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
import { filterAppointments, filterDoctorAppointments } from '../../../utils';
import { Dashboard } from '@mui/icons-material';

const columns = ["No","Docto Name","Created","Schedule Start","Status","Action"];
import VideoChatIcon from '@mui/icons-material/VideoChat';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import BeenhereIcon from '@mui/icons-material/Beenhere';
const TableRowAction=({item})=>{
    const {updateStatus}=useStoreActions(actions=>actions.appointment)
    
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
      const id=item?._id
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
            <Box sx={{display:"flex",gap:"20px"}}>
              {
                (today && item?.status !== "completed" && item?.status !== "cancelled")?(
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
            
              <Tooltip 
  title={item?.status === "completed" ? "completed" : item?.status === "cancelled"?"cancelled":upcomming?"upcomming":"To make complete!"}
  placement="top"
  componentsProps={{
    tooltip: {
      sx: {
        backgroundColor:item?.status === "completed" ? "green" : item?.status === "cancelled"?"red":upcomming?"blue":"green",
        color: "white",
        fontSize: "14px",
      },
    },
  }}
>
  <IconButton onClick={()=>updateStatus({id})}>
    <BeenhereIcon 
      onClick={item?.status == "confirmed" ? () => console.log("clicked") : undefined} 
      sx={{ 
        cursor: item?.status === "completed" || item?.status === "cancelled" || upcomming ? "not-allowed" : "pointer",
        opacity: item?.status === "completed" || item?.status ==="cancelled" || upcomming ? 0.5 : 1,
      }} 
      fontSize="large" 
      color={item?.status === "completed" ? "success" : item?.status ==="cancelled"?"error":"primary"}
    />
  </IconButton>
  
</Tooltip>

              
            </Box>
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
            {
              open && (
                <AppointmentDetails  isDoctor={user.role=='patient'?false:true} item={selectedItem} open={open} handleClose={handleClose} />

              )
            }
           
        </Box>
    )
}
const AppointmentTableRow=({item,index,dashboard})=>{
    if(!item){
        return
    }
    const upcomming=isAfter(parseISO(item.date),new Date)
    const today=isToday(parseISO(item.date),new Date)
    const over=!today && isBefore(parseISO(item.date),new Date)
    const getColor = () => {
      if (item?.status === "completed") return "success.main";
      if (item?.status === "confirmed") {
        if (upcomming) return "info.main";
        if (today) return "secondary.main";
        if (over) return "warning.main";
      }
      if (item?.status === "cancelled") return "error.main";
      return ""; // Default color if no condition is met
    };
    return(
        <TableRow>
            <TableCell>{index+1}</TableCell>
            <TableCell>{item?.patientDetails.fullName}</TableCell>
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
    </TableCell>
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
