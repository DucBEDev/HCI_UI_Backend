const { Sequelize } = require("sequelize");

const databaseUrl = process.env.DATABASE_URL;
const shouldUseSsl = String(process.env.DB_SSL || "true").toLowerCase() === "true";

const sequelize = new Sequelize(databaseUrl, {
    dialect: "postgres",
    logging: false,
    dialectOptions: shouldUseSsl
        ? {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        }
        : {},
});

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to PostgreSQL with Sequelize");
        return true;
    } catch (error) {
        console.error("PostgreSQL Sequelize connection failed:", error.message);
        return false;
    }
};

module.exports = {
    sequelize,
    connectDatabase,
};
