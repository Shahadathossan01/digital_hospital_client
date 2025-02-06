import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography, Grid, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import { useStoreActions, useStoreState } from "easy-peasy";
import UserTable from "../../components/shared/UserTable/UserTable";
import { filterUser } from "../../utils";

const AllUsers = () => {
  const { register, handleSubmit, reset } = useForm();
  const [roleState, setRoleState] = useState("all");
  const { getAllUser } = useStoreActions((action) => action.admin);
  const { allUserData, deletedData } = useStoreState((state) => state.admin);

  useEffect(() => {
    getAllUser();
  }, [getAllUser, deletedData]);

  const onSubmit = (data) => {
    setRoleState(data.role);
  };

  if (!allUserData) return null;

  const roleBasedUser = filterUser(allUserData, roleState);

  return (
    <Box >
      <Grid container spacing={3} alignItems="center" justifyContent="space-between">
        <Grid item xs={12} sm={6} md={8}>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", gap: 2 }}>
            <Typography variant="h6">Filter Users:</Typography>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  defaultValue="all"
                  {...register("role")}
                  variant="outlined"
                  size="small"
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="patient">Patient</MenuItem>
                  <MenuItem value="doctor">Doctor</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
              <Button type="submit" variant="contained" color="primary" size="small">
                Filter
              </Button>
            </form>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4} sx={{ textAlign: { xs: "center", sm: "right" } }}>
          <Link to="/adminCreateUser" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                padding: "10px 20px",
                fontSize: "14px",
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Add User
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Box>
        <UserTable users={roleBasedUser}></UserTable>
      </Box>
    </Box>
  );
};

export default AllUsers;
