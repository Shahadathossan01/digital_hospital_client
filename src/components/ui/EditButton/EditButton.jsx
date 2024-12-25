import { Button } from "@mui/material";
import { useState } from "react";
import EditScheduleStatusModal from "../../shared/EditScheduleStatusModal/EditScheduleStatusModal";

const EditButton = ({doctorID,scheduleID}) => {
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
                    sx={{ marginLeft: "10px", marginTop: "5px" }}
                  >
                    Edit
                  </Button>
                  <EditScheduleStatusModal doctorID={doctorID} scheduleID={scheduleID} open={open} handleClose={handleClose} ></EditScheduleStatusModal>
        </div>
    );
};

export default EditButton;