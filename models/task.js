const {DataTypes} = require(`sequelize`);

module.exports = (db) => {
    const task = db.define("Task", {
        nume: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dataInceput: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dataTerminare: {
            type : DataTypes.STRING,
            allowNull: true,
        },
        descriere: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        esteTerminat: {
            type:DataTypes.BOOLEAN,
            allowNull: true,
        },
    }, {
        freezeTableName: true,
        timeStamps: true,
    })
    return task;
}