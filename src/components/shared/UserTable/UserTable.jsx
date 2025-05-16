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
import ForcedResetPassFrom from "../../../pages/ForcedResetPassFrom/ForcedResetPassFrom";


const UserTable = ({ users }) => {
   const [selectedUserId, setSelectedUserId] = useState(null);
    const [open,setOpen]=useState(false)
    const {deleteUser}=useStoreActions(action=>action.admin)
    const [visibility, setVisibility] = useState({});
    const {user:currentUser}=useStoreState(state=>state.user)
    const toggleVisibility = (userId) => {
      setVisibility((prev) => ({
        ...prev,
        [userId]: !prev[userId],
      }));
    };

    const handleClose=()=>{
      setSelectedUserId(null)
      setOpen(false)
    }
    const handleClickOpen=(userId)=>{
      setSelectedUserId(userId)
      setOpen(true)
    }
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            {/* <TableCell>Password</TableCell> */}
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
            <TableRow sx={{ bgcolor: currentUser._id === user._id ? '#b0bec5' : 'transparent' }}  key={user._id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user?.username}</TableCell>
              <TableCell>{user?.credential}</TableCell>
              <TableCell>{user?.role}</TableCell>
              <TableCell>
              {/* <Box
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
                  </Box> */}
                </TableCell>
              <TableCell>
                <Button
                  onClick={()=>{handleClickOpen(user?._id)}}
                  variant="contained"
                  color="primary"
                  size="small"
                  style={{ marginRight: 8 }}
                >
                  Force Password Rest
                </Button>
                <OpenModal open={open} handleClose={handleClose}>
                    <ForcedResetPassFrom id={selectedUserId} handleClose={handleClose}></ForcedResetPassFrom>
                </OpenModal>
                <IconButton
                onClick={()=>deleteUser(user._id)}
                aria-label="delete"
                color="error"
                size="small"
                disabled={currentUser._id ===user._id}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 0, 0, 0.1)",
                  },
                }}
                >
                <DeleteIcon />
                </IconButton>
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
