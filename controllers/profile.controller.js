const { Users, UserPreferences } = require("../models");

const getUserProfile = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await Users.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const preferences = await UserPreferences.findOne({
            where: { user_id: userId },
        });

        return res.status(200).json({
            user_id: user.user_id,
            name: user.name,
            email: preferences?.email || null,
            phone: preferences?.phone || null,
        });
    } catch (error) {
        return next(error);
    }
};

const updateUserProfile = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { name, email, phone } = req.body;

        if (name === undefined && email === undefined && phone === undefined) {
            return res.status(400).json({
                message: "At least one field is required: name, email, phone",
            });
        }

        const user = await Users.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (name !== undefined) {
            await user.update({ name });
        }

        const [preferences] = await UserPreferences.findOrCreate({
            where: { user_id: userId },
            defaults: {
                user_id: userId,
                display_name: name !== undefined ? name : user.name,
                email: email !== undefined ? email : null,
                phone: phone !== undefined ? phone : null,
                updated_at: new Date(),
            },
        });

        await preferences.update({
            display_name: name !== undefined ? name : preferences.display_name,
            email: email !== undefined ? email : preferences.email,
            phone: phone !== undefined ? phone : preferences.phone,
            updated_at: new Date(),
        });

        return res.status(200).json({
            user_id: user.user_id,
            name: name !== undefined ? name : user.name,
            email: preferences.email,
            phone: preferences.phone,
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
};
