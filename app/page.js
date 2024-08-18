import Image from "next/image";
import Head from "next/head";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Container, Typography, AppBar, Toolbar, Button, Box } from "@mui/material";

export default function Home() {
  return (
    <>
      <Head>
        <title>CleverCards</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      <AppBar
        position="static"
        sx={{
          background: "linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)",
          color: "#000000",
        }}
      >
        <Toolbar sx={{ justifyContent: "center" }}> {/* Center the toolbar contents */}
          <Typography variant="h6" sx={{ flexGrow: 1}}>
            CleverCards
          </Typography>
          <Box sx={{ ml: "auto" }}> {/* Push buttons to the right side */}
            <SignedOut>
              <Button sx={{ color: "#000000", marginRight: "16px" }}>Login</Button>
              <Button sx={{ color: "#000000", marginRight: "16px"}}>Sign Up</Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh", // Adjust the height to center the content vertically
            textAlign: "center",
          }}
        >
          <Typography variant="h2" sx={{ mb: 2 }}>
            Welcome to CleverCards
          </Typography>
          <Typography sx={{ mb: 3 }}>
            The easiest way to make flashcards from your prompts
          </Typography>
          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)",
              color: "#ffffff",
              transition: "all 1s ease", // Smooth transition for all changes
              "&:hover": {
                transform: "scale(1.05)", // Slightly increase the size
              },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Container>
    </>
  );
}
