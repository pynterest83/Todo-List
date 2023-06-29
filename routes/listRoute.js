const express = require('express');
const router = express.Router();
const {getNotes, createNote, findNote, updateNote, deleteNote} = require("../controller/listController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").post(createNote);
router.route("/all").get(getNotes);
router.route("/:id").get(findNote).put(updateNote).delete(deleteNote);

module.exports = router;