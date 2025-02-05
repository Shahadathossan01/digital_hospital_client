import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import DoctorProfile from "../DoctorProfile/DoctorProfile";
import { format, isEqual, parseISO, set } from "date-fns";
import EditButton from "../../components/ui/EditButton/EditButton";
import SlotEditButton from "../../components/ui/SlotEditButton/SlotEditButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { createSchedule, getTotalDaysInMonth } from "../../utils";


const ScheduleTableRow=({day,doctorID,addNewSlot,deleteSlot})=>{
  if(!day) return null
  
  return (
    <TableRow>
                <TableCell>
                  <Typography>
                    {format(new Date(day?.date), 'dd-MM-yyyy')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{display:'flex',alignItems:'center'}}>
                  <Typography>{day.status}</Typography>
                  <EditButton scheduleID={day._id} doctorID={doctorID}></EditButton>
                  </Box>
                </TableCell>
                <TableCell>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Time</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                        <TableCell>
                          <Box sx={{display:'flex',justifyContent:'center'}}>
                            <strong>Action</strong>
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {day.slots.map((slot) => (
                        <TableRow key={slot._id.$oid}>
                          <TableCell>
                            <Typography>{slot.time}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography>{slot.status}</Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                            <SlotEditButton scheduleID={day._id} doctorID={doctorID} slotID={slot._id}></SlotEditButton>
                            <IconButton
                              onClick={()=>deleteSlot({doctorID,scheduleID:day._id,slotID:slot._id})}
                              aria-label="delete"
                              color="error"
                              size="small"
                              sx={{
                                "&:hover": {
                                  backgroundColor: "rgba(255, 0, 0, 0.1)",
                                },
                              }}
                              >
                                <DeleteIcon />
                            </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                      <Button onClick={()=>addNewSlot({doctorID,scheduleID:day._id})} variant="contained" size="small">Add new Slot</Button>
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
  )
}


const MySchedule = () => {
    const { user } = useStoreState((state) => state.user);
    const { getDoctorById,addNewSlot,deleteSlot,updateSchedule} = useStoreActions((action) => action.doctor);
    const { doctor ,updatedProfileData,imageData,statusData} = useStoreState((state) => state.doctor);
    const userID = user?.id;
    useEffect(() => {
        getDoctorById(userID);
    }, [userID, getDoctorById,updatedProfileData,imageData,statusData]);

    if (!doctor) return null;

    const doctorID=doctor?._id
    const scheduleDate=doctor?.schedule[0].date
    const localDate = new Date();
    const scheduleMonth = scheduleDate && format(parseISO(scheduleDate), "M")
    const localMonth=format(localDate,"M")
    // console.log("sc",scheduleMonth, "lo",localMonth)
    const areMonthsEqual=isEqual(scheduleMonth,localMonth)
    if(!areMonthsEqual){
      const date = new Date();
      const times=[]
      const totalMonthDays = getTotalDaysInMonth(date);
      const schedule = createSchedule(totalMonthDays, times);
      console.log(schedule)
      updateSchedule({doctorID,schedule})
    }
    
    return (
        <Box>
            <Box>
    <Typography sx={{textAlign:'center'}} variant="h4">Schedule</Typography>
    <Box
  sx={{
    textAlign: 'center',
    mb: 3,
    p: 2,
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    color: 'gray',
  }}
>
  <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>
    📅 Automatic Schedule Updates
  </Typography>
  <Typography variant="body2">
    This schedule will update automatically at the start of a new month. No action is required from your side.
  </Typography>
  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
    Once the schedule is created, you will be able to dynamically create your slots based on your availability.
  </Typography>
</Box>
    <Box sx={{overflowX: "auto" }}>
      <Box sx={{ margin: "20px" }}>
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell>
                 <Box sx={{display:'flex',gap:'10px',justifyContent:'center',alignItems:'center'}}>
                 <strong>Slots</strong>
                 </Box>
               </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctor?.schedule.map((day) => (
              <ScheduleTableRow key={day._id} day={day} doctorID={doctorID} addNewSlot={addNewSlot} deleteSlot={deleteSlot}></ScheduleTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </Box>
</Box>
            {/* <DoctorProfile></DoctorProfile> */}
        </Box>
    );
};

export default MySchedule;