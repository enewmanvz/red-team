const {Warehouse, Employee, Palette, Box, Manager, User} = require('./initializedb');
const {sequelizedb } = require('./db.js'); 


const warehouses = [
    { name: 'Sears1', 
      location: 'Irving, TX', 
      image: 'http://www.dummy.com',
      capacity: 1000,
      managerID: 1 },
      
      { name: 'Sears2', 
      location: 'Irving, TX', 
      image: 'http://www.dummy.com',
      capacity: 2000,
      managerID: 2  },
      
      { name: 'Sears3', 
      location: 'Irving, TX', 
      image: 'http://www.dummy.com',
      capacity: 3000,
      managerID: 3  }



    


]


const palettes = [
    {
        capacity: 500, 
        boxcount: 100,
        warehouseID: 1,
        employeeID: 1

    },
    {
        capacity: 600, 
        boxcount: 200,
       
        warehouseID: 2,
        employeeID: 1
    },
    {
        capacity: 700, 
        boxcount: 300,
        employeeID: 3,
        warehouseID: 3
    }


    
]

const boxes = [
    {
        size: 300, 
        label: 100,
        paletteID: 1,
        warehouseID: 1
    },
    {
        size: 400, 
        label: 100,
        paletteID: 2,
        warehouseID: 2
    },
    {
        size: 600, 
        label: 100,
        paletteID: 3,
        warehouseID: 3
    }


    
]


const employees = [
    {
        firstName: 'Employee',
        lastName: 'One',
        warehouseID: 1,
        managerID: 1,
        userID: 3
        
    },
    {
        firstName: 'Employee',
        lastName: 'Two',
        warehouseID: 2,
        managerID: 2,
        userID: 3
    },
    {
        firstName: 'Employee',
        lastName: 'Three',
        warehouseID: 3,
        managerID: 3,
        userID: 1
        
    }


    
]


const managers = [
    {
        firstName: 'Manager',
        lastName: 'One',
        userID: 2
        
        
    },
    {
        firstName: 'Manager',
        lastName: 'Two',
        userID: 1
        
    },
    {
        firstName: 'Manager',
        lastName: 'Three',
        userID: 3
        
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


