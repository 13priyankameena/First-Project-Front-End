import React, { useState } from "react";  // ✅ added useState import
import { MdOutlineEmail } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Avatar, Menu, MenuItem, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Headers() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  // open menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // close menu
  const handleClose = () => {
    
    setAnchorEl(null);
  };

  // logout
  const handleLogout = () => {

    
    

     console.log("Before remove:", Cookies.get("token"));

     Cookies.remove("token",{path:"/"});

      console.log("After remove:", Cookies.get("token"));

    console.log("Token removed, user logged out");

    handleClose();
    
    
    navigate("/"); // go to login page
   
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        borderTop: "1px solid #cfd9df",
        bgcolor: "white",
        mt: "5px",
        height: "70px", // fix header height
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "stretch",
          height: "100%",
        }}
      >
        {/* Left side - Title */}
        <Box
          sx={{
            flex: "0 0 20.200%",
            borderRight: "1px solid #cfd9df",
            borderBottom: "1px solid #cfd9df",
            display: "flex",
            alignItems: "center",
            pl: "40px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "rgb(105, 107, 121)",
              fontWeight: 500,
              fontSize: "20px",
            }}
          >
            Demo Project
          </Typography>
        </Box>

        {/* Right side - Icons & Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, pr: 10 }}>
          {/* Email Icon */}
          <IconButton sx={{ color: "rgb(105, 107, 121)" }}>
            <MdOutlineEmail />
          </IconButton>

          {/* Notification Icon */}
          <IconButton sx={{ color: "rgb(105, 107, 121)" }}>
            <IoNotificationsOutline />
          </IconButton>

          {/* Profile Avatar */}
          <IconButton onClick={handleClick}>
            <Avatar sx={{ bgcolor: "secondary.main", fontSize: "0.9rem" }}>
              PM
            </Avatar>
          </IconButton>

          {/* Dropdown Menu */}
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Headers;
