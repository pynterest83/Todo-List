const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModels");
//@desc get all notes
//@route GET /api/todolist
//@access private
const getNotes = asyncHandler (async (req, res) => {
    const listNotes = await Note.find({user_id: req.user.id});
    res.status(200).json(listNotes);
})

//@desc create a note
//@route POST /api/todolist
//@access private
const createNote = asyncHandler (async (req, res) => {
    const {title, description, status} = req.body;
    if (!title) {
        res.status(400);
        throw new Error("Please fill in this field");
    }
    const newNote = await Note.create({
        title,
        description,
        status,
        user_id: req.user.id
    });
    
    res.status(200).json(newNote);
})

//@desc get a note
//@route GET /api/todolist/:id
//@access private
const findNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (!note) {
        res.status(404);
        throw new Error("Note not found");
    }
    res.status(200).json(note);
})

//@desc update a note
//@route PUT /api/todolist/:id
//@access private
const updateNote = asyncHandler (async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (!note) {
        res.status(404);
        throw new Error("Note not found");
    }
    if (note.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You are not authorized to access this note");
    }
    const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true, runValidators: true}
    )
    res.status(200).json(updatedNote);
})

//@desc delete a note
//@route DELETE /api/todolist/:id
//@access private
const deleteNote = asyncHandler (async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (!note) {
        res.status(404);
        throw new Error("Note not found");
    }
    if (note.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You are not authorized to access this note");
    }
    await Note.deleteOne({_id: req.params.id});
    res.status(200).json(note);
})

module.exports = {getNotes, createNote, findNote, updateNote, deleteNote};