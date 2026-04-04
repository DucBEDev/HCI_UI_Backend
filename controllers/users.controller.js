const { Users } = require("../models");

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
        const user = await Users.findByPk(req.params.id);

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

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
};
