const { sequelizedb,DataTypes, Model } = require('../db');

class Manager extends Model {}

Manager.init({
    name : DataTypes.STRING
}, {
    sequelize: sequelizedb,
    timestamps: true,
});

module.exports = {Manager};