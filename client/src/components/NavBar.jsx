import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate, Link } from 'react-router-dom'

const pages = ["Home", "Posts", "Profile"];

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const navigate = useNavigate()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#474747" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", sm: "flex" } }}
          >
            Logo
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}>
            <IconButton
              size="large"
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
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <MenuItem key={'Home'} component={Link} to="/" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{'Home'}</Typography>
              </MenuItem>

              <MenuItem key={'Posts'} component={Link} to="/friends" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{'Posts'}</Typography>
              </MenuItem>

              <MenuItem key={'Profile'} component={Link} to="/profile" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{'Profile'}</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", sm: "none" } }}
          >
            Mobile
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
            <Button
              key="Home"
              onClick={handleCloseNavMenu}
              component={Link} to="/"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>

            <Button
              key="Posts"
              onClick={handleCloseNavMenu}
              component={Link} to="/friends"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Posts
            </Button>

            <Button
              key={"Profile"}
              onClick={handleCloseNavMenu}
              component={Link} to="/profile"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Profile
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
