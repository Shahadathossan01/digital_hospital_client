
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
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';

const Navbar=()=>{
  const [anchorElNav, setAnchorElNav] =useState(null);
  const {user,isLogoutUser,isLogIn}=useStoreState(state=>state.user)
  const {logoutUser}=useStoreActions(action=>action.user)
  const navigate=useNavigate()
  useEffect(()=>{
  
  },[user,isLogIn,isLogoutUser])
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout=()=>{
    logoutUser({navigate})
    setUsername(null)
  }
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
            <Link to={user?.role=='patient'&&'/' || user?.role=='doctor'&&'/docAppointment'} style={{textDecoration:'none',color:'white'}}>Digital Hospital</Link>
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
            <Link to={user?.role=='patient'&&'/' || user?.role=='doctor'&&'/docAppointment'} style={{textDecoration:'none',color:'white'}}>Digital Hospital</Link>
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
              <Link to="/" style={{textDecoration:'none',color:'black'}}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                  Home
                  </Typography>
                </MenuItem>
              </Link>

              <Link to="/appointment" style={{textDecoration:'none',color:'black'}}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                  Appointment
                  </Typography>
                </MenuItem>
              </Link>

              <Link to="/medicalRecord" style={{textDecoration:'none',color:'black'}}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                  Medical Record
                  </Typography>
                </MenuItem>
              </Link>

              <Link to="/register" style={{textDecoration:'none',color:'black'}}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                    Register
                  </Typography>
                </MenuItem>
              </Link>

              {
                user?
                <Link style={{textDecoration:'none',color:'black'}}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                  Logout
                  </Typography>
                </MenuItem>
                </Link>
                :
              <Link to="/login" style={{textDecoration:'none',color:'black'}}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                  Login
                  </Typography>
                </MenuItem>
                </Link>
              }



                <Link to="/profile" style={{textDecoration:'none',color:'black'}}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>
                  Profile
                  </Typography>
                </MenuItem>
                </Link>
                
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
           
              <Link to="/" style={{textDecoration:'none'}}><Button sx={{ my: 2, color: 'white', display: 'block' }}>Home</Button></Link>
         
              <Link to="/findDoctors" style={{textDecoration:'none'}}><Button sx={{ my: 2, color: 'white', display: 'block' }}>Find Doctor</Button></Link>
        
            {/* {
              user?.role=="patient" &&
              <Link to="/appointment" style={{textDecoration:'none'}}><Button sx={{ my: 2, color: 'white', display: 'block' }}>Appointment</Button></Link>
            } */}
            {/* {
              user?.role=="patient" &&
              <Link to="/record" style={{textDecoration:'none'}}><Button sx={{ my: 2, color: 'white', display: 'block' }}>Records</Button></Link>
            } */}
              <Link to="/becomeADoctor" style={{textDecoration:'none'}}><Button sx={{ my: 2, color: 'white', display: 'block' }}>Become a Doctor</Button></Link>
        
              {/* <Link to="/reqAppointment" style={{textDecoration:'none'}}><Button sx={{ my: 2, color: 'white', display: 'block' }}>Requested Appointment</Button></Link> */}
       
          
              {/* <Link to="/docAppointment" style={{textDecoration:'none'}}><Button sx={{ my: 2, color: 'white', display: 'block' }}>Appointment</Button></Link> */}

              <Link to="/register" style={{textDecoration:'none'}}><Button sx={{ my: 2, color: 'white', display: 'block' }}>Register</Button></Link>

        
              {/* <Link to="/adminDashboard" style={{textDecoration:'none'}}><Button sx={{ my: 2, color: 'white', display: 'block' }}>Dashboard</Button></Link> */}

            {
              user?
              <Link onClick={()=>handleLogout({navigate})} style={{textDecoration:'none'}}><Button sx={{ my: 2, color: 'white', display: 'block' }}>Logout</Button></Link>
              :
              <Link to="/login" style={{textDecoration:'none'}}><Button sx={{ my: 2, color: 'white', display: 'block' }}>Login</Button></Link>
            }
           
              <Link to="/PatientProfile" style={{textDecoration:'none'}}>
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>Profile</Button>
              </Link>
           
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
