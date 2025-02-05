import { Outlet, Link } from "react-router-dom";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useState } from "react";

const SideBarItem=()=>{
    const [itemText,setItemText]=useState("myProfile")
    return (
        <Box p={2}>
                <List sx={{
                display: "flex",
                gap:"20px",
                flexDirection: { xs: "column", sm: "row", md: "column" },
                borderRadius: 2,
                p: 2,
            }}>
                    <ListItem onClick={()=>setItemText("myProfile")} sx={{borderRadius:"10px",bgcolor: itemText === "myProfile" ? "white" : "rgba(160, 158, 158, 0.1)",padding:"0px 10px",boxShadow: "3px 10px 20px rgba(0, 0, 0, 0.1)"}} button component={Link} to="/PatientProfile">
                        <ListItemText sx={{textAlign:"center"}} primary="My Profile" />
                    </ListItem>
                    <ListItem onClick={()=>setItemText("appointments")} sx={{borderRadius:"10px",bgcolor: itemText === "appointments" ? "white" : "rgba(160, 158, 158, 0.1)",padding:"0px 10px",boxShadow: "3px 5px 20px rgba(0, 0, 0, 0.1)"}} button component={Link} to="/PatientProfile/appointments">
                        <ListItemText sx={{textAlign:"center"}} primary="Appointments" />
                    </ListItem>
                </List>
            </Box>
    )
}


const PatientLayout = () => {
    return (
        <>
        <Box sx={{paddingTop:"40px",marginBottom:"10px"}} flexGrow={1}>
            <Grid container spacing={2}>
                <Grid size={{xs:12,sm:12,md:4}}>
                    <Box>
                    <SideBarItem></SideBarItem>
                    </Box>
                </Grid>
                <Grid size={{xs:12,sm:12,md:8}} sx={{bgcolor:"white"}}>
            <Box  px={3} sx={{marginTop:{xs:"-10px",sm:"-10px",md:0},padding:2, borderRadius: 2,
                p: 2,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",height:"500px"}}>
                <Outlet /> {/* Will display nested components */}
            </Box>
                </Grid>
            </Grid>
        </Box>
        </>
    );
};

export default PatientLayout;
