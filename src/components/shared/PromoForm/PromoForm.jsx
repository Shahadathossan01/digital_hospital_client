import { Alert} from "@mui/material";
import { useForm } from "react-hook-form";
import { 
    TextField, Button, Container, Typography, Grid, Card, CardContent 
} from "@mui/material";
import {useStoreState } from "easy-peasy";
import { useState } from "react";
const PromoForm = ({handlePromo,update}) => {
  const { register, handleSubmit, setValue,reset } = useForm();
  const [promoCode, setPromoCode] = useState("");
  const {error}=useStoreState(state=>state.promoCode)
  // Function to generate a random promo code
  const generatePromoCode = () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    setPromoCode(code);
    setValue("code", code); // Set the generated code in the form
  };

  // Handle form submission
  const onSubmit = (data) => {
    handlePromo(data)
    reset()
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}>
            Create Promo Code
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {/* Promo Code */}
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  label="Promo Code"
                  value={promoCode}
                  {...register("code", { required: true })}
                  InputProps={{ readOnly: true }}
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
                  {...register("percentage", { required: true, min: 1, max: 100 })}
                  inputProps={{ min: 1, max: 100 }}
                />
              </Grid>

              {/* Expiry Date */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="date"
                  label="Expiry Date"
                  InputLabelProps={{ shrink: true }}
                  {...register("expiryDate", { required: true })}
                />
              </Grid>

              {/* Usage Limit */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Usage Limit"
                  type="number"
                  {...register("usageLimit", { required: true, min: 1 })}
                  inputProps={{ min: 1 }}
                />
              </Grid>

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
      </Card>
    </Container>
  );
};

export default PromoForm;