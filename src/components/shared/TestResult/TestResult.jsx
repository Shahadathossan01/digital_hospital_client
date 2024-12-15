import { useState } from "react";
import ResultModal from "../ResultModal/ResultModal";

const TestResult = ({item}) => {
    const {testName,image}=item
    const [open, setOpen] = useState(false);
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
        <div style={{display:'flex',gap:'10px',marginBottom:'10px'}}>
            <li>{testName}</li>
            <button disabled={!item?.image} onClick={handleClickOpen}>
                {item.image?"show result":"please upload"}
            </button>
            <ResultModal open={open} handleClose={handleClose} image={image}></ResultModal>
        </div>
    );
};

export default TestResult;