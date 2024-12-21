import { useStoreActions } from "easy-peasy";
import { Button, Typography, Box } from "@mui/material";

const MedicinList = ({ item, number ,isDoctor}) => {
  const { medicinDelete } = useStoreActions((actions) => actions.prescription);
  const id = item._id;
  const { medicinName, dosage, frequency, duration } = item;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        gap: 2,
        padding: 2,
        marginBottom: 2,
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        {number}. {medicinName} ({dosage}) - {frequency} for {duration} {duration > 1 ? "s" : ""}
      </Typography>
      {
        isDoctor &&
        <Button
        variant="contained"
        color="error"
        onClick={() => medicinDelete(id)}
        size="small"
        sx={{ alignSelf: { xs: "flex-start", sm: "center" } }}
      >
        Delete
      </Button>
      }
    </Box>
  );
};

export default MedicinList;
