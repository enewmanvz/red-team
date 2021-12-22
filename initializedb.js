const {Employee} = require('./models/employee');
const {Manager} = require('./models/manager');
const {Palette} = require('./models/palette');
const {Box} = require('./models/box');
const {Warehouse} = require('./models/warehouse');
const {User} = require('./models/user');

/*

Restaurant.hasMany(Menu, {as: 'menu', foreignKey: 'restaurant_id'})
Menu.belongsTo(Restaurant, {foreignKey: 'restaurant_id'})

Menu.hasMany(MenuItem), {as: 'menuitem'};
MenuItem.belongsTo(Menu);

// 1:1
Organization.belongsTo(User, { foreignKey: 'owner_id' });
User.hasOne(Organization, { foreignKey: 'owner_id' });

// 1:M
Project.hasMany(Task, { foreignKey: 'tasks_pk' });
Task.belongsTo(Project, { foreignKey: 'tasks_pk' });


*/



//Manager.hasMany(Warehouse, { foreignKey: 'managerID' })
//Warehouse.belongsTo(Manager, { foreignKey: 'managerID' })

//Manager.hasMany(Employee, { foreignKey: 'managerID' })
//Employee.belongsTo(Manager, { foreignKey: 'managerID' })




/*
Palette.hasMany(Box, { foreignKey: 'paletteID' })
Box.belongsTo(Palette, { foreignKey: 'paletteID' })
Box.belongsTo(Warehouse, { foreignKey: 'warehouseID' })
*/

//Palette.belongsTo(Employee, { foreignKey: 'employeeID' })
//Palette.belongsTo(Warehouse, { foreignKey: 'warehouseID' })

//Employee.belongsTo(User, { foreignKey: 'userID' })
//Manager.belongsTo(User, { foreignKey: 'userID' })

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

Palette.belongsTo(Employee, { foreignKey: 'employeeID' })
Palette.belongsTo(Warehouse, { foreignKey: 'warehouseID' })


Palette.hasMany(Box, { foreignKey: 'paletteID' })
Box.belongsTo(Palette, { foreignKey: 'paletteID' })
Box.belongsTo(Warehouse, { foreignKey: 'warehouseID' })

/*
Warehouse.hasMany(Employee)
Employee.belongsTo(Warehouse)

Palette.hasMany(Box)
Box.belongsTo(Palette)

Warehouse.belongsTo(Manager)
Manager.hasOne(Warehouse)

Employee.belongsTo(Manager)


Palette.belongsTo(Employee)
Palette.belongsTo(Warehouse)

Employee.belongsTo(User)
Manager.belongsTo(User)
*/

module.exports = {Warehouse, Employee, Palette, Box, Manager, User}