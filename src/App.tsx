import './App.css'
import { useState } from 'react'
import AddNote from './components/AddNote/AddNote'
import NotesList from './components/NotesList/NotesList'
import { Note } from './api'

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  const handleAddNote = (updatedNotes: Note[]) => {
    setNotes(updatedNotes);
  };

  return (
    <>
      <NotesList newNotes={notes} />
      <AddNote onAddNote={handleAddNote} />
    </>
  )
}

export default App
