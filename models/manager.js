const { sequelizedb,DataTypes, Model } = require('../db');

class Manager extends Model {}

Manager.init({
    firstName : DataTypes.STRING,
    lastName: DataTypes.STRING,
    userID: DataTypes.INTEGER
}, {
    sequelize: sequelizedb,
    timestamps: true,
});

module.exports = {Manager};