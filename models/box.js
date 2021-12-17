const { sequelizedb,DataTypes, Model } = require('../db');

class Box extends Model {}

Box.init({
    size : DataTypes.INTEGER,
    label: DataTypes.STRING
}, {
    sequelize: sequelizedb,
    timestamps: false,
});

module.exports = Box;