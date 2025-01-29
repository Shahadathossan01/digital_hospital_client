import React from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchDoctor = () => {
  return (
    <Box
      sx={{
        width: "100%", // Full width
        marginBottom:"10px"
      }}
    >
      <TextField
       sx={{
        borderRadius:"20px"
       }}
        variant="outlined"
        fullWidth // Ensures the search input takes the full width
        placeholder="Search doctor by name" // Placeholder text
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" /> {/* Search icon */}
            </InputAdornment>
          ),
        }}
        
      />
    </Box>
  );
};

export default SearchDoctor;
