const {Employee} = require('./models/employee');
const {Manager} = require('./models/manager');
const {Palette} = require('./models/palette');
const {Box} = require('./models/box');
const {Warehouse} = require('./models/warehouse');
const {User} = require('./models/user');
const {WarehousePalette} = require('./models/warehousepalette');
const {PaletteBox} = require('./models/palettebox');




User.hasMany(Employee, { foreignKey: 'userID' })
User.hasMany(Manager, { foreignKey: 'userID' })

// manager can create warehouse
Manager.hasMany(Warehouse, { foreignKey: 'managerID' })
Warehouse.belongsTo(Manager, { foreignKey: 'managerID' })

// manager can create employees
Manager.hasMany(Employee, { foreignKey: 'managerID' })
Employee.belongsTo(Manager, { foreignKey: 'managerID' })

// employees can have many warehouse
Warehouse.hasMany(Employee, { foreignKey: 'warehouseID' })
Employee.belongsTo(Warehouse, { foreignKey: 'warehouseID' })

//Palette.belongsTo(Employee, { foreignKey: 'employeeID' })
//Palette.belongsTo(Warehouse, { foreignKey: 'warehouseID' })


//Palette.hasMany(Box, { foreignKey: 'paletteID' })
//Box.belongsTo(Palette, { foreignKey: 'paletteID' })
//Box.belongsTo(Warehouse, { foreignKey: 'warehouseID' })

//Palette.belongsToMany(Warehouse, { through: 'WarehousePalette', foreignKey: 'paletteID' });
//Warehouse.belongsToMany(Palette, { through: 'WarehousePalette' });

WarehousePalette.associate = (models) => {
    WarehousePalette.belongsTo(models.Warehouse);
    WarehousePalette.belongsTo(models.Palette);
    WarehousePalette.belongsTo(models.Employee);
}

Warehouse.associate = (models) => {
    Warehouse.belongsToMany(models.Palette, { through: models.WarehousePalette});
  }

Palette.associate = (models) => {
    Palette.belongsToMany(models.Warehouse, { through: models.WarehousePalette});
  }

Palette.associate = (models) => {
    Palette.belongsToMany(models.Employee, { through: models.WarehousePalette});
  }


PaletteBox.associate = (models) => {
    PaletteBox.belongsTo(models.Box);
    PaletteBox.belongsTo(models.Palette);
    PaletteBox.belongsTo(models.Employee);
    PaletteBox.belongsTo(models.Warehouse);

}

Box.associate = (models) => {
    Box.belongsToMany(models.Palette, { through: models.PaletteBox});
  }

Palette.associate = (models) => {
    Palette.belongsToMany(models.Box, { through: models.PaletteBox});
  }

Palette.associate = (models) => {
    Palette.belongsToMany(models.Employee, { through: models.PaletteBox});
  }

Palette.associate = (models) => {
    Palette.belongsToMany(models.Warehouse, { through: models.PaletteBox});
  }





module.exports = {Warehouse, Employee, Palette, Box, Manager, User, WarehousePalette, PaletteBox}