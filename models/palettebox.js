const { sequelizedb,DataTypes, Model } = require('../db');
const { Palette } = require('./palette');
const { Box } = require('./box');
const { Employee } = require('./employee');
const { Warehouse } = require('./warehouse');

class PaletteBox extends Model {}

PaletteBox.init({
  paletteboxID: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  paletteID: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        references: {
          model: Palette, 
          key: 'id'
        }
      },
  boxID: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        references: {
          model: Box, 
          key: 'id'
        }
      },
  
  employeeID: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        references: {
          model: Employee, 
          key: 'id'
        }
      },
  warehouseID: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        references: {
          model: Warehouse, 
          key: 'id'
        }
   }
    
}, {
    sequelize: sequelizedb,
    timestamps: true,
});

module.exports = {PaletteBox};