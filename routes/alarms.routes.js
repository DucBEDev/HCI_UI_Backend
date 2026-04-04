const express = require("express");
const {
    createAlarm,
    updateAlarmStatus,
    deleteAlarm,
    getAllAlarms,
} = require("../controllers/alarms.controller");

const router = express.Router({ mergeParams: true });

router.get("/", getAllAlarms);
router.post("/", createAlarm);
router.patch("/:id/status", updateAlarmStatus);
router.delete("/:id", deleteAlarm);

module.exports = router;
