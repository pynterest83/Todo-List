//@desc get all notes
//@route GET /api/todolist
//@access Public

const getNotes = async (req, res) => {
    res.status(200).json({ message: "Get all notes" });
};

//@desc create a note
//@route POST /api/todolist
//@access Public
const createNote = async (req, res) => {
    res.status(200).json({ message: "Create note" });
}

//@desc get a note
//@route GET /api/todolist/:id
//@access Public
const getNote = async (req, res) => {
    res.status(200).json({ message: `note ${req.params.id} searched` });
}

//@desc update a note
//@route PUT /api/todolist/:id
//@access Public
const updateNote = async (req, res) => {
    res.status(200).json({ message: `update note ${req.params.id}` });
}

//@desc delete a note
//@route DELETE /api/todolist/:id
//@access Public
const deleteNote = async (req, res) => {
    res.status(200).json({ message: `note ${req.params.id} deleted` });
}

module.exports = {getNotes, createNote, getNote, updateNote, deleteNote};