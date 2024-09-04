"use client";

import {
  AppBar,
  Toolbar,
  Button,
  Link,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from "@mui/icons-material/Description";
import UploadIcon from '@mui/icons-material/Upload';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import HomeIcon from '@mui/icons-material/Home';
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (openState) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setOpen(openState);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)",
        color: "#000000",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#000000",
        }}
      >
        {/* Hamburger Menu Icon */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
          sx={{
            display: { xs: "block", sm: "none" }, // Show only on small screens
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* CleverCards Logo/Title */}
        <Link
          href="/"
          variant="h6"
          sx={{
            flexGrow: {
              xs: 1,
              sm: 1,
            },
            color: "#000000",
            textDecoration: "none",
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          CleverCards
        </Link>

        {/* Right-side Elements */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <SignedOut>
              <Button
                variant="contained"
                sx={{
                  marginRight: "16px",
                  borderRadius: "50px",
                  padding: "10px 30px",
                  backgroundColor: "#000000",
                }}
              >
                <Link
                  sx={{ color: "#ffffff", textDecoration: "none" }}
                  href="/sign-in"
                >
                  Login
                </Link>
              </Button>
              <Button
                variant="contained"
                sx={{
                  marginRight: "16px",
                  borderRadius: "50px",
                  padding: "10px 30px",
                  backgroundColor: "#000000",
                }}
              >
                <Link
                  sx={{ color: "#ffffff", textDecoration: "none" }}
                  href="/sign-up"
                >
                  Sign Up
                </Link>
              </Button>
            </SignedOut>
          </Box>
          <SignedIn>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button
                component={Link}
                href="/"
                sx={{ color: "#000000", textDecoration: "none" }}
              >
                Home
              </Button>
              <Button
                component={Link}
                href="/generate"
                sx={{ color: "#000000", textDecoration: "none" }}
              >
                Generate
              </Button>
              <Button
                component={Link}
                href="/flashcards"
                sx={{ color: "#000000", textDecoration: "none", mr: 2.5 }}
              >
                Collection
              </Button>
            </Box>

            {/* UserButton on small screens */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: {
                  xs: "flex-start", // Align to the left on extra-small screens
                  sm: "flex-end", // Align to the right on small screens and up
                },
                paddingLeft: {
                  xs: "10px", // Adjust left padding for small screens
                  sm: "0px",
                },
                textAlign: {
                  xs: "center",
                  sm: "left",
                },
                transform: "scale(1.5)",
              }}
            >
              <UserButton />
            </Box>
          </SignedIn>
        </Box>
      </Toolbar>

      {/* Drawer for Mobile View */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            p: 2,
            width: 250,
            backgroundColor: "#dbc8ff",
            height: "100%",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {/* Close Icon */}
          <IconButton onClick={toggleDrawer(false)} sx={{ mb: 2 }}>
            <CloseIcon />
          </IconButton>

          <Divider sx={{ mb: 2 }} />

          {/* Drawer List */}
          <List>
            <SignedOut>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/sign-in">
                  <ListItemIcon>
                    <LoginIcon sx={{ color: "primary.main" }} />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/sign-up">
                  <ListItemIcon>
                    <DescriptionIcon sx={{ color: "primary.main" }} />
                  </ListItemIcon>
                  <ListItemText primary="Sign Up" />
                </ListItemButton>
              </ListItem>
            </SignedOut>
            <SignedIn>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/">
                  <ListItemIcon>
                    <HomeIcon sx={{ color: "primary.main" }} />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/generate">
                  <ListItemIcon>
                    <UploadIcon sx={{ color: "primary.main" }} />
                  </ListItemIcon>
                  <ListItemText primary="Generate" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="/flashcards">
                  <ListItemIcon>
                    <BookmarkAddedIcon sx={{ color: "primary.main" }} />
                  </ListItemIcon>
                  <ListItemText primary="Collection" />
                </ListItemButton>
              </ListItem>
            </SignedIn>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;
