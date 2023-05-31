import React, { useContext, useState } from 'react'
import NoteContext from "../context/noteContext"

export default function AddNote() {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [newNote, setNewNote] = useState({
        title: "",
        description: "",
        tag: ""
    })

    const onChange = (e) => {
        setNewNote({ ...newNote, [e.target.name]: e.target.value });
    }

    const handleAddNote = (e) => {
        e.preventDefault();
        addNote(newNote.title, newNote.description, newNote.tag);
        setNewNote({
            title: "",
            description: "",
            tag: ""
        })
    }

    return (
        <>
            <form method='post'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input name='title' type="text" className="form-control" id="title" onChange={onChange} value={newNote.title} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input name='description' type="text" className="form-control" id="description" onChange={onChange} value={newNote.description} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input name='tag' type="text" className="form-control" id="tag" onChange={onChange} value={newNote.tag} />
                </div>
                <button type="submit" className="btn btn-success" onClick={handleAddNote}>Add Note</button>
            </form>
        </>
    )
}
