import { useContext, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useStoreActions } from "easy-peasy";
const OtpVerification = () => {
    const {otpVerify}=useStoreActions(actions=>actions.user)
  const { credential } = useParams();
  const [otp, setOtp] = useState(["", "", "", "", ""]);
const navigate=useNavigate()
  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    const verifyingData = {
      credential,
      otp: enteredOtp,
      
    };
    otpVerify({verifyingData,navigate})
  };


  return (
    <>
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 5 }}>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper"
      }}>
        <Typography variant="h4" gutterBottom>
          OTP Verification
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Enter the 5-digit OTP sent to your registered email.
        </Typography>
        <Box
          component="form"
          onSubmit={handleOtpVerification}
          sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
            {otp.map((digit, index) => (
              <TextField
                key={index}
                id={`otp-input-${index}`}
                type="text"
                inputProps={{ maxLength: 1, style: { textAlign: "center", fontSize: "1.5rem" } }}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                sx={{ width: 50, height: 50 }}
              />
            ))}
          </Box>
          <Button type="submit" variant="contained" color="primary" sx={{ width: "100%" }}>
            Verify OTP
          </Button>
        </Box>
      </Box>
    </Container>
    </>
  );
};

export default OtpVerification;