const API_BASE_URL = 'http://localhost:7070/notes';

export interface Note {
    id: number;
    content: string;
}

export const fetchNotes = async (): Promise<Note[]> => {
    const response = await fetch(API_BASE_URL);

    if  (!response.ok) {
        throw new Error('Failed to fetch notes');
    }
    return response.json();
};

export const deleteNote = async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {method: 'DELETE'});

    if (!response.ok) {
        throw new Error('Failed to delete note');
    }
};

export const addNote = async (content: string): Promise<Note[]> => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
    });

    if (!response.ok) {
        throw new Error('Failed to add note');
    }

    return fetchNotes();
};