import { TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const SearchDoctor = () => {
  const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <Box
      sx={{
        width: "100%",
        marginTop:{xs:"60px",sm:"70px",md:"80px"}
      }}
    >
      <TextField
       sx={{
        borderRadius:"20px"
       }}
        variant="outlined"
        fullWidth
        onClick={handleClickOpen}
        placeholder="Search doctor by name"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        
      />
    </Box>
  );
};

export default SearchDoctor;
