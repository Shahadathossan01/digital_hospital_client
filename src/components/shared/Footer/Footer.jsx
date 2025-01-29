import { Box, Typography, Link, Grid } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#333",
        color: "#fff",
        padding: 3,
        textAlign: "center",
        position: "relative",
        bottom: 0,
      }}
    >
      {/* Social Media Links */}
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
        <Grid item>
          <Link href="https://facebook.com" target="_blank" color="inherit">
            <Facebook />
          </Link>
        </Grid>
        <Grid item>
          <Link href="https://twitter.com" target="_blank" color="inherit">
            <Twitter />
          </Link>
        </Grid>
        <Grid item>
          <Link href="https://instagram.com" target="_blank" color="inherit">
            <Instagram />
          </Link>
        </Grid>
      </Grid>

      {/* Copyright */}
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Your Website. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
