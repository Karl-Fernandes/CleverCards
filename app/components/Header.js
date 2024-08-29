import { AppBar, Toolbar, Button, Link, Box } from "@mui/material";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)",
        color: "#000000",
      }}
    >
      <Toolbar sx={{ justifyContent: "center", color: "#000000" }}>
        <Link
          href="/"
          variant="h6"
          sx={{ flexGrow: 1, color: "#000000", textDecoration: "none" }}
        >
          CleverCards
        </Link>

        <Box>
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
          <SignedIn>
            <Box sx={{ paddingRight: "30px", transform: "scale(1.5)" }}>
              <UserButton />
            </Box>
          </SignedIn>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
