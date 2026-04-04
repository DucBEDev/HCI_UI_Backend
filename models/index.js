const Users = require("./users.model");
const Alarms = require("./alarms.model");
const Timers = require("./timers.model");
const Lists = require("./lists.model");
const ListItems = require("./list_items.model");
const InteractionLogs = require("./interaction_logs.model");
const MediaHistory = require("./media_history.model");
const UserPreferences = require("./user_preferences.model");

Users.hasMany(Alarms, { foreignKey: "user_id", as: "alarms", onDelete: "CASCADE" });
Alarms.belongsTo(Users, { foreignKey: "user_id", as: "user" });

Users.hasMany(Timers, { foreignKey: "user_id", as: "timers", onDelete: "CASCADE" });
Timers.belongsTo(Users, { foreignKey: "user_id", as: "user" });

Users.hasMany(Lists, { foreignKey: "user_id", as: "lists", onDelete: "CASCADE" });
Lists.belongsTo(Users, { foreignKey: "user_id", as: "user" });

Lists.hasMany(ListItems, { foreignKey: "list_id", as: "items", onDelete: "CASCADE" });
ListItems.belongsTo(Lists, { foreignKey: "list_id", as: "list" });

Users.hasMany(InteractionLogs, { foreignKey: "user_id", as: "interaction_logs", onDelete: "CASCADE" });
InteractionLogs.belongsTo(Users, { foreignKey: "user_id", as: "user" });

Users.hasMany(MediaHistory, { foreignKey: "user_id", as: "media_history", onDelete: "CASCADE" });
MediaHistory.belongsTo(Users, { foreignKey: "user_id", as: "user" });

Users.hasOne(UserPreferences, { foreignKey: "user_id", as: "preferences_detail", onDelete: "CASCADE" });
UserPreferences.belongsTo(Users, { foreignKey: "user_id", as: "user" });

module.exports = {
    Users,
    Alarms,
    Timers,
    Lists,
    ListItems,
    InteractionLogs,
    MediaHistory,
    UserPreferences,
};
