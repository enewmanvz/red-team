const { sequelizedb,DataTypes, Model } = require('../db');

class Palette extends Model {}

Palette.init({
    capacity : DataTypes.INTEGER,
    boxcount: DataTypes.INTEGER
}, {
    sequelize: sequelizedb,
    timestamps: true,
});

module.exports = {Palette};