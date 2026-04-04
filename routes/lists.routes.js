const express = require("express");
const {
    getAllLists,
    createList,
    deleteList,
    createNote,
    updateNoteCompleted,
    deleteNote,
} = require("../controllers/lists.controller");

const router = express.Router({ mergeParams: true });

router.get("/", getAllLists);
router.post("/", createList);
router.delete("/:listId", deleteList);

router.post("/:listId/notes", createNote);
router.patch("/:listId/notes/:itemId/completed", updateNoteCompleted);
router.delete("/:listId/notes/:itemId", deleteNote);

module.exports = router;
