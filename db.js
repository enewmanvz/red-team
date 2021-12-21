const {Sequelize, DataTypes, Model} = require('sequelize');

const sequelizedb = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './red-team.sqlite',
    logging: true,
    freezeTableName: true
  
});

 module.exports={sequelizedb, DataTypes, Model};