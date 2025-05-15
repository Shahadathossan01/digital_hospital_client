import { Alert, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { 
    TextField, Button, Container, Typography, Grid, Card, CardContent 
} from "@mui/material";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { format } from "date-fns";
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import OpenModal from "../../modal/OpenModal";
import { checkUpdatedData } from "../../utils";
const PromoForm = ({handlePromo,update,handleClose,id}) => {
  const { register, handleSubmit, setValue,reset,watch } = useForm();
  const [promoCode, setPromoCode] = useState("");
  const {user}=useStoreState(state=>state.user)
  const promoCodeWatch = watch("code");
  // Function to generate a random promo code
 const generatePromoCode = () => {
  const code = Math.random().toString(36).substring(2, 10).toUpperCase();
  setPromoCode(code);
  setValue("code", code, { shouldValidate: true });
};

  // Handle form submission
  const onSubmit = (data) => {
    const checkEmptyData=checkUpdatedData(data)
    const payload={
      ...checkEmptyData,
      creatorId:user?._id
    }
    handlePromo({data:payload,id})
    reset()
    handleClose()
    setPromoCode("")
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, p: 3}}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}>
            Create Promo Code
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {/* Promo Code */}
              <Grid item xs={8}>
                <TextField
  fullWidth
  label="Promo Code"
  {...register("code", { required: !update })}
  InputLabelProps={{ shrink: Boolean(promoCodeWatch) }} // only shrink when value exists
/>
              </Grid>
              <Grid item xs={4}>
                <Button 
                  fullWidth 
                  variant="contained" 
                  color="primary" 
                  onClick={generatePromoCode}
                  sx={{ height: "100%" }}
                >
                  Generate
                </Button>
              </Grid>

              {/* Percentage */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Discount Percentage"
                  type="number"
                  {...register("percentage", {  required:update?false: true })}
                  inputProps={{ min: 1, max: 100 }}
                />
              </Grid>

              
              {/* <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="date"
                  label="Expiry Date"
                  InputLabelProps={{ shrink: true }}
                  {...register("expiryDate", {  required:update?false: true })}
                />
              </Grid> */}

              {/* Usage Limit */}
              {/* <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Usage Limit"
                  type="number"
                  {...register("usageLimit", {  required:update?false: true })}
                  inputProps={{ min: 1 }}
                />
              </Grid> */}

              {/* Submit Button */}
              <Grid item xs={12}>
                {
                    update?(
                        <Button 
                  fullWidth 
                  variant="contained" 
                  color="success" 
                  type="submit"
                  sx={{ mt: 2 }}
                >
                  Update Promo Code
                </Button>
                    ):(
                    <Button 
                  fullWidth 
                  variant="contained" 
                  color="success" 
                  type="submit"
                  sx={{ mt: 2 }}
                >
                  Submit Promo Code
                </Button>
                    )
                }
                
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Box>
    </Container>
  );
};

const CreatePromo=()=>{
    const {createPromoCode}=useStoreActions(actions=>actions.promoCode)
    const [open, setOpen] = useState(false);
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    return(
        <Box>
            <Button variant="contained" onClick={handleClickOpen}>Create Promo Code</Button>
            <OpenModal open={open} handleClose={handleClose}>
                <PromoForm handleClose={handleClose} handlePromo={createPromoCode}></PromoForm>
            </OpenModal>
        </Box>
    )
}

const TableAction=({id})=>{
    const {getAllPromoCode,deletePromoCode,updatePromoCode}=useStoreActions(actions=>actions.promoCode)
    const {allPromoData,createdPromoData,deletedData}=useStoreState(state=>state.promoCode)
    const [open, setOpen] = useState(false);
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    return(
        <>
            <EditIcon onClick={handleClickOpen}></EditIcon>
                <ClearIcon onClick={()=>deletePromoCode({id})} sx={{color:"red","&:hover": {
                    backgroundColor: "rgba(255, 0, 0, 0.1)", // Light red background on hover
                    },}}>
                </ClearIcon>
                <OpenModal handleClickOpen={handleClickOpen} open={open} handleClose={handleClose}>
          <PromoForm id={id} handleClose={handleClose} update handlePromo={updatePromoCode}></PromoForm>
    </OpenModal>
        </>
    )
}

const PromoCodeTable = () => {
    const {getAllPromoCode}=useStoreActions(actions=>actions.promoCode)
    const {allPromoData,createdPromoData,deletedData,updatedData}=useStoreState(state=>state.promoCode)

    useEffect(()=>{
        getAllPromoCode()
    },[getAllPromoCode,createdPromoData,deletedData,updatedData])
    if(!getAllPromoCode) return null
  return (
    <>
    <TableContainer component={Paper} sx={{ mt: 4, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" sx={{ p: 2, textAlign: "center", fontWeight: "bold" }}>
        Promo Codes List
      </Typography>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell sx={{ fontWeight: "bold" }}>No.</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Author</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Promo Code</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Discount (%)</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>role</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allPromoData.map((item, index) => (
            console.log(item),
            <TableRow key={index}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{item.author.role==='admin' ? item?.author?.username : item?.healthHub?.pharmacyName}</TableCell>
              <TableCell>{item.code}</TableCell>
              <TableCell>{item.percentage}%</TableCell>
              <TableCell>{item?.author?.role}</TableCell>
              <TableCell sx={{display:"flex",gap:"2px"}}>
                <TableAction id={item._id}></TableAction>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
    </>
  );
};

const PromoCode = () => {
   
    return (
        <Box>
            <CreatePromo></CreatePromo>
            <PromoCodeTable></PromoCodeTable>
        </Box>
    );
};

export default PromoCode;