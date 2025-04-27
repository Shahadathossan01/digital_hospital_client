import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { Box, Divider, IconButton, List, ListItem, ListItemText } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from "react";

import { Card, CardContent, Typography, Avatar } from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
import { getUpcommingAppointments } from "../utils";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ShieldIcon from '@mui/icons-material/Shield';

const HeaderCard = ({ logo, number, title, subtitle }) => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        padding:"15px 5px",
        borderRadius: 2,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        height:"60px"
      }}
    >
      {/* Left Side - Logo */}
      <Avatar
        src={logo}
        alt={title}
        sx={{
          width: 50,
          height: 50,
          mr: 2, // Add margin between logo and text
        }}
      />

      {/* Right Side - Number, Title, Subtitle */}
      <CardContent sx={{ flex: 1, padding: "15px 0" }}>
        <Typography color="red" variant="h6" fontWeight="bold">
          {number}
        </Typography>
        <Typography variant="subtitle2" color="black">
          {title}
        </Typography>
        <Typography variant="caption" color="green">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Header=()=>{
    const {getDoctorById}=useStoreActions(action=>action.doctor)
    const {doctor}=useStoreState(state=>state.doctor)
    const {user}=useStoreState(state=>state.user)
    const {updatedData}=useStoreState(state=>state.appointment)
    const {deleteData}=useStoreState(state=>state.applyedAppointment)
    const {createPresData}=useStoreState(state=>state.prescription)
    const userID=user?._id
    useEffect(()=>{
        getDoctorById(userID)
    },[getDoctorById,userID,updatedData,deleteData,createPresData])

    if(!doctor){
       return null
    }

    const totalRequested=doctor.applyForAppointments.length
    const appointments=doctor?.appointments
    const upcommingAppointments=getUpcommingAppointments(appointments)
    const completedAppointment=doctor.appointments.filter(item=>item.status=="completed")
    const cancelledAppointment=doctor.appointments.filter(item=>item.status=="cancelled")

    return(
        <Box flexGrow={1}>
            <Grid container spacing={1}>
                <Grid size={{xs:12,sm:6,md:3}}>
                    <HeaderCard number={totalRequested} title={"Requested"} subtitle={"appointments"} />
                </Grid>
                <Grid size={{xs:12,sm:6,md:3}}>
                    <HeaderCard number={upcommingAppointments?.length} title={"Upcomming"} subtitle={"appointments"} />
                </Grid>
                <Grid size={{xs:12,sm:6,md:3}}>
                    <HeaderCard number={completedAppointment.length} title={"Completed"} subtitle={"appointments"} />
                </Grid>
                <Grid size={{xs:12,sm:6,md:3}}>
                    <HeaderCard number={cancelledAppointment.length} title={"Cancelled"} subtitle={"appointments"} />
                </Grid>
            </Grid>
        </Box>
    )
}
const SideBarItem = () => {
    const navigate=useNavigate()
    const { logoutUser } = useStoreActions(action => action.user);
    const location = useLocation(); // Get the current path
    const token = localStorage.getItem("token")?localStorage.getItem("token"):null;
    return (
      <Box p={2}>
        <List sx={{ display: "flex", flexDirection: "column", gap: "20px", borderRadius: 2, width: "100%" }}>
          
          {/** Sidebar Items */}
          {[
            { text: "Dashboard", path: "/" },
            { text: "Appointments", path: "/doctorAppointments" },
            { text: "My Schedule", path: "/mySchedule" },
            { text: "Profile", path: "/profile" },
            { text: "Change Password", path: "/changePassword" },
            { text: "Create New Account", path: "/createNewAccount" },
          ].map(({ text, path }) => (
            <ListItem
              key={text}
              component={Link}
              to={path}
              sx={{
                borderRadius: "10px",
                bgcolor: location.pathname === path ? "green" : "rgba(160, 158, 158, 0.1)",
                color: location.pathname === path ? "white" : "black",
                padding: "0px 10px",
                boxShadow: "3px 5px 20px rgba(131, 76, 4, 0.65)",
              }}
            >
              <ListItemText sx={{ textAlign: "center" }} primary={text} />
            </ListItem>
          ))}
  
          <Divider />
  
          {/** Logout Button */}
          <ListItem
            component="button"
            onClick={() => {
              logoutUser({token})
              navigate("/")
            }}
            sx={{
              border:"none",
              borderRadius: "10px",
              bgcolor: "rgba(202, 34, 4, 0.86)",
              color:  "white",
              padding: "0px 10px",
              boxShadow: "3px 5px 20px rgba(131, 76, 4, 0.65)",
            }}
            
          >
            <ListItemText sx={{ textAlign: "center" }} primary="Logout" />
          </ListItem>
  
        </List>
      </Box>
    );
  };
const DoctorLayout = () => {
        const {getDoctorById}=useStoreActions(action=>action.doctor)
        const {doctor}=useStoreState(state=>state.doctor)
        const {user}=useStoreState(state=>state.user)

        const userID=user?._id
        useEffect(()=>{
          getDoctorById(userID)
        },[getDoctorById,userID])
        
        if(!doctor){
          return null
        }
    return (
        <>
        <Box  sx={{fontWeight:"bold",textAlign:"center",bgcolor:"green",color:"white",p:1}}>
          <Typography><span style={{color:"yellow"}}>Hello,</span> {user?.username} [<span style={{color:"#ffca28",fontWeight:"bold"}}>{user?.role=="doctor"?"Doctor":"Admin"}</span>]
          <span>
            {
              doctor?.isValid?(
                <IconButton>
                  <VerifiedUserIcon sx={{color:'#2196f3'}}></VerifiedUserIcon>
                  <Typography sx={{color:'#d1c4e9'}}>Verified</Typography>
                </IconButton>
              ):(
                <IconButton>
                  <ShieldIcon sx={{color:'#2196f3'}}></ShieldIcon>
                  <Typography sx={{color:'#dd2c00'}}>Checking Period</Typography>
                </IconButton>
              )
            }
          </span>
          </Typography>
          <Typography variant="h3">Welcome to Your Dashboard!</Typography>

        </Box>
        <Box sx={{paddingTop:"10px",marginBottom:"10px"}} flexGrow={1}>
            <Grid container spacing={2}>
                <Grid size={{xs:12,sm:12,md:3}}>
                    <Box>
                    <SideBarItem></SideBarItem>
                    </Box>
                </Grid>
                <Grid size={{xs:12,sm:12,md:9}} sx={{bgcolor:"white"}}>
            <Box sx={{marginTop:{xs:"-10px",sm:"-10px",md:0}, borderRadius: 2,
                
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",minHeight:"500px"}}>
                <Box sx={{bgcolor:"#40c4ff",padding:"10px"}}>
                    <Header></Header>
                </Box>
                    <hr />
                    <Box sx={{bgcolor:"#40c4ff",padding:"10px"}}>
                        <Outlet /> {/* Will display nested components */}
                    </Box>
            </Box>
                </Grid>
            </Grid>
        </Box>
        </>
    );
};

export default DoctorLayout;
