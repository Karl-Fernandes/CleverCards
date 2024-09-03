'use client';
import { useUser } from "@clerk/nextjs";
import { useEffect, useState, useCallback } from "react";
import { db } from "../../firebase.js";
import { collection, doc, getDocs } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import {
    Container,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    CardActionArea,
  } from '@mui/material';

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState({});
  
    const searchParams = useSearchParams();
    const search = searchParams.get('id');
  
    const getFlashcard = useCallback(async () => {
        if (!search || !user) return;

        const colRef = collection(doc(collection(db, 'users'), user.id), search);
        const docs = await getDocs(colRef);
        const uniqueFlashcards = [];

        docs.forEach((doc) => {
          const flashcard = { id: doc.id, ...doc.data() };
          if (!uniqueFlashcards.some(f => f.id === flashcard.id)) {
            uniqueFlashcards.push(flashcard);
          }
        });

        setFlashcards(uniqueFlashcards);
    }, [search, user]);

    useEffect(() => {
        getFlashcard();
    }, [getFlashcard]);

    const handleCardClick = (index) => {
        setFlipped((prev) => ({
          ...prev,
          [index]: !prev[index],
        }));
    }

    if (!isLoaded || !isSignedIn) {
        return <></>;
    }

    return (
        <Container maxWidth="md">
          <Grid container spacing={3} sx={{ mt: 4 }}>
          {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    borderRadius: '23px',
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <CardActionArea onClick={() => handleCardClick(index)}>
                    <CardContent sx={{ padding: 0 }}>
                      <Box
                        sx={{
                          height: '100%',
                          width: '100%',
                          perspective: '1000px',
                          background: 'linear-gradient(160deg, #2E3192 0%, #1BFFFF 100%)',
                          color: '#ffffff',
                          textAlign: 'center',
                          borderRadius: '23px',
                          '& > div': {
                            transition: 'transform 0.6s',
                            transformStyle: 'preserve-3d',
                            position: 'relative',
                            width: '100%',
                            height: '200px',
                            boxShadow: 'none',
                            transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                          },
                          '& > div > div': {
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            backfaceVisibility: 'hidden',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 2,
                            boxSizing: 'border-box',
                          },
                          '& > div > div:nth-of-type(2)': {
                            transform: 'rotateY(180deg)',
                            height: '100%',
                            width: '100%',
                            perspective: '1000px',
                            background: 'linear-gradient(to right, #D4145A , #FBB03B)',
                            color: '#ffffff',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                          },
                        }}
                      >
                        <div>
                          <div>
                            <Typography variant="h5" component="div">
                              {flashcard.front}
                            </Typography>
                          </div>
                          <div>
                            <Typography variant="h5" component="div">
                              {flashcard.back}
                            </Typography>
                          </div>
                        </div>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
    );
}
