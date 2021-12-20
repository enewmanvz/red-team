const { sequelizedb,DataTypes, Model } = require('../db');

class Employee extends Model {}

Employee.init({
    name : DataTypes.STRING
}, {
    sequelize: sequelizedb,
    timestamps: true,
});

module.exports = {Employee};