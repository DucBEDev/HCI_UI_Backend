const express = require("express");
const { getAllMedia } = require("../controllers/media.controller");

const router = express.Router({ mergeParams: true });

router.get("/", getAllMedia);

module.exports = router;
