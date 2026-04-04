const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const UserPreferences = sequelize.define(
    "UserPreferences",
    {
        pref_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            unique: true,
        },
        display_name: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "user_preferences",
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = UserPreferences;
