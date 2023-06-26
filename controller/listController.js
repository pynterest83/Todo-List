const asyncHandler = require("express-async-handler");
//@desc get all notes
//@route GET /api/todolist
//@access Public
const getNotes = asyncHandler (async (req, res) => {
    res.status(200).json({ message: "Get all notes" });
})

//@desc create a note
//@route POST /api/todolist
//@access Public
const createNote = asyncHandler (async (req, res) => {
    console.log("The new task is ", req.body);
    const {title, description, duration} = req.body;
    if (!title || !description || !duration) {
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    res.status(200).json({ message: "Create note" });
})

//@desc get a note
//@route GET /api/todolist/:id
//@access Public
const getNote = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `note ${req.params.id} searched` });
})

//@desc update a note
//@route PUT /api/todolist/:id
//@access Public
const updateNote = asyncHandler (async (req, res) => {
    res.status(200).json({ message: `update note ${req.params.id}` });
})

//@desc delete a note
//@route DELETE /api/todolist/:id
//@access Public
const deleteNote = asyncHandler (async (req, res) => {
    res.status(200).json({ message: `note ${req.params.id} deleted` });
})

module.exports = {getNotes, createNote, getNote, updateNote, deleteNote};