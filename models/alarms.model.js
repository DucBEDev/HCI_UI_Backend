const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Alarms = sequelize.define(
    "Alarms",
    {
        alarm_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        label: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        repeat: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: "once",
            validate: {
                isIn: [["once", "daily", "weekly"]],
            },
        },
        repeat_days: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
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
        tableName: "alarms",
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = Alarms;
