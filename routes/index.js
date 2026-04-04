const express = require("express");

const { healthCheck } = require("../controllers/health.controller");
const usersRoutes = require("./users.routes");
const alarmsRoutes = require("./alarms.routes");

const router = express.Router();

router.get("/health", healthCheck);
router.use("/users", usersRoutes);
router.use("/alarms/:userId", alarmsRoutes);

module.exports = router;
