const { Users, Lists, ListItems } = require("../models");

const getAllLists = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await Users.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const lists = await Lists.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: ListItems,
                    as: "items",
                    required: false,
                },
            ],
            order: [
                ["updated_at", "DESC"],
                [{ model: ListItems, as: "items" }, "created_at", "ASC"],
            ],
        });

        return res.status(200).json(lists);
    } catch (error) {
        return next(error);
    }
};

const createList = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { user_id, list_name } = req.body;

        if (!list_name) {
            return res.status(400).json({ message: "list_name is required" });
        }

        if (user_id && user_id !== userId) {
            return res.status(400).json({ message: "user_id in body must match userId in path" });
        }

        const user = await Users.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const list = await Lists.create({
            user_id: userId,
            list_name,
            updated_at: new Date(),
        });

        return res.status(201).json(list);
    } catch (error) {
        return next(error);
    }
};

const deleteList = async (req, res, next) => {
    try {
        const { userId, listId } = req.params;

        const list = await Lists.findOne({
            where: {
                list_id: listId,
                user_id: userId,
            },
        });

        if (!list) {
            return res.status(404).json({ message: "List not found for this user" });
        }

        await list.destroy();

        return res.status(200).json({ message: "List deleted successfully" });
    } catch (error) {
        return next(error);
    }
};

const createNote = async (req, res, next) => {
    try {
        const { userId, listId } = req.params;
        const { content, completed } = req.body;

        if (!content) {
            return res.status(400).json({ message: "content is required" });
        }

        const list = await Lists.findOne({
            where: {
                list_id: listId,
                user_id: userId,
            },
        });

        if (!list) {
            return res.status(404).json({ message: "List not found for this user" });
        }

        const note = await ListItems.create({
            list_id: listId,
            content,
            completed: typeof completed === "boolean" ? completed : false,
            updated_at: new Date(),
        });

        await list.update({ updated_at: new Date() });

        return res.status(201).json(note);
    } catch (error) {
        return next(error);
    }
};

const updateNoteCompleted = async (req, res, next) => {
    try {
        const { userId, listId, itemId } = req.params;
        const { completed } = req.body;

        if (typeof completed !== "boolean") {
            return res.status(400).json({ message: "completed must be boolean" });
        }

        const list = await Lists.findOne({
            where: {
                list_id: listId,
                user_id: userId,
            },
        });

        if (!list) {
            return res.status(404).json({ message: "List not found for this user" });
        }

        const note = await ListItems.findOne({
            where: {
                item_id: itemId,
                list_id: listId,
            },
        });

        if (!note) {
            return res.status(404).json({ message: "Note not found in this list" });
        }

        await note.update({
            completed,
            updated_at: new Date(),
        });

        await list.update({ updated_at: new Date() });

        return res.status(200).json(note);
    } catch (error) {
        return next(error);
    }
};

const deleteNote = async (req, res, next) => {
    try {
        const { userId, listId, itemId } = req.params;

        const list = await Lists.findOne({
            where: {
                list_id: listId,
                user_id: userId,
            },
        });

        if (!list) {
            return res.status(404).json({ message: "List not found for this user" });
        }

        const note = await ListItems.findOne({
            where: {
                item_id: itemId,
                list_id: listId,
            },
        });

        if (!note) {
            return res.status(404).json({ message: "Note not found in this list" });
        }

        await note.destroy();
        await list.update({ updated_at: new Date() });

        return res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getAllLists,
    createList,
    deleteList,
    createNote,
    updateNoteCompleted,
    deleteNote,
};
