import { Button } from '@mui/material';
import React, { useState } from 'react';
import EditScheduleSlotStatusModal from '../../shared/EditScheduleSlotStatusModal/EditScheduleSlotStatusModal';

const SlotEditButton = ({doctorID,slotID,scheduleID}) => {
    const [open, setOpen] = useState(false);
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  return (
      <div>
          <Button
            onClick={handleClickOpen}
            variant="outlined"
            size="small"
            sx={{
            marginTop: "5px",
            backgroundColor: "#f5f5f5",
            }}
            >
            Edit
         </Button>
        <EditScheduleSlotStatusModal open={open} handleClose={handleClose} doctorID={doctorID} slotID={slotID} scheduleID={scheduleID}></EditScheduleSlotStatusModal>
      </div>
  );;
};

export default SlotEditButton;