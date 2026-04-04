const express = require("express");

const { healthCheck } = require("../controllers/health.controller");
const usersRoutes = require("./users.routes");
const alarmsRoutes = require("./alarms.routes");
const timersRoutes = require("./timers.routes");
const listsRoutes = require("./lists.routes");
const mediaRoutes = require("./media.routes");
const profileRoutes = require("./profile.routes");

const router = express.Router();

router.get("/health", healthCheck);
router.use("/users", usersRoutes);
router.use("/alarms/:userId", alarmsRoutes);
router.use("/timers/:userId", timersRoutes);
router.use("/lists/:userId", listsRoutes);
router.use("/media/:userId", mediaRoutes);
router.use("/profile/:userId", profileRoutes);

module.exports = router;
