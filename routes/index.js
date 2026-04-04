const express = require("express");

const { healthCheck } = require("../controllers/health.controller");
const usersRoutes = require("./users.routes");

const router = express.Router();

router.get("/health", healthCheck);
router.use("/users", usersRoutes);

module.exports = router;
