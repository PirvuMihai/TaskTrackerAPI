const db = require(`../config/db`);
const sequelize = require(`sequelize`);

const UserModel = require(`./user`);
const UserDb = UserModel(db, sequelize);

const TaskModel = require(`./task`);
const TaskDb = TaskModel(db, sequelize);

UserDb.hasMany(TaskDb);
TaskDb.belongsTo(UserDb, {
    foreignKey: {
        name: "id_user", 
        allowNull: false,
    }
})

module.exports = {
    UserDb, 
    TaskDb
}