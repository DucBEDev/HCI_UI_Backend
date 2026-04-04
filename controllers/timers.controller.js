const { Timers, Users } = require("../models");

const getAllTimers = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await Users.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const timers = await Timers.findAll({
            where: { user_id: userId },
            order: [["created_at", "DESC"]],
        });

        return res.status(200).json(timers);
    } catch (error) {
        return next(error);
    }
};

const createTimer = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { user_id, label, duration_seconds, started_at, active } = req.body;

        if (!label || duration_seconds === undefined) {
            return res.status(400).json({
                message: "label and duration_seconds are required",
            });
        }

        const parsedDuration = Number(duration_seconds);
        if (!Number.isInteger(parsedDuration) || parsedDuration <= 0) {
            return res.status(400).json({
                message: "duration_seconds must be a positive integer",
            });
        }

        if (user_id && user_id !== userId) {
            return res.status(400).json({
                message: "user_id in body must match userId in path",
            });
        }

        const user = await Users.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const timer = await Timers.create({
            user_id: userId,
            label,
            duration_seconds: parsedDuration,
            started_at: started_at || new Date(),
            active: typeof active === "boolean" ? active : true,
        });

        return res.status(201).json(timer);
    } catch (error) {
        return next(error);
    }
};

const updateTimerStatus = async (req, res, next) => {
    try {
        const { userId, id } = req.params;
        const { active } = req.body;

        if (typeof active !== "boolean") {
            return res.status(400).json({ message: "active must be boolean" });
        }

        const timer = await Timers.findOne({
            where: {
                timer_id: id,
                user_id: userId,
            },
        });

        if (!timer) {
            return res.status(404).json({ message: "Timer not found for this user" });
        }

        await timer.update({ active });

        return res.status(200).json(timer);
    } catch (error) {
        return next(error);
    }
};

const getTimerDetail = async (req, res, next) => {
    try {
        const { userId, id } = req.params;

        const timer = await Timers.findOne({
            where: {
                timer_id: id,
                user_id: userId,
            },
        });

        if (!timer) {
            return res.status(404).json({ message: "Timer not found for this user" });
        }

        return res.status(200).json(timer);
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getAllTimers,
    createTimer,
    updateTimerStatus,
    getTimerDetail,
};
