const { sequelizedb,DataTypes, Model } = require('../db');

class User extends Model {}

User.init({
   
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
}, {
    sequelize: sequelizedb,
    timestamps: true,
});

module.exports = {User};