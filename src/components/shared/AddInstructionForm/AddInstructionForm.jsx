import { Box, Button, TextField, Typography } from '@mui/material';
import { action, useStoreActions } from 'easy-peasy';
import React, { act } from 'react';
import { useForm } from 'react-hook-form';

const AddInstructionForm = ({prescriptionID}) => {
    const {updateAdditionalInstruction}=useStoreActions(action=>action.prescription)
    const {register,handleSubmit,reset}=useForm()
    const onSubmit=(data)=>{
        updateAdditionalInstruction({data,prescriptionID})
        reset()
    }
    return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        padding: 3,
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        maxWidth: 400,
        margin: "0 auto",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Add Additional Instructions
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          required
          {...register("instruction")}
          id="instruction"
          name="instruction"
          label="Enter Your Instruction in a short paragraps.."
          variant="outlined"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            padding: "10px 0",
            fontWeight: "bold",
          }}
        >
          Add Instruction
        </Button>
      </form>
    </Box>
    );
};

export default AddInstructionForm;