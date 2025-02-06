import { useState } from "react";
import CreateSlotForm from "../../components/shared/CreateSlotForm/CreateSlotForm";
import { createSchedule, getTotalDaysInMonth } from "../../utils";
import { useForm } from "react-hook-form";
import { useStoreActions } from "easy-peasy";
import { TextField, Select, MenuItem, Button, Typography, Box, FormControl, InputLabel } from "@mui/material";

const AdminCreateUser = () => {
  const { register, handleSubmit, reset } = useForm();
  const { addUser } = useStoreActions(action => action.admin);
  const onSubmit = (data) => {
    addUser({data});
    reset()
  };

  return (
    <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      <Box sx={{ flex: 1 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography color="info" variant="h5" sx={{ marginBottom: 2 }}>
            Create Admin OR Patient
          </Typography>

          <TextField
            required
            {...register("username")}
            label="Username"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            required
            {...register("email")}
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            required
            {...register("password")}
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            sx={{ marginBottom: 2 }}
          />
  <FormControl fullWidth sx={{ marginBottom: 2 }}>
    <InputLabel>Role</InputLabel>
    <Select {...register("role")}>
      <MenuItem value="patient">Patient</MenuItem>
      <MenuItem value="admin">Admin</MenuItem>
    </Select>
  </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            Confirm
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AdminCreateUser;
