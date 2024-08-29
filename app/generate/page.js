'use client';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper
} from '@mui/material';
import { db } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { collection, doc, getDoc, writeBatch } from 'firebase/firestore';

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim() || isLoading) return;

    setIsLoading(true); // Start loading

    try {
      const response = await fetch('api/generate', {
        method: 'POST',
        body: text,
      });

      const data = await response.json();
      setFlashcards(data); // Set the flashcards from the response
    } catch (error) {
      console.error('Error generating flashcards:', error);
    } finally {
      setText('');
      setIsLoading(false); // Stop loading after the fetch is completed or fails
    }
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const saveFlashcards = async () => {
    if (!name) {
      alert('Please enter a name');
      return;
    }

    const batch = writeBatch(db);
    const userDocRef = doc(collection(db, 'users'), user.id);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || [];
      if (collections.find((f) => f.name === name)) {
        alert('Flashcard collection with that name already exists');
        return;
      } else {
        collections.push({ name });
        batch.set(userDocRef, { flashcards: collections }, { merge: true });
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] });
    }

    const colRef = collection(userDocRef, name);
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef);
      batch.set(cardDocRef, flashcard);
    });

    await batch.commit();
    handleClose();
    router.push('/flashcards');
  };

  return (
    <Container maxWidth="100%">
      <Box
        sx={{
          mt: 4,
          mb: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" sx={{ color: '#ffffff', mb: 3 }}>
          Generate Flashcards
        </Typography>
        <Paper sx={{ p: 4, width: '95vw', backgroundColor: '#202c34' }}>
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter Text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Adjust this value as needed
              },
            }}
            InputProps={{
              style: { backgroundColor: '#606060' }, 
              sx: {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#606060', // Default outline color (white)
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#cccccc', // Outline color when hovered (light gray)
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ffffff', // Outline color when focused (red)
                },
              }
            }}
            InputLabelProps={{
              style: { color: '#ffffff' } // Light gray label
            }}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <Button
            variant="contained"
            sx={{
              borderRadius: '50px',
              padding: '10px 30px',
              transition: 'all 0.5s ease',
              '&:hover': {
                transform: 'scale(1.02)', // Slightly increase the size
              },
            }}
            onClick={handleSubmit}
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </Button>
        </Paper>
      </Box>

      {flashcards.length > 0 && (
        <Box sx={{ mt: 4, color: '#ffffff', width: '100%' }}>
          <Typography
            sx={{
              variant: 'h1',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#ffffff',
              mb: 4
            }}
          >
            Flashcards Preview
          </Typography>

          <Grid container spacing={3}>
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

          <Box sx={{ mt: 4, mb: 1, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                width: '100%',
                maxWidth: '7.5%',
                borderRadius: '50px',
                padding: '10px 30px',
                transition: 'background-color 0.2s ease-in',
                '&:hover': {
                  backgroundColor: 'primary.main'
                }
              }}
              onClick={handleOpen}
            >
              Save
            </Button>
          </Box>
        </Box>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Flashcard Set</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for your flashcard set.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Set Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={saveFlashcards} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
