import React, { useContext } from 'react'
import NoteContext from "../context/noteContext"

export default function NoteItem(props) {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const handleDelete = () => {
        deleteNote(props.note._id);
    }
    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{props.note.title}</h5>
                    <p className="card-text">{props.note.description}</p>
                    <p className="text-muted">{props.note.tag}</p>
                    <i className="fa-solid fa-trash me-5" onClick={handleDelete}></i>
                    <i className="fa-solid fa-pen-to-square" onClick={() => props.updateNote(props.note)}></i>
                </div>
            </div>
        </div>
    )
}
