const { Users, MediaHistory } = require("../models");

const getAllMedia = async (req, res, next) => {
    try {
        const { userId } = req.params;

        const user = await Users.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const media = await MediaHistory.findAll({
            where: { user_id: userId },
            order: [["requested_at", "DESC"]],
        });

        return res.status(200).json(media);
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getAllMedia,
};
