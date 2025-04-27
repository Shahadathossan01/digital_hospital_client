import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Box, Card, CardMedia, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { action, useStoreActions, useStoreState } from "easy-peasy";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import OpenModal from "../../../modal/OpenModal";
import { InsertEmoticon } from "@mui/icons-material";


const HealthHubDetails = ({id}) => {
     const {user}=useStoreState(state=>state.user)
        const {getHealthHub}=useStoreActions(actions=>actions.healthHub)
        const {healthHub,updatedData}=useStoreState(state=>state.healthHub)
    
        useEffect(()=>{
            getHealthHub({id:id})
        },[])
        if(!healthHub) return null
 
        console.log(healthHub)

  // const {category,country,description,district,division,facilities,pharmacyImage,pharmacyName,status,upazila,phone}=item
  // const facilitiesArray = facilities.split(',').map(item => item.trim());
  return (
    <>
    <Card sx={{ display: 'flex', maxWidth: 1000, mx: 'auto', my: 2 ,mb:10}}>
      {/* Image */}
      {/* <CardMedia
        component="img"
        sx={{ width: 300 }}
        image={pharmacyImage}
        alt={name}
      /> */}

      {/* Content */}
      {/* <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Box sx={{display:'flex',justifyContent:'space-between'}}>
              <Typography component="div" variant="h5" fontWeight="bold">
                {pharmacyName}
              </Typography>
              <Typography variant="subtitle1" color="primary" component="div">
              *Partner
              </Typography>
          </Box>
          <Typography variant="subtitle1" color="info" component="div">
              Category: {category}
              </Typography>
          <Typography variant="body1" color="text.secondary" component="div">
             {upazila}-{district}-{division}
          </Typography>

          <Typography variant="body2" color="text.secondary" mt={1}>
            {description}
          </Typography>


          {facilitiesArray.length > 0 && (
            <Box mt={2}>
              <Typography variant="subtitle2" color="text.primary">
                Facilities:
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                  {facilitiesArray.map((item, index) => (
                    <Chip key={index} label={item} /> 
                  ))}
              </Box>
            </Box>
          )}

          <Box>
              <Typography variant="subtitle2" color="text.primary">
                
               Emergency Contact:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {phone}
              </Typography>
          </Box>
        </CardContent>
      </Box> */}
    </Card>
    </>
  );
};

const HealthHubActionDetails=({id})=>{
  const [open,setOpen]=useState(false)
  const handleClose=()=>{
    setOpen(false)
  }
  const handleOpen=()=>{
    setOpen(true)
  }
  console.log(id)
  return(
    <Box>
      <Button onClick={handleOpen}>Details</Button>
      {
            open && (
              <OpenModal handleClose={handleClose} open={open}>
              <HealthHubDetails id={id}></HealthHubDetails>
          </OpenModal>
            )
          }
    </Box>
  )

}


const UserTable = ({ users }) => {
    const {deleteUser}=useStoreActions(action=>action.admin)
    const [visibility, setVisibility] = useState({});

    const toggleVisibility = (userId) => {
      setVisibility((prev) => ({
        ...prev,
        [userId]: !prev[userId],
      }));
    };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        {
            users?.length=='0'?
            <Box
            sx={{
              textAlign: "center",
              mt: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              justifyContent:'center'
            }}
          >
            <PersonOffIcon sx={{ fontSize: 50, color: "gray" }} />
            <Typography variant="h6" color="textSecondary">
              No user
            </Typography>
            </Box>
            :
        <TableBody>
          {users.map((user, index) => (
            <TableRow  key={user._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user?.username}</TableCell>
              <TableCell>{user?.credential}</TableCell>
              <TableCell>{user?.role}</TableCell>
              <TableCell>
              <Box
                    sx={{
                      display: "flex",
                      gap: "5px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {visibility[user._id] ? (
                      <Typography>{user.rowPass}</Typography>
                    ) : (
                      <Typography>...........</Typography>
                    )}
                    <IconButton onClick={() => toggleVisibility(user._id)}>
                      {visibility[user._id] ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </Box>
                </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ marginRight: 8 }}
                >
                  change password
                </Button>
                <IconButton
                onClick={()=>deleteUser(user._id)}
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
                {/* {
                  user.role=='healthHub' && (
                    <HealthHubActionDetails id={user._id}></HealthHubActionDetails>
                  )
                } */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        }
      </Table>
    </TableContainer>
  );
};

export default UserTable;
