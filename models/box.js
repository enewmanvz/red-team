const { sequelizedb,DataTypes, Model } = require('../db');

class Box extends Model {}

Box.init({
    size : DataTypes.INTEGER,
    label: DataTypes.STRING,
    quantity: DataTypes.INTEGER
    
}, {
    sequelize: sequelizedb,
    timestamps: true,
});

module.exports = {Box};