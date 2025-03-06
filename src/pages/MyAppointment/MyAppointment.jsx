import { Box, Button } from "@mui/material";
import { useState } from "react";
import AppointmentTable from "../../components/shared/AppointmentTable/AppointmentTable";

const FilterValue=({handleFilterValue,activeFilter })=>{
    return (
        <>
            <Box sx={{display:"flex",gap:"10px"}}>
                <Button onClick={()=>handleFilterValue("panding")} 
                variant={activeFilter === "panding" ? "contained" : "outlined"}
                color={activeFilter === "panding"? "secondary" : "inherit"}size="small">Pending</Button>

                <Button 
                variant={activeFilter === "confirmed" ? "contained" : "outlined"}
                color={activeFilter === "confirmed"? "info" : "inherit"}
                size="small" onClick={()=>handleFilterValue("confirmed")}>Accepted</Button>

                <Button 
                 variant={activeFilter === "completed" ? "contained" : "outlined"}
                 color={activeFilter === "completed"? "success" : "inherit"}
                onClick={()=>handleFilterValue("completed")} size="small">Completed</Button>

                <Button 
                variant={activeFilter === "cancelled" ? "contained" : "outlined"} 
                color={activeFilter === "cancelled"? "error" : "inherit"} onClick={()=>handleFilterValue("cancelled")}size="small">Cancelled</Button>
            </Box>
        </>
    )
}
const MyAppointments = () => {
    const [filterValue,setFilterValue]=useState('panding')
    const handleFilterValue=(data)=>{
        setFilterValue(data)
    }
    return (
        <Box>
            <FilterValue handleFilterValue={handleFilterValue}  activeFilter={filterValue}></FilterValue>
            <AppointmentTable filterValue={filterValue}></AppointmentTable>
        </Box>
    )
};

export default MyAppointments;
