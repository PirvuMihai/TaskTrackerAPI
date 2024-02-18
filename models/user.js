const {DataTypes} = require(`sequelize`);

module.exports = (db) => {
    const user = db.define("User", {
        username:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        parola: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        dataNastere: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        contPremium: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, { 
        freezeTableName: true,
        timeStamps: true,
    })
    return user;
}