require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { connectDatabase } = require("./config/database");

const apiRoutes = require("./routes");

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({
        message: "HCI UI Backend is running",
        environment: process.env.NODE_ENV || "development",
    });
});

app.use("/api", apiRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || "Internal server error",
    });
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDatabase();
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
};

startServer();
