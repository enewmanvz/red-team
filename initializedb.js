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
*/

Warehouse.hasMany(Employee)
Employee.belongsTo(Warehouse)

Palette.hasMany(Box)
Box.belongsTo(Palette)

Warehouse.belongsTo(Manager)
Employee.belongsTo(Manager)
Palette.belongsTo(Employee)

Palette.belongsTo(Warehouse)

Employee.belongsTo(User)
Manager.belongsTo(User)


module.exports = {Warehouse, Employee, Palette, Box, Manager, User}