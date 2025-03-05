import { useStoreActions } from "easy-peasy";
import { Button, Typography, Box, Divider } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
const MedicinList = ({ item, number ,isDoctor}) => {
  const { medicinDelete } = useStoreActions((actions) => actions.prescription);
  const id = item._id;
  const { medicinName, dosage, frequency, duration } = item;

  return (
    <>
      <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        marginTop:"20px"
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        {number}. {medicinName} ({dosage}) -  {frequency} for {duration} {duration > 1 ? "s" : ""}
      </Typography>
      {
        isDoctor &&
        <HighlightOffIcon onClick={() => medicinDelete(id)} color="warning" />
    
      
    }
    </Box><Divider></Divider>
    </>
  );
};

export default MedicinList;
