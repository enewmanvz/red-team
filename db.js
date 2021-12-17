const {Sequelize, DataTypes, Model} = require('sequelize');

const sequelizedb = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './red-team.sqlite',
    logging: false
});

 module.exports={sequelizedb, DataTypes, Model};