const { sequelizedb,DataTypes, Model } = require('../db');

class Employee extends Model {}

Employee.init({
    firstName : DataTypes.STRING,
    lastName: DataTypes.STRING,
    managerID: DataTypes.INTEGER,
    warehouseID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER
}, {
    sequelize: sequelizedb,
    timestamps: true,
});

module.exports = {Employee};