const { sequelizedb,DataTypes, Model } = require('../db');

class Palette extends Model {}

Palette.init({
    capacity : DataTypes.INTEGER,
    boxcount: DataTypes.INTEGER,
    employeeID: DataTypes.INTEGER,
    warehouseID: DataTypes.INTEGER,
    runningCapacity: DataTypes.INTEGER,
    runningBoxCount: DataTypes.INTEGER,
    label: DataTypes.STRING

}, {
    sequelize: sequelizedb,
    timestamps: true,
});

module.exports = {Palette};