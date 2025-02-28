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
      
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{display:"flex",alignItems:"center",gap:"10px"}}>
        <TextField
          required
          {...register("instruction")}
          id="instruction"
          name="instruction"
          label="Enter Your Advice..."
          variant="outlined"
         
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          
        >
          Add Advice
        </Button>
        </Box>
      </form>
    </Box>
    );
};

export default AddInstructionForm;