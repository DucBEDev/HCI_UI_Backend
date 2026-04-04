const express = require("express");
const {
    getAllTimers,
    createTimer,
    updateTimerStatus,
    getTimerDetail,
} = require("../controllers/timers.controller");

const router = express.Router({ mergeParams: true });

router.get("/", getAllTimers);
router.post("/", createTimer);
router.get("/:id", getTimerDetail);
router.patch("/:id/status", updateTimerStatus);

module.exports = router;
