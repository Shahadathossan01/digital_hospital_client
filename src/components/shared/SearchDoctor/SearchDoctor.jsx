import { TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchDoctor = () => {
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
