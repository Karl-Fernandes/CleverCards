'use client'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useRouter } from 'next/navigation'
import { Card, Container, Grid, CardActionArea, CardContent, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material'

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState([])
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [name, setName] = useState('')
  const [currentFlashcard, setCurrentFlashcard] = useState(null)
  const router = useRouter()

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return
      const docRef = doc(collection(db, 'users'), user.id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || []
        setFlashcards(collections)
      } else {
        await setDoc(docRef, { flashcards: [] })
      }
    }
    getFlashcards()
  }, [user])

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`)
  }

  const handleDeleteClick = async (flashcardName) => {
    if (window.confirm('Are you sure you want to delete this flashcard?')) {
      try {
        const userDocRef = doc(collection(db, 'users'), user.id)
        const docSnap = await getDoc(userDocRef)
        
        if (docSnap.exists()) {
          const collections = docSnap.data().flashcards || []
          const updatedCollections = collections.filter((fc) => fc.name !== flashcardName)
          await setDoc(userDocRef, { flashcards: updatedCollections }, { merge: true })
          setFlashcards(updatedCollections)
        }
      } catch (error) {
        console.error('Error deleting flashcard:', error)
        alert('Failed to delete flashcard.')
      }
    }
  }

  const handleEditClick = (flashcard) => {
    setCurrentFlashcard(flashcard)
    setName(flashcard.name)
    setEditDialogOpen(true)
  }

  const handleEditSave = async () => {
    if (!name.trim()) {
      alert('Please enter a valid name.')
      return
    }

    try {
      const userDocRef = doc(collection(db, 'users'), user.id)
      const docSnap = await getDoc(userDocRef)
      
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || []
        const updatedCollections = collections.map((fc) =>
          fc.name === currentFlashcard.name ? { ...fc, name } : fc
        )
        await setDoc(userDocRef, { flashcards: updatedCollections }, { merge: true })
        setFlashcards(updatedCollections)
        setEditDialogOpen(false)
        setCurrentFlashcard(null)
      }
    } catch (error) {
      console.error('Error editing flashcard:', error)
      alert('Failed to edit flashcard.')
    }
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#606060',
                boxShadow: 3,
              }}
            >
              <CardActionArea
                onClick={() => handleCardClick(flashcard.name)}
                sx={{
                  height: '100%',
                  display: 'flex',
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    height: '100%',
                    padding: '16px',
                  }}
                >
                  <Typography variant="h5" component="div" sx={{ mt: 3, color: '#ffffff' }}>
                    {flashcard.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEditClick(flashcard)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeleteClick(flashcard.name)}
                >
                  Delete
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
  <DialogTitle>Edit Flashcard Set</DialogTitle>
  <DialogContent>
    <DialogContentText>
      Please enter a new name for your flashcard set.
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
    <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
    <Button
      type="button" // Ensure this button does not trigger form submission
      onClick={handleEditSave}
      color="primary"
      autoFocus // Optional: Makes sure this button is focused when the dialog opens
    >
      Save
    </Button>
  </DialogActions>
</Dialog>

    </Container>
  )
}
