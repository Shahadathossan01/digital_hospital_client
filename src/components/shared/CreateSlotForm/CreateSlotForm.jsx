import { Box, Button, TextField, Typography } from "@mui/material";
import { format, parse } from "date-fns";
import { useForm } from "react-hook-form";

const CreateSlotForm = ({ handleSlot }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const time = parse(data.slot, "HH:mm", new Date());
    const formattedTime = format(time, "hh:mm a");
    handleSlot(formattedTime);
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
      <Typography variant="h6">Create Slot</Typography>
      
      <TextField
        required
        label="Slot Time"
        type="time"
        {...register("slot")}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      
      <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
        Add Slot
      </Button>
    </Box>
  );
};

export default CreateSlotForm;
