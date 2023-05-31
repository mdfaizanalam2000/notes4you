import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from "../context/noteContext"
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

export default function Notes() {
    const navigate = useNavigate();
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        localStorage.getItem("token");
        if (localStorage.getItem("token")) {
            getNotes();
        }
        else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [notes])

    const [note, setNote] = useState({
        id: "",
        title: "",
        description: "",
        tag: ""
    })

    const ref = useRef(null);
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            title: currentNote.title,
            description: currentNote.description,
            tag: currentNote.tag
        })
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const handleSaveEdit = () => {
        editNote(note.id, note.title, note.description, note.tag);
    }

    return (
        <>
            <div className='row'>
                <h2 className='text-center'>Your notes</h2>
                {notes.length === 0 && "Add notes to see here"}
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} updateNote={updateNote} />;
                })}
            </div>
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch Modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit your note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form method='post'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input name='title' type="text" className="form-control" id="title" onChange={onChange} value={note.title} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input name='description' type="text" className="form-control" id="description" onChange={onChange} value={note.description} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input name='tag' type="text" className="form-control" id="tag" onChange={onChange} value={note.tag} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSaveEdit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
