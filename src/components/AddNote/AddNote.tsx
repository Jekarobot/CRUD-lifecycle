import React, { useState } from 'react'
import { addNote, Note } from '../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

interface AddNoteProps {
    onAddNote: (note: Note[]) => void;
}

const AddNote: React.FC<AddNoteProps> = ({ onAddNote }) => {
    const [content, setContent] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        addNote(content)
            .then(updatedNotes => {
                onAddNote(updatedNotes);
                setContent('');
            })            
            .catch(error => console.error('Error adding note', error));                
    };
    
    return (
        <form className='add-note' onSubmit={handleSubmit}>
            <div className='add-note-form'>
                <label htmlFor='content'>New Note:</label>
                <textarea
                    id='content'
                    value={content}
                    className='add-note-input'
                    onChange={event => setContent(event.target.value)}
                />
            </div>
            <button type='submit' className='icon-button submit'>{<FontAwesomeIcon icon={faPaperPlane} />}</button>
        </form>
    );
};

export default AddNote;