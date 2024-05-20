"use client";

import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { AccountCircle, MenuOutlined, Settings } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/app/GlobalRedux/Features/authSlice";
import { useRouter, usePathname } from "next/navigation";
import { isObjectEmpty } from "@/helpers/functions";
import { theme } from "@/helpers/themeColors";
import Link from "next/link";
import { hideLoader, showLoader } from "@/app/GlobalRedux/Features/loaderSlice";
// import logo from "@/images/cloudtenviplogo.png";
import API from "@/helpers/APIServices/API";
import { adminMenuItems } from "@/helpers/menuItems";

const drawerWidth = 240;

const AdminNavBar = ({ children, window: windowProp }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [variant, setVariant] = useState("permanent");

  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(showLoader("Logging out"));
    // API.get("/api/logout-custom")
    //   .then(() => {
    //     dispatch(showLoader("Logged out successfully"));
    //     dispatch(logout());
    //   })
    //   .catch(() => console.error("Could not logout user"))
    //   .finally(() => {
    //     router.push("/login");
    //     dispatch(hideLoader());
    //     dispatch(logout());
    //   });
  };

  const handleNavigation = () => {
    handleClose();
    dispatch(showLoader("Please wait"));
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    setVariant((prevState) =>
      prevState === "permanent" ? "temporary" : "permanent",
    );
  };

  const container =
    windowProp !== undefined ? () => windowProp().document.body : undefined;

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window?.scrollY >= 50;
      setIsScrolled(scrolled);
    };

    window?.addEventListener("scroll", handleScroll);

    return () => {
      window?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position="fixed"
        sx={{
          backgroundColor: isScrolled ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0)",
          paddingBlock: "8px",
          maxWidth: "100%",
          overflowY: "hidden",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: "flex", md: "none" } }}
          >
            <MenuOutlined />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 4 }}>
            <Link href="/">
              {/*<img className="logo" src={logo.src} alt="Logo" />*/}
                IMAGE
            </Link>
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              className="navBarItem"
            >
              <AccountCircle style={{ fontSize: "2rem" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={!isObjectEmpty(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleNavigation();
                  router.push("/account");
                }}
              >
                My account
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <div style={{ color: theme.palette.red.redA400 }}>Log out</div>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          display: { xs: "none", md: "block" },
          overflowY: "hidden",
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant={variant}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "rgb(241 245 249)",
            },
          }}
        >
          <div>
            {/*<Toolbar />*/}
            {/*<Typography*/}
            {/*  variant="h6"*/}
            {/*  component="div"*/}
            {/*  sx={{*/}
            {/*    display: { xs: "none", sm: "flex" },*/}
            {/*    justify: "center",*/}
            {/*  }}*/}
            {/*>*/}
            <div className="flex justify-center h-12 my-8">
              <img src={logo.src} alt="Logo" />
            </div>
            {/*</Typography>*/}
            <Divider />
            <List>
              {adminMenuItems.map(
                (item, index) =>
                  !item?.hide && (
                    <div
                      key={index}
                      onClick={() => {
                        if (pathname !== item.route) {
                          router.push(item.route);
                          handleNavigation();
                        }
                      }}
                    >
                      <ListItemButton
                        style={{
                          color:
                            pathname === item.route
                              ? theme.palette.primary.blue900
                              : "",
                        }}
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </div>
                  ),
              )}
            </List>
            <Divider />
          </div>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          maxHeight: { sm: "100vh" },
          height: { sm: "100%" },
          // overflowY: "hidden",
        }}
      >
        <div className="bg-gradient-to-b from-indigo-800 to-midnightBlue-700 h-full min-h-screen">
          {children}
        </div>
      </Box>
    </Box>
  );
};

export default AdminNavBar;
