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
        user_name: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: true,
            validate: {
                is: /^[A-Za-z0-9_]+$/,
            },
        },
        user_password: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: true,
            validate: {
                is: /^[\p{L}\s]+$/u,
                notEmptyOrWhitespace(value) {
                    if (value == null) {
                        return;
                    }

                    if (!String(value).trim()) {
                        throw new Error("name cannot be empty");
                    }
                },
            },
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        last_interaction: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        traits: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: [],
        },
        preferences: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {},
        },
        memory: {
            type: DataTypes.JSONB,
            allowNull: false,
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
