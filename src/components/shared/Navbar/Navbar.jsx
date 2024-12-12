
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar=()=>{
  const [anchorElNav, setAnchorElNav] =useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              flexGrow:4
            }}
          >
            Digital Hospital
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 4,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Digital Hospital
          </Typography>
          <Box sx={{ flexGrow:0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                  <Link to="/appointment" style={{textDecoration:'none',color:'black'}}>Appointment</Link>
                  </Typography>
                </MenuItem>

                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                  <Link to="/medicalRecord" style={{textDecoration:'none',color:'black'}}>Medical Record</Link>
                  </Typography>
                </MenuItem>

                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                  <Link to="/register" style={{textDecoration:'none',color:'black'}}>Register</Link>
                  </Typography>
                </MenuItem>

                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                  <Link to="/login" style={{textDecoration:'none',color:'black'}}>Login</Link>
                  </Typography>
                </MenuItem>

                {/* <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                  <Link style={{textDecoration:'none',color:'black'}}>Logout</Link>
                  </Typography>
                </MenuItem> */}

                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                  <Link to="/dashboard" style={{textDecoration:'none',color:'black'}}>Dashboard</Link>
                  </Typography>
                </MenuItem>
            
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

            <Link to="/appointment" style={{textDecoration:'none'}}><Button sx={{ my: 2, color: 'white', display: 'block' }}>Appointment</Button></Link>

            <Link to="/medicalRecord" style={{textDecoration:'none'}}><Button sx={{ my: 2, color: 'white', display: 'block' }}>Medical Record</Button></Link>

            <Link to="/register" style={{textDecoration:'none'}}><Button sx={{ my: 2, color: 'white', display: 'block' }}>Register</Button></Link>

            <Link to="/login" style={{textDecoration:'none'}}><Button sx={{ my: 2, color: 'white', display: 'block' }}>Login</Button></Link>

            {/* <Link style={{textDecoration:'none'}}><Button sx={{ my: 2, color: 'white', display: 'block' }}>Logout</Button></Link> */}

            <Link to="/dashboard" style={{textDecoration:'none'}}><Button sx={{ my: 2, color: 'white', display: 'block' }}>Dashboard</Button></Link>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
