const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Lists = sequelize.define(
    "Lists",
    {
        list_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        list_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "lists",
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = Lists;
