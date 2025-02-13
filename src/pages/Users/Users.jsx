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
      <UserTable users={roleBasedUser}></UserTable>
    </Box>
  );
};

export default AllUsers;
