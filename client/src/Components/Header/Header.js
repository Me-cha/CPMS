import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import "./Header.css";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Chip, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/action/auth";
import clgLogo from "../Logo/clgLogo.png";

function Navbar({ toggleDarkMode, isDarkMode, setLogin, toggleMenu }) {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction(setLogin, navigate));
  };
  const user = useSelector((state) => state.auth.data);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ST.VINCENT PALLOTTI COLLEGE OF ENGINEERING AND TECHNOLOGY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}></Box>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SVPCET
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Stack direction="row" spacing={2}>
            <Box>
              {" "}
              <DarkModeSwitch
                style={{ marginRight: "1em" }}
                checked={isDarkMode}
                onChange={toggleDarkMode}
                sunColor="white"
                size={25}
              />
            </Box>
          </Stack>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Chip
                  avatar={<Avatar {...stringAvatar(`${user?.name}`)} />}
                  label={`${user?.name}`}
                  variant="outlined"
                  sx={{
                    color: "white",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="YourProfile" onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Your Profile</Typography>
              </MenuItem>
              <MenuItem key="setting" onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Settings</Typography>
              </MenuItem>
              <MenuItem key="LogOut" onClick={handleLogout}>
                <Typography textAlign="center">LogOut</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;

// import React, { useState, useEffect, useRef } from "react";
// import { Fragment } from "react";
// import { Disclosure, Menu, Transition } from "@headlessui/react";
// import { BellIcon } from "@heroicons/react/outline";
// import logo from "../Logo/cpmsLogo.png";
// import Avatar from "@mui/material/Avatar";
// import Chip from "@mui/material/Chip";

// // Utility function to conditionally concatenate CSS classes
// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// // Navbar component
// export default function Navbar({ isDarkMode, toggleDarkMode, setLogin }) {
//   const user = useSelector((state) => state.auth.data);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const notificationsRef = useRef(null);

//   const handleLogout = () => {
//     dispatch(logoutAction(setLogin, navigate));
//   };

//   return (
//     <Disclosure as="nav" className="bg-gray-800">
//       {({ open }) => (
//         <>
//           <div className="max-w-8xl mx-2 px-2 sm:px-6 lg:px-8">
//             <div className="relative flex items-center justify-between h-16 w-auto">
//               <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
//                 <Link to="/home/dashboard">
//                   <div className="flex-shrink-0 flex items-center">
//                     <img className=" h-9" src={logo} alt="CPMS" />
//                   </div>
//                 </Link>
//               </div>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//                 {/* Darkmode Switch */}

//                 <Menu as="div" className="ml-4 relative">
//                   <div>
//                     {/* Profile dropdown */}
//                     <Menu.Button className="profile-dropdown-button">
//                       <span className="sr-only">Open user menu</span>
//                       <Chip
//                         avatar={<Avatar {...stringAvatar(`${user?.name}`)} />}
//                         label={`${user?.name}`}
//                         variant="outlined"
//                         sx={{
//                           color: "white",
//                         }}
//                       />
//                     </Menu.Button>
//                   </div>
//                   {/* Transition for profile dropdown menu */}
//                   <Transition
//                     as={Fragment}
//                     enter="transition ease-out duration-100"
//                     enterFrom="transform opacity-0 scale-95"
//                     enterTo="transform opacity-100 scale-100"
//                     leave="transition ease-in duration-75"
//                     leaveFrom="transform opacity-100 scale-100"
//                     leaveTo="transform opacity-0 scale-95"
//                   >
//                     <Menu.Items className="profile-dropdown-menu z-10 hover:cursor-pointer">
//                       {/* Profile dropdown menu items */}
//                       <Menu.Item>
//                         {({ active }) => (
//                           <div
//                             // href="#"
//                             className={classNames(
//                               "profile-dropdown-item",
//                               active && "active"
//                             )}
//                           >
//                             Your Profile
//                           </div>
//                         )}
//                       </Menu.Item>
//                       <Menu.Item>
//                         {({ active }) => (
//                           <div
//                             className={classNames(
//                               "profile-dropdown-item",
//                               active && "active"
//                             )}
//                           >
//                             Settings
//                           </div>
//                         )}
//                       </Menu.Item>
//                       <Menu.Item onClick={handleLogout}>
//                         {({ active }) => (
//                           <div
//                             className={classNames(
//                               "profile-dropdown-item",
//                               active && "active"
//                             )}
//                           >
//                             Sign out
//                           </div>
//                         )}
//                       </Menu.Item>
//                     </Menu.Items>
//                   </Transition>
//                 </Menu>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </Disclosure>
//   );
// }
