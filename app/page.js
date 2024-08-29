"use client"; // This makes the entire file a client component

import Head from "next/head";
import getStripe from "@/utils/get-stripe";
import { Container, Typography, Button, Box, Card, CardContent, Grid, AppBar, IconButton} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram'
import CheckIcon from '@mui/icons-material/Check';
import { Link as ScrollLink } from "react-scroll"; // Import react-scroll for smooth scrolling

export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        "origin": "https://clever-cards.vercel.app/" // Corrected syntax
      },
    })

    const checkoutSessionJson = await checkoutSession.json()
    
    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })
    if (error) {
      console.warn(error.message)
    }
  }

  return (
    <div sx={{backgroundColor: "#ffffff"}}>
      <Head>
        <title>CleverCards</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      

      <Container maxWidth={false} >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh", // Reduced from 80vh to 60vh to move the "Features" section higher
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "4rem", // Equivalent to "text-4xl" (36px)
            textAlign: "center", // Equivalent to "text-center"
            fontWeight: "bold", // Equivalent to "font-bold"
            background: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Welcome to CleverCards
        </Typography>
        <Typography
          sx={{
            mb: 3,
            color: "#BDBDBD",
          }}
        >
          The easiest way to make flashcards from your prompts
        </Typography>
          <a href="/generate">
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)",
                borderRadius: "50px",
                padding: "10px 30px",
                color: "#ffffff",
                fontWeight: "bold",
                transition: "all 1s ease",
                "&:hover": {
                  transform: "scale(1.05)", // Slightly increase the size
                },
              }}
            >
              Get Started
            </Button>
          </a>

      </Box>

      <Box
        id="features"
        sx={{
          minHeight: "80vh", // Reduced height
          paddingTop: "20px",
        }}
      >
        <Typography
          variant="h6"
          textAlign="center"
          
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
            background: "linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 3
          }}
        >
      Features
    </Typography>
          
          <Grid container spacing={4} justifyContent="center">
            <Grid item>
              <Card
                sx={{
                  maxWidth: 345,
                  borderRadius: 4, // This rounds the corners of the card (higher value = more rounded)
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Optional: Adds a subtle shadow for a nicer effect
                  backgroundColor: "#243644",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition for both transform and shadow
                  "&:hover": {
                    transform: "translateY(-10px)", // Move the card up by 10px on hover
                    boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.15)", // Slightly increase shadow on hover
                  },
                }}
              >
                <CardContent>
                  <Typography  variant="h6" component="div" textAlign="center"
                    sx={{
                      fontWeight: "bold",
                      background: "#5eead4",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}>
                    Easy Text Input
                  </Typography>
                  <img
                    src="/images/01.png"
                    alt="Easy text input"
                    style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "16px" }}
                  />
                  <Typography variant="body1" sx={{ 
                      mt: 2, 
                      color: "#BDBDBD"
                    }}>
                    Simply enter your text and let our software do the rest. Creating flashcards has never been easier.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item>
              <Card
               sx={{
                maxWidth: 345,
                borderRadius: 4, // This rounds the corners of the card (higher value = more rounded)
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Optional: Adds a subtle shadow for a nicer effect
                backgroundColor: "#243644",
                transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition for both transform and shadow
                "&:hover": {
                  transform: "translateY(-10px)", // Move the card up by 10px on hover
                  boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.15)", // Slightly increase shadow on hover
                },
              }}
              >
                <CardContent>
                  <Typography  variant="h6" component="div" textAlign="center"
                    sx={{
                      fontWeight: "bold",
                      background: "#5eead4",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}>
                    AI Generated Flashcards
                  </Typography>
                  <img
                    src="/images/02.png"
                    alt="Easy text input"
                    style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "16px" }}
                  />
                  <Typography variant="body1" sx={{ 
                    mt: 2,
                    color: "#BDBDBD", 
                  }}>
                  Automatically generate personalized flashcards from any content using advanced AI technology.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card
                sx={{
                  maxWidth: 345,
                  borderRadius: 4, // This rounds the corners of the card (higher value = more rounded)
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Optional: Adds a subtle shadow for a nicer effect
                  backgroundColor: "#243644",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease", // Smooth transition for both transform and shadow
                  "&:hover": {
                    transform: "translateY(-10px)", // Move the card up by 10px on hover
                    boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.15)", // Slightly increase shadow on hover
                  },
                }}
              >
                <CardContent>
                  <Typography  variant="h6" component="div" textAlign="center"
                    sx={{
                    fontWeight: "bold",
                    background: "#5eead4",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                    Quick and Easy Setup
                  </Typography>
                  <img
                    src="/images/03.png"
                    alt="Easy text input"
                    style={{ width: "100%", height: "auto", objectFit: "cover", borderRadius: "16px" }}
                  />
                  <Typography variant="body1" sx={{ 
                    mt: 2, 
                    color: "#BDBDBD"
                  }}>
                  Get started in minutes with an intuitive interface that makes it easy to create, organize, and study your flashcards.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
      </Box>

        <Box id='pricing' sx={{mt: 5, mb: 10, textAlign:"center"}}>
          <Typography variant="h6"
          textAlign="center"
          
          sx={{
            fontSize: "2.2rem",
            fontWeight: "bold", // Equivalent to "font-bold"
            background: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "1px", // Reduce the space between this and the next Typography element
          }}>
            Pricing
            </Typography>
          <Typography sx={{
            color: "#BDBDBD",
            mb: 5
          }}>
            Choose Your Learning Journey
          </Typography>

          
          <Grid container spacing={3} justifyContent="center" alignItems="center" // Vertically center the grid items
          >
            <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
            <Card
              sx={{
                maxWidth: 465,
                width: '100%',  // Ensures the card takes up full width of the grid item

                borderRadius: 4, // Rounded corners
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow
                backgroundColor: "#243644", // Dark background color
                background: "linear-gradient(to right, #868f96 0%, #596164 100%)",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Smooth transition for hover effects
                "&:hover": {
                  transform: "scale3d(1.05, 1.05, 1)", // Lift card on hover
                  boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.15)", // Increase shadow on hover
                },
              }}
            >
              <CardContent>
                <Typography
                  
                  variant="h6"
                  component="div"
                  textAlign="center"
                  sx={{
                    fontSize: "1.4rem",
                    fontWeight: "900", // Make "Basic" bold
                    color: "#ffffff", // White text color
                    mb: "0.2rem", // Adjust the bottom margin of "Basic"
                  }}
                >
                  Basic
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "700", // Make "Free" bold
                    mt: "0.4rem", // Adjust the top margin of "Free"
                    color: "#ffffff", // White text color
                  }}
                >
                  Free
                </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center', color: '#ffffff', mt: 2 }}>
                  <CheckIcon sx={{ mr: 1, color: 'green' }} />
                  Limited Storage
                </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center', color: '#ffffff', mt: 1, mb: 2  }}>
                  <CheckIcon sx={{ mr: 1, color: 'green' }} />
                  Access to basic flashcards
                </Typography>
                <a href="/generate">
                  <Button  variant="contained"
                    sx={{
                      background: "#ffffff",
                      width: "100%",
                      borderRadius: "50px",
                      padding: "10px 30px",
                      color: "#000000",
                      fontWeight: "bold",
                      transition: "all 1s ease",
                      "&:hover": {
                        transform: "scale(1.05)", // Slightly increase the size
                        background: "#ffffff", // Maintain the same background color on hover
                        color: "#000000", // Maintain the same text color on hover
                      },
                    }}>
                  Get Started
                </Button>
              </a>
              </CardContent>
            </Card>

            </Grid>

            <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
            <Card
              sx={{
                width: "100%",
                maxWidth: 465,
                borderRadius: 4, // Rounded corners
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow
                backgroundColor: "#243644",
                background: "linear-gradient(90deg, #1CC0A4 0%, #1A73E8 100%)",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Smooth transition for hover effects
                "&:hover": {
                  transform: "scale3d(1.05, 1.05, 1)", // Lift card on hover
                  boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.15)", // Increase shadow on hover
                },
              }}
            >
              <CardContent>
                <Typography
                  
                  variant="h6"
                  component="div"
                  textAlign="center"
                  sx={{
                    fontSize: "1.4rem",
                    fontWeight: "900", // Make "Basic" bold
                    color: "#ffffff", // White text color
                    mb: "0.2rem", // Adjust the bottom margin of "Basic"
                  }}
                >
                  Pro
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "700", // Make "Free" bold
                    mt: "0.4rem", // Adjust the top margin of "Free"
                    color: "#ffffff", // White text color
                  }}
                >
	                  $10 / Month
                  </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center', color: '#ffffff', mt: 2 }}>
                  <CheckIcon sx={{ mr: 1, color: 'green' }} />
                  Unlimited Flashcards 
                </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center', color: '#ffffff', mt: 1, mb: 2  }}>
                  <CheckIcon sx={{ mr: 1, color: 'green' }} />
                  Unlimited Storage
                </Typography>
                <Button  variant="contained"
                  sx={{
                    background: "#ffffff",
                    width: "100%",
                    borderRadius: "50px",
                    padding: "10px 30px",
                    color: "#000000",
                    fontWeight: "bold",
                    transition: "all 1s ease",
                    "&:hover": {
                      transform: "scale(1.05)", // Slightly increase the size
                      background: "#ffffff", // Maintain the same background color on hover
                      color: "#000000", // Maintain the same text color on hover
                    },
                  }}
                  onClick={handleSubmit}>
                Choose Plan
              </Button>
              </CardContent>
            </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center">
            <Card
              sx={{
                width: "100%",
                maxWidth: 465,
                borderRadius: 4, // Rounded corners
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow
                backgroundColor: "#243644",
                background: "radial-gradient(1173px at -3.5% -4.8%, rgb(255, 140, 16) 8.4%, rgb(255, 26, 26) 20.6%, rgb(0, 64, 249) 46.7%, rgb(131, 201, 8) 69.6%, rgb(255, 230, 28) 84.7%)",
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Smooth transition for hover effects
                "&:hover": {
                  transform: "scale3d(1.05, 1.05, 1)", // Lift card on hover
                  boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.15)", // Increase shadow on hover
                  
                },
              }}
            >
              <CardContent>
                <Typography
                  
                  variant="h6"
                  component="div"
                  textAlign="center"
                  sx={{
                    fontSize: "1.4rem",
                    fontWeight: "900", // Make "Basic" bold
                    color: "#ffffff", // White text color
                    mb: "0.2rem", // Adjust the bottom margin of "Basic"
                  }}
                >
                  Enterprise
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "700", // Make "Free" bold
                    mt: "0.4rem", // Adjust the top margin of "Free"
                    color: "#ffffff", // White text color
                  }}
                >
	                  Custom
                  </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center', color: '#ffffff', mt: 2 }}>
                  <CheckIcon sx={{ mr: 1, color: 'green' }} />
                  Advanced Security
                </Typography>
                <Typography sx={{ display: 'flex', alignItems: 'center', color: '#ffffff', mt: 1, mb: 2  }}>
                  <CheckIcon sx={{ mr: 1, color: 'green' }} />
                  Dedicated Account Manager
                </Typography>
                <Button  variant="contained"
                  sx={{
                    background: "#ffffff",
                    width: "100%",
                    borderRadius: "50px",
                    padding: "10px 30px",
                    color: "#000000",
                    fontWeight: "bold",
                    transition: "all 1s ease",
                    "&:hover": {
                      transform: "scale(1.05)", // Slightly increase the size
                      background: "#ffffff", // Maintain the same background color on hover
                      color: "#000000", // Maintain the same text color on hover
                    },
                  }}>
                Currently Unavailable
              </Button>
              </CardContent>
            </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>


      <AppBar
      position="static"
      sx={{
        mt: 5,
        backgroundColor: '#100c14',
        color: "#ffffff",
      }}
    > 
      <Grid container spacing={3} justifyContent="center" alignItems="flex-start">
      <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center" >
        <Box sx={{ ml: 5, mt: 4 }}>
          <Typography
            variant="body1"
            textAlign="center"
            sx={{
              fontSize: "1.5rem",
              background: "linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
            }}
          >
            About Us
          </Typography>
          <Typography sx={{color:'#BDBDBD'}}>
            Revolutionizing learning through AI-powered flashcards.
          </Typography>
        </Box>
      </Grid>

      <Grid 
        item 
        xs={12} 
        sm={6} 
        md={4} 
        display="flex" 
        flexDirection="row"
        justifyContent="center" 
        alignItems="center"
      >
        <Box sx={{ ml: 5, mt: 4 }}>
          <Typography
            variant="body1"
            textAlign="start"
            sx={{
              fontSize: "1.5rem",
              background: "linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Quick Links
          </Typography>
          
          <Box sx={{ml: 2}}> 
            <ScrollLink
              to="features"
              smooth={true}
              duration={1000}
              offset={-20} // Adjust offset to ensure correct alignment
            >
              <Button
                sx={{
                  maxWidth: '100%',
                  color: "#BDBDBD",
                  textTransform: "none", // Ensures the text remains as you type it, not uppercase
                  fontSize: "1.1rem",
                  mb: '1px',
                  "&:hover": {
                    color: "#5eead4" // Set text color if needed to be visible on gradient background

                  }
                }}
              >
                Features
              </Button>
            </ScrollLink>
          </Box>

          <Box sx={{ml: 2.5, mt: '-10px'}}>
            <ScrollLink
              to="pricing"
              smooth={true}
              duration={1000}
              offset={-100} // Adjust offset to ensure correct alignment
            >
              <Button
                sx={{
                  maxWidth: '100%',
                  color: "#BDBDBD",
                  textTransform: "none", // Ensures the text remains as you type it, not uppercase
                  fontSize: "1.1rem",
                  "&:hover": {
                    color: "#5eead4" // Set text color if needed to be visible on gradient background

                  }
                }}
              >
                Pricing
              </Button>
            </ScrollLink>
          </Box>

        </Box>
      </Grid>


      <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center " sx={{ml: -1}}>
        <Box sx={{ ml: 5, mt: 4 }}>
          <Typography
            variant="body1"
            textAlign="center"
            sx={{
              fontSize: "1.5rem",
              background: "linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            Connect
          </Typography>        
          <Box sx={{ display: 'flex', gap: 2, ml: 1}}> {/* Removed the negative margin */}
            <IconButton 
              component="a" 
              href="https://github.com/karl-Fernandes" 
              target="_blank" 
              aria-label="GitHub"
              sx={{ color: "#BDBDBD" }}
            >
              <GitHubIcon fontSize="large" />
            </IconButton>

            <IconButton 
              component="a" 
              href="https://linkedin.com/in/karl-fernandes" 
              target="_blank" 
              aria-label="LinkedIn"
              sx={{ color: "#BDBDBD" }}
            >
              <LinkedInIcon fontSize="large" />
            </IconButton>

            <IconButton 
              component="a" 
              href="https://instagram.com/karl_fernandes_/" 
              target="_blank" 
              aria-label="Instagram"
              sx={{ color: "#BDBDBD" }}
            >
              <InstagramIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      </Grid>
    </Grid>
    <Typography textAlign= 'center' sx={{color: '#BDBDBD', mt: '30px', mb:'50px'}}>© 2024 CleverCards AI. Learning Smarter, Powered by AI</Typography>
      </AppBar>
    </div>
  );
}
