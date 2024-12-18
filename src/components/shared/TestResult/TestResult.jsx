import { useState } from "react";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ResultModal from "../ResultModal/ResultModal";

const TestResult = ({ item }) => {
    const { testName, image } = item;
    const [open, setOpen] = useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <ListItem>{testName}</ListItem>
            <Button 
                variant="contained" 
                color="primary" 
                size="small" 
                disabled={!item?.image} 
                onClick={handleClickOpen}
            >
                {item.image ? "Show Result" : "Please Upload"}
            </Button>
            <ResultModal open={open} handleClose={handleClose} image={image} />
        </div>
    );
};

export default TestResult;
