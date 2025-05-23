
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
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const activeStyle = {
  backgroundColor:'white',
  color: 'blue',
};



const EmergencyRoute=()=>{
    const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }
  return(
      <>
        <Link  style={{textDecoration:'none'}}><Button size='small' sx={{ my: 2, color: 'white', display: 'block' }} onClick={handleClick}>More..</Button></Link>           
              <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/instant_video" style={{ textDecoration: 'none', color: 'black' }}>
            Instant Video Call
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/health_hub" style={{ textDecoration: 'none', color: 'black' }}>
            Health Hub
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/medicine_hub" style={{ textDecoration: 'none', color: 'black' }}>
            Medicine Hub
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/lab_testing" style={{ textDecoration: 'none', color: 'black' }}>
            Lab Testing
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/termsOrconditions" style={{ textDecoration: 'none', color: 'black' }}>
          Terms & Conditions
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/privacy_policy" style={{ textDecoration: 'none', color: 'black' }}>
            Privacy & Policy
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/refund_policy" style={{ textDecoration: 'none', color: 'black' }}>
            Refund Policy
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/faq" style={{ textDecoration: 'none', color: 'black' }}>
            FAQ?
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/leadershipProfile" style={{ textDecoration: 'none', color: 'black' }}>
            Company Leadership Profile
          </Link>
        </MenuItem>
              </Menu>
      </>
  )
}
const RegistrationRoute=()=>{
    const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }
  return(
      <>


        <Link style={{textDecoration:'none'}}><Button size='small' sx={{ my: 2, color: 'white', display: 'block' }} onClick={handleClick}> Registration Now</Button></Link>           
              <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/register" style={{ textDecoration: 'none', color: 'black' }}>
          Patient Registration
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/becomeADoctor" style={{ textDecoration: 'none', color: 'black' }}>
          Doctor Registration
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/registerHealthHub" style={{ textDecoration: 'none', color: 'black' }}>
            Health Hub Registration
          </Link>
        </MenuItem>
              </Menu>
      </>
  )
}
const RegistrationRouteMobile=()=>{
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

    return(
      <>
        <Link style={{textDecoration:'none',color:'black'}}>   
                <MenuItem >
                    <Typography 
                    sx={{ color: 'black'}} 
                      onClick={handleClick}
                  >
                    Registration Now
                    </Typography>
                    <Menu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>
                      <Link to="/register" style={{ textDecoration: 'none', color: 'black' }}>
                      Patient Registration
                      </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose}>
                        <Link to="/becomeADoctor" style={{ textDecoration: 'none', color: 'black' }}>
                        Doctor Registration
                        </Link>
                      </MenuItem>
                      
                      <MenuItem onClick={handleClose}>
                      <Link to="/registerHealthHub" style={{ textDecoration: 'none', color: 'black' }}>
                        Health Hub Registration
                      </Link>
                      </MenuItem>
                    </Menu>
                </MenuItem>
              </Link>
      </>
    )
}



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
    const token = localStorage.getItem("token")?localStorage.getItem("token"):null;
    logoutUser({token,navigate})
    handleCloseNavMenu()
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }
  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          {/**Destop */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: "flex" },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              flexGrow:4
            }}
          >
            <Link to="/" style={{textDecoration:'none',color:'white'}}>Sureline Health</Link>
          </Typography>

            {/**mobile */}
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
            <Link to="/" style={{textDecoration:'none',color:'white'}}>Sureline Health</Link>
          </Typography>

            {/**modile */}
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

              
              <NavLink to="/" style={{textDecoration:'none',color:'black'}}>
                {
                  ({isActive})=>(
                    <MenuItem onClick={handleCloseNavMenu}>
                  <Typography
                    sx={{
                      textAlign:'center',
                      ...(isActive && activeStyle)
                    }}
                  >
                  Home
                  </Typography>
                </MenuItem>
                  )
                }
              </NavLink>
              <NavLink to="/findDoctors" style={{textDecoration:'none',color:'black'}}>
                {
                  ({isActive})=>(
                    <MenuItem onClick={handleCloseNavMenu}>
                  <Typography
                    sx={{
                      textAlign:'center',
                      ...(isActive && activeStyle)
                    }}
                  >
                  Find Doctor
                  </Typography>
                </MenuItem>
                  )
                }
              </NavLink>
              <NavLink to="/about_us" style={{textDecoration:'none',color:'black'}}>
                {
                  ({isActive})=>(
                    <MenuItem onClick={handleCloseNavMenu}>
                  <Typography
                    sx={{
                      textAlign:'center',
                      ...(isActive && activeStyle)
                    }}
                  >
                  About Us
                  </Typography>
                </MenuItem>
                  )
                }
              </NavLink>
              <NavLink to="/blogs" style={{textDecoration:'none',color:'black'}}>
                {
                  ({isActive})=>(
                    <MenuItem onClick={handleCloseNavMenu}>
                  <Typography
                    sx={{
                      textAlign:'center',
                      ...(isActive && activeStyle)
                    }}
                  >
                  Blogs
                  </Typography>
                </MenuItem>
                  )
                }
              </NavLink>

              <RegistrationRouteMobile></RegistrationRouteMobile>

              <Link style={{textDecoration:'none',color:'black'}}>   
                <MenuItem >
                  <Typography 
                  sx={{ color: 'black'}} 
                    onClick={handleClick}
                >
                  More..
                  </Typography>
                  <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
          <Link to="/instant_video" style={{ textDecoration: 'none', color: 'black' }}>
            Instant Video Call
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/health_hub" style={{ textDecoration: 'none', color: 'black' }}>
            Health Hub
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/medicine_hub" style={{ textDecoration: 'none', color: 'black' }}>
            Medicine Hub
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/lab_testing" style={{ textDecoration: 'none', color: 'black' }}>
            Lab Testing
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/termsOrconditions" style={{ textDecoration: 'none', color: 'black' }}>
          Terms & Conditions
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/privacy_policy" style={{ textDecoration: 'none', color: 'black' }}>
            Privacy & Policy
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/refund_policy" style={{ textDecoration: 'none', color: 'black' }}>
            Refund Policy
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/faq" style={{ textDecoration: 'none', color: 'black' }}>
            FAQ?
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/leadershipProfile" style={{ textDecoration: 'none', color: 'black' }}>
            Company Leadership Profile
          </Link>
        </MenuItem>
                  </Menu>
                </MenuItem>
              </Link>
            
            
            
              {
                user?
                <Link style={{textDecoration:'none',color:'black'}}>
                <MenuItem onClick={handleLogout}>
                <Typography sx={{ textAlign: 'center' }}>
                    Logout
                  </Typography>
                </MenuItem>
                </Link>
                :

                <NavLink to="/login" style={{textDecoration:'none',color:'black'}}>
                {
                  ({isActive})=>(
                    <MenuItem onClick={handleCloseNavMenu}>
                  <Typography
                    sx={{
                      textAlign:'center',
                      ...(isActive && activeStyle)
                    }}
                  >
                  Login
                  </Typography>
                </MenuItem>
                  )
                }
              </NavLink>
              }
               

                <Link to="/profile" style={{textDecoration:'none',color:'black'}}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <AccountCircleIcon></AccountCircleIcon>
                </MenuItem>
                </Link>
                
            </Menu>
          </Box>
          
          {/**desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },alignItems:"center"}}>
              
              <NavLink to="/" style={{textDecoration:'none'}} >
                {({ isActive }) => (
                  <Button
                    size="small"
                    sx={{
                      my: 2, color: 'white', display: 'block',
                      ...(isActive && activeStyle),
                    }}
                  >
                    Home
                  </Button>
                )}
              </NavLink>

              <NavLink to="/findDoctors" style={{textDecoration:'none'}} >
                {({ isActive }) => (
                  <Button
                    size="small"
                    sx={{
                      my: 2, color: 'white', display: 'block',
                      ...(isActive && activeStyle),
                    }}
                  >
                    Find Doctor
                  </Button>
                )}
              </NavLink>
              <NavLink to="/about_us" style={{textDecoration:'none'}} >
                {({ isActive }) => (
                  <Button
                    size="small"
                    sx={{
                      my: 2, color: 'white', display: 'block',
                      ...(isActive && activeStyle),
                    }}
                  >
                    About Us
                  </Button>
                )}
              </NavLink>
              <NavLink to="/blogs" style={{textDecoration:'none'}} >
                {({ isActive }) => (
                  <Button
                    size="small"
                    sx={{
                      my: 2, color: 'white', display: 'block',
                      ...(isActive && activeStyle),
                    }}
                  >
                    Blogs
                  </Button>
                )}
              </NavLink>

        


              {/* registration */}
              <RegistrationRoute></RegistrationRoute>

            {
              user?
              
                  <Button
                    onClick={()=>logoutUser()}
                    size="small"
                    sx={{
                      my: 2, color: 'white', display: 'block',
                 
                    }}
                  >
                    Logout
                  </Button>
            
              

              // <Link onClick={handleLogout} style={{textDecoration:'none'}}><Button size='small' sx={{ my: 2, color: 'white', display: 'block' }}>Logout</Button></Link>
              :
              <NavLink to="/login" style={{textDecoration:'none'}} >
                {({ isActive }) => (
                  <Button
                    size="small"
                    sx={{
                      my: 2, color: 'white', display: 'block',
                      ...(isActive && activeStyle),
                    }}
                  >
                    Login
                  </Button>
                )}
              </NavLink>
              // <Link to="/login" style={{textDecoration:'none'}}><Button size='small' sx={{ my: 2, color: 'white', display: 'block' }}>Login</Button></Link>
            }

            <EmergencyRoute></EmergencyRoute>
            
              <Link to="/profile" style={{textDecoration:'none'}}>
              <Button sx={{ my: 2, color: 'white' }}>
                <AccountCircleIcon></AccountCircleIcon>
              </Button>
              </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
