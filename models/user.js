const { sequelizedb,DataTypes, Model } = require('../db');

class User extends Model {}

User.init({
   
    userid: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
}, {
    sequelize: sequelizedb,
    timestamps: false,
});

module.exports = User;