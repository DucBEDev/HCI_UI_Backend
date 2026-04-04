const express = require("express");
const {
    getUserProfile,
    updateUserProfile,
} = require("../controllers/profile.controller");

const router = express.Router({ mergeParams: true });

router.get("/", getUserProfile);
router.patch("/", updateUserProfile);

module.exports = router;
