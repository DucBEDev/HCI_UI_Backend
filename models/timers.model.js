const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Timers = sequelize.define(
    "Timers",
    {
        timer_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        label: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        duration_seconds: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        started_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "timers",
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = Timers;
