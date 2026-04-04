const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const ListItems = sequelize.define(
    "ListItems",
    {
        item_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        list_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING(500),
            allowNull: false,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "list_items",
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = ListItems;
