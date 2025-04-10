import { Box, Divider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "black",
        color: "white",
        p: 3,
        marginTop:"20px"
      }}
    >
      {/* Header Text */}
      <Typography sx={{ textAlign: "center" }} variant="h4">
        Your care is our joy—we can’t wait to serve you!
      </Typography>

      {/* Content Grid */}
      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          spacing={3}
          justifyContent={{ xs: "center", sm: "center", md: "left" }}
          textAlign={{ xs: "center", sm: "center", md: "left" }}
        >
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Company</Typography>
            <Box sx={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: 1 }}>
              <Link to="/about_us" style={{ textDecoration: "none" }}>
                <Typography color="white" variant="subtitle1">
                  About Us
                </Typography>
              </Link>
              <Link to="/blogs" style={{ textDecoration: "none" }}>
                <Typography color="white" variant="subtitle1">
                  Blogs
                </Typography>
              </Link>
              <Link to="/faq" style={{ textDecoration: "none" }}>
                <Typography color="white" variant="subtitle1">
                  FAQ?
                </Typography>
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Service</Typography>
            <Box sx={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: 1 }}>
              <Link to="/findDoctors" style={{ textDecoration: "none" }}>
                <Typography color="white" variant="subtitle1">
                  Online Consultation
                </Typography>
              </Link>
              <Link to="/findDoctors" style={{ textDecoration: "none" }}>
                <Typography color="white" variant="subtitle1">
                  Specialists
                </Typography>
              </Link>
              <Link to="/findDoctors" style={{ textDecoration: "none" }}>
                <Typography color="white" variant="subtitle1">
                  Find Doctor
                </Typography>
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Legal and Policies</Typography>
            <Box sx={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: 1 }}>
              <Link to="/termsOrconditions" style={{ textDecoration: "none" }}>
                <Typography color="white" variant="subtitle1">
                  Terms & Conditions
                </Typography>
              </Link>
              <Link to="/privacy_policy" style={{ textDecoration: "none" }}>
                <Typography color="white" variant="subtitle1">
                  Privacy Policy
                </Typography>
              </Link>
              <Link to="/refund_policy" style={{ textDecoration: "none" }}>
                <Typography color="white" variant="subtitle1">
                  Refund Policy
                </Typography>
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6">Social Links</Typography>
            <Box sx={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: 1 }}>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <Typography color="white" variant="subtitle1">
                  Facebook
                </Typography>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <Typography color="white" variant="subtitle1">
                  LinkedIn
                </Typography>
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <Typography color="white" variant="subtitle1">
                  YouTube
                </Typography>
              </a>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Divider */}
      <Divider sx={{ bgcolor: "white", margin: "10px 0px" }} />
      <Link to="/leadershipProfile" style={{ textDecoration: "none",color:"white" ,display:"flex",justifyContent:"right"}}><Typography>Company Leadership Profile</Typography></Link>

      {/* Footer Branding */}
      <Typography sx={{ textAlign: "center" }} color="secondary" variant="h4">
        Sureline Health
      </Typography>

      {/* Copyright & Location */}
      <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", textAlign: "center" }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} sureline. All rights reserved.
        </Typography>
        <Typography variant="body2" sx={{ marginLeft: { xs: 0, sm: 2 } }}>
          Dhaka, Bangladesh.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
