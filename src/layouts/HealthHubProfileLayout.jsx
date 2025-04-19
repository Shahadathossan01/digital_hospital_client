import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useState } from "react";
import { useStoreActions } from "easy-peasy";

const SideBarItem = () => {
    const location = useLocation(); // Get the current path
  
    return (
      <Box p={2}>
        <List sx={{ display: "flex", flexDirection: "column", gap: "20px", borderRadius: 2, width: "100%" }}>
          
          {/** Sidebar Items */}
          {[
            { text: "Pharmacy Profile", path: "/profile" },
            { text: "Appointments", path: "/profile/appointments" },
            { text: "Invoice", path: "/profile/invoice" },
            { text: "Change Password", path: "/profile/changePassword" },
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
        </List>
      </Box>
    );
  };

const HealthHubProfileLayout = () => {
    return (
        <>
        <Box sx={{paddingTop:"40px",marginBottom:"10px",marginTop:"50px"}} flexGrow={1}>
            <Grid container spacing={2}>
                <Grid size={{xs:12,sm:12,md:4}}>
                    <Box>
                    <SideBarItem></SideBarItem>
                    </Box>
                </Grid>
                <Grid size={{xs:12,sm:12,md:8}} sx={{bgcolor:"white"}}>
            <Box  px={3} sx={{marginTop:{xs:"-10px",sm:"-10px",md:0},padding:2, borderRadius: 2,
                p: 2,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",minHeight:"500px"}}>
                <Outlet /> {/* Will display nested components */}
            </Box>
                </Grid>
            </Grid>
        </Box>
        </>
    );
};

export default HealthHubProfileLayout;
