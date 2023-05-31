import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:/api/notes";
    const initialNotes = [];
    const [notes, setNotes] = useState(initialNotes);

    //get all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/fetchNotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "check-token": localStorage.getItem("token")
            }
        })
        setNotes(await response.json());
    }

    //add a note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/addNote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "check-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        })

        const note = await response.json();
        setNotes(notes.concat(note));
    }

    //edit a note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/updateNote/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "check-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        })
        console.log(response);
    }

    //delete a note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/deleteNote/${id}`, {
            method: "DELETE",
            headers: {
                "check-token": localStorage.getItem("token")
            }
        })
        console.log(response);

        setNotes(notes.filter((note) => {
            return note._id !== id;
        }))
    }
    return (
        <NoteContext.Provider value={{ notes, getNotes, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;