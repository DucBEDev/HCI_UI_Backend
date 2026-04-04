const { Alarms, Users } = require("../models");

const getAllAlarms = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await Users.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const alarms = await Alarms.findAll({
            where: { user_id: userId },
            order: [["time", "ASC"]],
        });

        return res.status(200).json(alarms);
    } catch (error) {
        return next(error);
    }
};

const createAlarm = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { user_id, time, label, repeat, repeat_days, enabled } = req.body;

        if (!time || !label) {
            return res.status(400).json({
                message: "time and label are required",
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

        const alarm = await Alarms.create({
            user_id: userId,
            time,
            label,
            repeat,
            repeat_days,
            enabled,
        });

        return res.status(201).json(alarm);
    } catch (error) {
        return next(error);
    }
};

const updateAlarmStatus = async (req, res, next) => {
    try {
        const { userId, id } = req.params;
        const { enabled } = req.body;

        if (typeof enabled !== "boolean") {
            return res.status(400).json({ message: "enabled must be boolean" });
        }

        const alarm = await Alarms.findOne({
            where: {
                alarm_id: id,
                user_id: userId,
            },
        });

        if (!alarm) {
            return res.status(404).json({ message: "Alarm not found for this user" });
        }

        await alarm.update({
            enabled,
            updated_at: new Date(),
        });

        return res.status(200).json(alarm);
    } catch (error) {
        return next(error);
    }
};

const deleteAlarm = async (req, res, next) => {
    try {
        const { userId, id } = req.params;

        const alarm = await Alarms.findOne({
            where: {
                alarm_id: id,
                user_id: userId,
            },
        });

        if (!alarm) {
            return res.status(404).json({ message: "Alarm not found for this user" });
        }

        await alarm.destroy();
        return res.status(200).json({ message: "Alarm deleted successfully" });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getAllAlarms,
    createAlarm,
    updateAlarmStatus,
    deleteAlarm,
};
