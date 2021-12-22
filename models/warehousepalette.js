const { sequelizedb,DataTypes, Model } = require('../db');
const { Palette } = require('./palette');
const { Warehouse } = require('./warehouse');

class WarehousePalette extends Model {}

WarehousePalette.init({
  warehousepaletteID: {
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

module.exports = {WarehousePalette};