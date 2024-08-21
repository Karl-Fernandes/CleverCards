import { SignIn } from "@clerk/nextjs";
import { AppBar, Box, Link, Toolbar, Typography, Button } from "@mui/material";
import { shadesOfPurple } from "@clerk/themes";

export default function SignUpPage() {
  return (
    <div>
      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)",
          color: "#000000",
        }}
      >
        <Toolbar sx={{ justifyContent: "center", color: "#000000" }}>
          <Link href='/' variant="h6" sx={{ flexGrow: 1, color: "#000000", textDecoration: "none"  }}>
            CleverCards
          </Link>
          <Button
            variant="contained"
            sx={{
              marginRight: "16px",
              borderRadius: "50px",
              padding: "10px 30px",
              backgroundColor: "#000000",
            }}
          >
            <Link sx={{ color: "#ffffff", textDecoration: "none" }} href="/sign-in" passHref>
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
            <Link sx={{ color: "#ffffff", textDecoration: "none" }} href="/sign-up" passHref>
              Sign Up
            </Link>
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          textAlign: "center",
        }}
      >
        <Typography 
            variant="h7"
            textAlign="center"
            gutterBottom
            sx={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            background: "linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mt: 3
        }}> Sign In
        </Typography>
        <SignIn appearance={{ baseTheme: shadesOfPurple }} />
      </Box>
    </div>
  );
}