import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { Box, Divider, List, ListItem, ListItemText } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from "react";

import { Card, CardContent, Typography, Avatar } from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
import { getUpcommingAppointments } from "../utils";

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
  const { getAllUser } = useStoreActions((action) => action.admin);
  const { getAppointments } = useStoreActions((action) => action.appointment);
  const {registerData}=useStoreState(state=>state.user)
  const { allUserData } = useStoreState((state) => state.admin);
  const { appointments } = useStoreState((state) => state.appointment);
  const {getAllPromoCode}=useStoreActions(actions=>actions.promoCode)
  const {allPromoData,createdPromoData,deletedData}=useStoreState(state=>state.promoCode)


  const {getRequestedDoctors}=useStoreActions(actions=>actions.doctor)
    const {requestedDoctor,deleteDoctorData,updatedProfileData}=useStoreState(state=>state.doctor)

    useEffect(()=>{
        getRequestedDoctors()
    },[getRequestedDoctors,deleteDoctorData,updatedProfileData,registerData])


    
    useEffect(() => {
      getAllUser();
    }, [getAllUser,deleteDoctorData,registerData]);
    
    useEffect(()=>{
      getAppointments()
    },[getAppointments])

    useEffect(()=>{
      getAllPromoCode()
    },[getAllPromoCode,createdPromoData,deletedData])


    
    if (allUserData.length==0 || requestedDoctor.length==0 ) return null;
    const totalAdmins=allUserData.filter((item)=>item.role=="admin")
    // const totalPatients=allUserData.filter((item)=>item.role=="patient")
    

   

    return(
        <Box flexGrow={1}>
            <Grid container spacing={1}>
                <Grid size={{xs:12,sm:6,md:3}}>
                    <HeaderCard number={requestedDoctor?.length} title={"Total Requested"} subtitle={"Doctors"}/>
                </Grid>
                <Grid size={{xs:12,sm:6,md:3}}>
                    <HeaderCard number={appointments.length} title={"Total"} subtitle={"Appointments"} />
                </Grid>
                <Grid size={{xs:12,sm:6,md:3}}>
                    <HeaderCard number={allPromoData.length} title={"Total"} subtitle={"Promo Code"} />
                </Grid>
                <Grid size={{xs:12,sm:6,md:3}}>
                    <HeaderCard number={totalAdmins.length} title={"Total"} subtitle={"Admins"} />
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
            { text: "All Users", path: "/allUsers" },
            { text: "Promo Code", path: "/promoCode" },
            // { text: "Add Doctor", path: "/addDoctor" },
            { text: "All Invoice", path: "/adminInvoice" },
            { text: "Ref. Invoice", path: "/refAllAppointments" },
            { text: "Blogs", path: "/adminBlogs" },
            { text: "Add Admin", path: "/addAdmin" },
            // { text: "Change Password", path: "/changePassword" },
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
const AdminLayout = () => {
  const {user}=useStoreState(state=>state.user)
    return (
        <>
        <Box  sx={{fontWeight:"bold",textAlign:"center",bgcolor:"green",color:"white",p:1}}>
          <Typography><span style={{color:"yellow"}}>Hello,</span> {user?.username} [<span style={{color:"#ffca28",fontWeight:"bold"}}>{user?.role=="doctor"?"Doctor":"Admin"}</span>]</Typography>
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
                    <Box sx={{padding:"10px"}}>
                        <Outlet /> {/* Will display nested components */}
                    </Box>
            </Box>
                </Grid>
            </Grid>
        </Box>
        </>
    );
};

export default AdminLayout;
