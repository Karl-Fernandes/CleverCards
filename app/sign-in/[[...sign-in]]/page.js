import { SignIn } from "@clerk/nextjs";
import { AppBar, Box, Link, Toolbar, Typography, Button } from "@mui/material";
import { shadesOfPurple } from "@clerk/themes";

export default function SignUpPage() {
  return (
    <div>
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