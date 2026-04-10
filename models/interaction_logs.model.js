const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const InteractionLogs = sequelize.define(
    "InteractionLogs",
    {
        log_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        input_text: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
        output_text: {
            type: DataTypes.STRING(2000),
            allowNull: true,
        },
        intent: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        tools_called: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: [],
        },
        latency_ms: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "interaction_logs",
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = InteractionLogs;
