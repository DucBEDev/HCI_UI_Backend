const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const MediaHistory = sequelize.define(
    "MediaHistory",
    {
        media_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        is_playing: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        play_count: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        requested_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        last_played_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "media_history",
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = MediaHistory;
