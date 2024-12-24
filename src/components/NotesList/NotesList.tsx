import React, { useEffect, useState } from 'react';
import { fetchNotes, deleteNote, Note } from '../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

interface NotesListProps {
    newNotes?: Note[];
}

const NotesList: React.FC<NotesListProps> = ( { newNotes } ) => {
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        fetchNotes()
        .then(data => setNotes(data))
        .catch(error => console.error('Error fetching notes', error));
    }, []);

    useEffect(() => {
        if (newNotes) {
            setNotes(newNotes);
        }
    }, [newNotes]);

    const handleDelete = (id: number) => {
        deleteNote(id)
        .then(() => setNotes(notes.filter(note => note.id !== id)))
        .catch(error => console.error('Error deleting note', error));
    };

    const handleRefresh = () => {
        fetchNotes()
        .then(data => setNotes(data))
        .catch(error => console.error('Error fetching notes', error));
    };

    return (
        <div className='notes'>
            <div className='notes-header'>
                <h2>Notes</h2>
                <button className='icon-button refresh' onClick={handleRefresh}>
                    <FontAwesomeIcon icon={faSyncAlt} />
                </button>
            </div>
            <ul className='notes-list'>
                {notes.map(note => (
                    <li className ='notes-item' key={note.id}>
                        {note.content}
                        <button className='icon-button delete' onClick={() => handleDelete(note.id)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotesList;