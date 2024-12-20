import { useState } from "react";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ResultModal from "../ResultModal/ResultModal";

const TestResult = ({ item,index }) => {
  const { testName, image } = item;
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
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        gap: 2,
        padding: 2,
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        marginBottom: 2,
      }}
    >
      <Typography variant="body1" sx={{ flex: 1, fontWeight: "bold" }}>
        {index+1} {'.'} {testName}
      </Typography>
      <Button
        variant="contained"
        color={image ? "primary" : "warning"}
        size="small"
        disabled={!image}
        onClick={handleClickOpen}
        sx={{
          "&:disabled": {
            backgroundColor: "grey.400",
            color: "white",
          },
        }}
      >
        {image ? "Show Result" : "Don't Upload Yet!"}
      </Button>
      <ResultModal open={open} handleClose={handleClose} image={image} />
    </Box>
  );
};

export default TestResult;
