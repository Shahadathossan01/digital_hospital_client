import { useState } from "react";
import CreateSlotForm from "../../components/shared/CreateSlotForm/CreateSlotForm";
import { createSchedule, getTotalDaysInMonth } from "../../utils";
import { useForm } from "react-hook-form";
import { useStoreActions } from "easy-peasy";
import { TextField, Select, MenuItem, Button, Typography, Box, FormControl, InputLabel } from "@mui/material";

const AdminCreateUser = () => {
  const { register, handleSubmit, reset, watch } = useForm();
  const { addUser } = useStoreActions(action => action.admin);
  const [times, setTimes] = useState([]);
  const date = new Date();
  const totalMonthDays = getTotalDaysInMonth(date);
  const schedule = createSchedule(totalMonthDays, times);
  const handleSlot = (time) => {
    setTimes((prev) => [...prev, time]);
  };

  const role = watch("role");
  const onSubmit = (data) => {
    addUser({ data, schedule });
    reset();
  };

  return (
    <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      <Box sx={{ flex: 1 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Create User
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
      <MenuItem value="doctor">Doctor</MenuItem>
      <MenuItem value="admin">Admin</MenuItem>
    </Select>
  </FormControl>

          {role === "doctor" && (
            <TextField
                required
              {...register("category")}
              label="Category"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
            />
          )}
          {role === "doctor" && (
            <TextField
                required
              {...register("fee")}
              label="Fee"
              variant="outlined"
              fullWidth
              type="number"
              sx={{ marginBottom: 2 }}
            />
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginBottom: 2 }}
            disabled={times.length === 0 && role === "doctor"}
          >
            Confirm
          </Button>
        </form>
      </Box>

      {role === "doctor" && (
        <Box sx={{ flex: 1 }}>
        <CreateSlotForm handleSlot={handleSlot} />
        
        <Typography variant="h6" sx={{ marginTop: 3 }}>
          Default Schedule Slots:
        </Typography>
      
        {times.map((item, index) => (
          <Typography key={index} variant="body1">
            Slot-{index + 1}: {item}
          </Typography>
        ))}
      </Box>
      )}
    </Box>
  );
};

export default AdminCreateUser;
