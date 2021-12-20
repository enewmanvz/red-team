const { sequelizedb,DataTypes, Model } = require('../db');

class Manager extends Model {}

Manager.init({
    firstName : DataTypes.STRING,
    lastName: DataTypes.STRING
}, {
    sequelize: sequelizedb,
    timestamps: true,
});

module.exports = {Manager};