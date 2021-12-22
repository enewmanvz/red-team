const { sequelizedb,DataTypes, Model } = require('../db');

class Warehouse extends Model {}

Warehouse.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    image: DataTypes.STRING,
    capacity : DataTypes.INTEGER,
    managerID: DataTypes.INTEGER,
    runningCapacity: DataTypes.INTEGER
}, {
    sequelize: sequelizedb,
    timestamps: true,
});

module.exports = {Warehouse};