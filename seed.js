const {Warehouse, Employee, Palette, Box, Manager, User} = require('./initializedb');
const {sequelizedb } = require('./db.js'); 


const warehouses = [
    { name: 'Sears1', 
      location: 'Irving, TX', 
      image: 'http://www.dummy.com',
      capacity: 1000,
      ManagerId: 1 },
      
      { name: 'Sears2', 
      location: 'Irving, TX', 
      image: 'http://www.dummy.com',
      capacity: 2000,
      ManagerId: 2  },
      
      { name: 'Sears3', 
      location: 'Irving, TX', 
      image: 'http://www.dummy.com',
      capacity: 3000,
      ManagerId: 3  }



    


]


const palettes = [
    {
        capacity: 500, 
        boxcount: 100,
        EmployeeId: 1,
        WarehouseId: 1

    },
    {
        capacity: 600, 
        boxcount: 200,
        EmployeeId: 2,
        WarehouseId: 2
    },
    {
        capacity: 700, 
        boxcount: 300,
        EmployeeId: 3,
        WarehouseId: 3
    }


    
]

const boxes = [
    {
        size: 300, 
        label: 100,
        PaletteId: 1
    },
    {
        size: 400, 
        label: 100,
        PaletteId: 2
    },
    {
        size: 600, 
        label: 100,
        PaletteId: 3
    }


    
]


const employees = [
    {
        firstName: 'Employee',
        lastName: 'One',
        WarehouseId: 1,
        ManagerId: 1,
        UserId: 3
        
    },
    {
        firstName: 'Employee',
        lastName: 'Two',
        WarehouseId: 2,
        ManagerId: 2
    },
    {
        firstName: 'Employee',
        lastName: 'Three',
        WarehouseId: 3,
        ManagerId: 3
        
    }


    
]


const managers = [
    {
        firstName: 'Manager',
        lastName: 'One',
        UserId: 2
        
    },
    {
        firstName: 'Manager',
        lastName: 'Two',
        UserId: 1
    },
    {
        firstName: 'Manager',
        lastName: 'Three',
    }


    
]

const users = [
    {
        email: 'crystal@test.com',
        password: "somepassword",
        role: 'manager'
       
        

        
    },
    {
        email: 'mmalik@test.com',
        password: "somepassword",
        role: 'employee'
       
    },
    {
        email: 'iyanna@test.com',
        password: "somepassword",
        role: 'manager'
        
    }


    
]




const seed = async () => {
    try {
      console.log('Seeding Start')
      await sequelizedb.sync({force: true})
      await User.bulkCreate(users, {validate: true})
      await Manager.bulkCreate(managers, {validate: true})
      await Warehouse.bulkCreate(warehouses, {validate: true})
      await Employee.bulkCreate(employees, {validate: true})
      
     
      await Palette.bulkCreate(palettes, {validate: true})
      await Box.bulkCreate(boxes, {validate: true})
      
     
     
    } catch (error) {
      console.log('SOMETHING WENT WRONG WITH THE SEEDING: ', error)
    }finally {
      sequelizedb.close()
    }
  }
  
 
  seed()
      .then(() => {
        console.log('Seeding Complete - Success')
      })
      .catch(err => {
        console.error('Oh noes! Something went wrong!')
        console.error(err)
      })


