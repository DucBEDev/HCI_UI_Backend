const express = require("express");

const {
    getAllUsers,
    getUserById,
    createUser,
    loginUser,
} = require("../controllers/users.controller");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/login", loginUser);
router.get("/:id", getUserById);
router.post("/", createUser);

module.exports = router;
