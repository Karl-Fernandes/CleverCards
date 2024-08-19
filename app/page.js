"use client"; // This makes the entire file a client component

import Image from "next/image";
import Head from "next/head";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Container, Typography, AppBar, Toolbar, Button, Box, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-scroll";

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
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            CleverCards
          </Typography>
          <Box sx={{ ml: "auto" }}>
            <SignedOut>
              <Button sx={{ color: "#000000", marginRight: "16px" }}>Login</Button>
              <Button sx={{ color: "#000000", marginRight: "16px" }}>Sign Up</Button>
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
            height: "80vh",
            textAlign: "center",
          }}
        >
          <Typography variant="h2" sx={{ mb: 2 }}>
            Welcome to CleverCards
          </Typography>
          <Typography sx={{ mb: 3 }}>
            The easiest way to make flashcards from your prompts
          </Typography>
          <Link
            to="features"
            smooth={true}
            duration={1000}
            offset={50} // Adjust offset to ensure perfect alignment
          >
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)",
                color: "#ffffff",
                transition: "all 1s ease",
                "&:hover": {
                  transform: "scale(1.05)", // Slightly increase the size
                },
              }}
            >
              Get Started
            </Button>
          </Link>
        </Box>

        <Box
          id="features"
          sx={{
            mt: 20, // Increase this value to push the features section out of view
            minHeight: "100vh",
            paddingTop: "20px",
          }}
        >
          <Typography variant="h4" textAlign="center">Features</Typography>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image="/images/"
              title="Easy text input"
            />       
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Easy Text Input
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Simply enter your text and let our software do the rest. Creating flashcards has
                never been easier
              </Typography>
            </CardContent>
          </Card>

          
        </Box>
      </Container>
    </>
  );
}
