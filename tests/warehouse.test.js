const {Warehouse, Employee, Palette, Manager, sequelize} = require('./index')

describe('Warehouse Route', () => {
    beforeAll(async() => {
    //reset database
        await sequelize.sync({force:true})
    
    //create array of Warehouses
        const arrayOfWarehouses = [
            {name: 'Warehouse 100', location: 'Dallas, TX', image: 'www.picture.com', capacity : '100'},
            {name: 'Warehouse 200', location: 'Jacksonville, FL', image: 'www.picture.com', capacity : '200'},
            {name: 'Warehouse 300', location: 'Houston, TX', image: 'www.picture.com', capacity : '300'},
            {name: 'Warehouse 400', location: 'Orlando, FL', image: 'www.picture.com', capacity : '400'}
        ]
    //create array of Employees
        const arrayOfEmployees = [
            {firstName : 'Muneer', lastName: 'Malik', managerID: '2', warehouseID: '2', userID: '4' },
            {firstName : 'Iyanna', lastName: 'Bell', managerID: '1', warehouseID: '2', userID: '3' },
            {firstName : 'Crystal', lastName: 'Johnson', managerID: '1', warehouseID: '1', userID: '2' },
            {firstName : 'Michael', lastName: "Dunn-O'Connor", managerID: '3', warehouseID: '4', userID: '1' }
        ]      
     //create array of Managers
         const arrayOfManagers = [
            {firstName : 'Malik', lastName: 'Muneer', userID: '3'},
            {firstName : 'Bella', lastName: 'Iyanna', userID: '4' },
            {firstName : 'Johnsonia', lastName: 'Crystal', userID: '1' },
            {firstName : 'Connor', lastName: 'Michael', userID: '2' }
        ] 
     //create array of Palettes
        const arrayOfPalettes = [
            {capacity : '100', boxcount: '75'},
            {capacity : '200', boxcount: '200'},
            {capacity : '150', boxcount: '120'},
            {capacity : '250', boxcount: '45'}
        ] 
        await Warehouse.bulkCreate(arrayOfWarehouses)
        await Employee.bulkCreate(arrayOfEmployees)
        await Manager.bulkCreate(arrayOfManagerss)
        await Palette.bulkCreate(arrayOfPalettes)
        
//Warehouse.hasMany(Employee)
// Employee.belongsTo(Warehouse)
// Warehouse.belongsTo(Manager)
// Palette.belongsTo(Warehouse)

        })
        test ('Warehouses have a name and capacity', async() => {
            const WHname = await Warehouse.findOne({where: {name: 'Warehouse 300'}})
            expect(WHname.name).toBe('Warehouse 300') && expect(WHname.capacity).toBe('300')

            test('Warehouse can have many employees', async() => {
                const testWarehouse =  await Warehouse.findOne({where: {name: 'Warehouse 100'}})
                const testWarehouse1 = await Employee.findOne({where: {FirstName: 'Muneer'}})
                const testWarehouse2 = await Employee.findOne({where: {FirstName: 'Iyanna'}})
                await testWarehouse.addEmployee(testEmployee1)
                await testWarehouse.addEmployee(testEmployee2)
                const WarehouseList = await testWarehouse.getEmployees()
                expect(EmployeeList.length).toBe(2)
                expect(EmployeeList[0] instanceof Cast).toBeTruthy()
                expect(EmployeeList[1].lastName).toMatch('Bell')

            })
   
            afterAll(async()=> {
            sequelize.close
        })
        })                
