const { Users } = require("../models");
const { verifyWerkzeugPasswordHash } = require("../helpers/password");

const UUID_V4_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const sanitizeUser = (userInstance) => {
    const user = userInstance.toJSON();
    delete user.user_password;
    return user;
};

const getAllUsers = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 100;
        const offset = parseInt(req.query.offset, 10) || 0;

        const users = await Users.findAll({
            limit,
            offset,
            order: [["created_at", "DESC"]],
        });

        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const userId = String(req.params.id || "").trim();
        if (!UUID_V4_PATTERN.test(userId)) {
            return res.status(400).json({ message: "Invalid user id format (must be UUID)" });
        }

        const user = await Users.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        return next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        const newUser = await Users.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const userName = String(req.body.user_name || "").trim();
        const rawPassword = String(req.body.user_password || "");

        if (!userName || !rawPassword) {
            return res.status(400).json({
                message: "user_name and user_password are required",
            });
        }

        const user = await Users.findOne({ where: { user_name: userName } });

        if (!user || !user.user_password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isValid = verifyWerkzeugPasswordHash(rawPassword, user.user_password);
        if (!isValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        return res.status(200).json({
            message: "Login successful",
            user: sanitizeUser(user),
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    loginUser,
};
