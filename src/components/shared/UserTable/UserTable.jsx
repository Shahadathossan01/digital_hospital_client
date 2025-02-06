import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { action, useStoreActions, useStoreState } from "easy-peasy";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
const UserTable = ({ users }) => {
    const {deleteUser}=useStoreActions(action=>action.admin)
    const [visibility, setVisibility] = useState({}); // Store visibility per user

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
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Email</TableCell>
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
              No users f
            </Typography>
            </Box>
            :
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user?.username?user.username:user.firstName}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.email}</TableCell>
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
