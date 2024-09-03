'use client'
import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { collection, doc, getDoc, setDoc, writeBatch, getDocs, updateDoc, arrayRemove } from 'firebase/firestore'
import { db } from '@/firebase'
import { useRouter } from 'next/navigation'
import { Card, Container, Grid, CardActionArea, CardContent, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material'

export default function Flashcard() {
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [flashcards, setFlashcards] = useState([])
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [name, setName] = useState('')
  const [currentFlashcard, setCurrentFlashcard] = useState(null)
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  // Centralize the flashcard fetching logic
  const getFlashcards = async () => {
    if (!user) return
    setLoading(true)
    try {
      const docRef = doc(collection(db, 'users'), user.id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || []
        setFlashcards(collections)
      } else {
        await setDoc(docRef, { flashcards: [] })
      }
    } catch (error) {
      console.error('Error fetching flashcards:', error)
    } finally {
      setLoading(false)
    }
  }

  // Call the fetch function in useEffect
  useEffect(() => {
    getFlashcards()
  }, [user])

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`)
  }

  const handleDeleteSubmit = (set) => {
    setCurrentSet(set)
    setDeleteDialogOpen(true)
  }

  const handleDeleteClick = async (flashcardSetName) => {
    if (!user) return

    if (window.confirm('Are you sure you want to delete this flashcard?')) {

      try {
        const userDocRef = doc(db, 'users', user.id)
        const flashcardSetRef = collection(userDocRef, flashcardSetName)

        // Fetch all flashcards in the set
        const flashcardsSnapshot = await getDocs(flashcardSetRef)

        // Start a batch to delete all flashcards in the set
        const batch = writeBatch(db)

        flashcardsSnapshot.forEach((doc) => {
          batch.delete(doc.ref)
        })

        // Commit the batch deletion
        await batch.commit()

        // Remove the flashcard set from the user's flashcards array
        await updateDoc(userDocRef, {
          flashcards: arrayRemove({ name: flashcardSetName })
        })

        console.log("Flashcard set deleted successfully")

        // Refresh the flashcards list after deletion
        
        await getFlashcards()
        if (flashcards.length === 1) {
          router.push('/generate')
        }

      } catch (error) {
        console.error("Error deleting flashcard set:", error)
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

        // Refresh the flashcards list after editing
        getFlashcards()
      }
    } catch (error) {
      console.error('Error editing flashcard:', error)
      alert('Failed to edit flashcard.')
    }
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.length > 0 ? (
          flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  backgroundColor: '#606060',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.4), 0 6px 6px rgba(0,0,0,0.2)', // Enhanced 3D shadow
                  borderRadius: '12px', // Smooth rounded corners
                  transition: 'transform 0.3s, box-shadow 0.3s', // Smooth hover effect
                  '&:hover': {
                    transform: 'translateY(-5px)', // Slight lift on hover
                    boxShadow: '0 20px 30px rgba(0,0,0,0.5), 0 8px 8px rgba(0,0,0,0.3)', // Stronger shadow on hover
                  },
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
                      textAlign: 'center', // Center the text for better aesthetics

                    }}
                  >
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{ mt: 3, color: '#ffffff', textTransform: 'capitalize', textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}

                    >
                      {flashcard.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                  <Button
                    variant="contained" // Change from "outlined" to "contained"
                    color="primary"
                    onClick={() => handleEditClick(flashcard)}
                    sx={{
                      boxShadow: 3, // Add box shadow
                      transition: 'all 0.5s ease',
                      '&:hover': {
                        transform: 'scale(1.05)', // Slightly increase the size
                      },
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="contained" // Change from "outlined" to "contained"
                    color="secondary"
                    onClick={() => handleDeleteClick(flashcard.name)}
                    sx={{
                      boxShadow: 3, // Add box shadow
                      transition: 'all 0.5s ease',
                      '&:hover': {
                        transform: 'scale(1.05)', // Slightly increase the size
                      },
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h4" sx={{ mt: 35, textAlign: 'center', color: '#606060', width: '100%' }}>
            No flashcards available. Please create one!
          </Typography>
        )}
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
            type="button"
            onClick={handleEditSave}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
