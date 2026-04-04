const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Users = sequelize.define(
    "Users",
    {
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nfc_tag_id: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        last_interaction: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        traits: {
            type: DataTypes.JSONB,
            defaultValue: [],
        },
        preferences: {
            type: DataTypes.JSONB,
            defaultValue: {},
        },
        memory: {
            type: DataTypes.JSONB,
            defaultValue: [],
        },
    },
    {
        tableName: "users",
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = Users;
