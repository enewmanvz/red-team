const { sequelizedb,DataTypes, Model } = require('../db');

class Employee extends Model {}

Employee.init({
    firstName : DataTypes.STRING,
    lastName: DataTypes.STRING
}, {
    sequelize: sequelizedb,
    timestamps: true,
});

module.exports = {Employee};