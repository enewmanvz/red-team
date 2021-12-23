const { sequelizedb,DataTypes, Model } = require('../db');

class User extends Model {}

User.init({
   
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
   
    role: DataTypes.STRING
}, {
    sequelize: sequelizedb,
    timestamps: false,
});

module.exports = {User};