const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const authenticate = require("../middlewares/authenticate");

//fetch all notes
router.get("/fetchNotes", authenticate, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.send(notes);
    } catch (error) {
        console.log(error);
    }
})

//create a note
router.post("/addNote", authenticate, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        if (title == "" || description == "") {
            return res.send("Empty data cannot be added");
        }
        const createNote = new Notes({
            title, description, tag, user: req.user.id
        })
        const notes = await createNote.save();
        res.send(notes);
    } catch (error) {
        console.log(error);
    }
})

//update a note
router.patch("/updateNote/:id", authenticate, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        if (title == "" || description == "") {
            return res.send("Empty data cannot be updated");
        }
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        const updatedNote = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote });
        res.send("note updated");
    } catch (error) {
        console.log(error);
    }
})

//delete a note
router.delete("/deleteNote/:id", authenticate, async (req, res) => {
    try {
        const deletedNote = await Notes.findByIdAndDelete(req.params.id);
        res.send("deleted note");
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;