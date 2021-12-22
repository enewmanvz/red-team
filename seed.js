const {Warehouse, Employee, Palette, Box, Manager, User} = require('./initializedb');
const {sequelizedb } = require('./db.js'); 


const warehouses = [
    { name: 'Sears1', 
      location: 'Irving, TX', 
      image: 'http://www.dummy.com',
      capacity: 1000,
      managerID: 1,
      runningCapacity: 1000 },
      
      { name: 'Sears2', 
      location: 'Irving, TX', 
      image: 'http://www.dummy.com',
      capacity: 2000,
      managerID: 1,
      runningCapacity: 2000  },
      
      { name: 'Sears3', 
      location: 'Irving, TX', 
      image: 'http://www.dummy.com',
      capacity: 3000,
      managerID: 1,
      runningCapacity: 3000  }



    


]


const palettes = [
    {
        capacity: 500, 
        boxcount: 100,
        warehouseID: 1,
        employeeID: 1,
        runningCapacity: 500,
        runningBoxCount: 100,
        label: 'Palette 500'


    },
    {
        capacity: 600, 
        boxcount: 200,
        warehouseID: 1,
        employeeID: 1,
        runningCapacity: 600,
        runningBoxCount: 200,
        label: 'Palette 600'
    },
    {
        capacity: 700, 
        boxcount: 300,
        employeeID: 1,
        warehouseID: 1,
        runningCapacity: 700,
        runningBoxCount: 300,
        label: 'Palette 700'
    }


    
]

const boxes = [
    {
        size: 300, 
        label: 'Battery',
        paletteID: 1,
        warehouseID: 1,
        quantity: 234
        
    },
    {
        size: 400, 
        label: 'Mobile Phones',
        paletteID: 2,
        warehouseID: 2,
        quantity: 455,

    },
    {
        size: 600, 
        label: 'Books',
        paletteID: 3,
        warehouseID: 3,
        quantity: 432
    }


    
]


const employees = [
    {
        firstName: 'Muneer',
        lastName: 'Malik',
        warehouseID: 1,
        managerID: 1,
        userID: 2
        
    },
    {
        firstName: 'Iyanna',
        lastName: 'Iyanna',
        warehouseID: 2,
        managerID: 1,
        userID: 3
    }


    
]


const managers = [
    {
        firstName: 'Crystal',
        lastName: 'Johnson',
        userID: 1
        
        
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
        role: 'employee'
        
    },
    {
        email: 'crystal@crystal.com',
        password: "somepassword",
        role: 'manager'
       
        

        
    },
    {
        email: 'mmalik@mmalik.com',
        password: "somepassword",
        role: 'employee'
       
    },
    {
        email: 'iyanna@iyanna.com',
        password: "somepassword",
        role: 'employee'
        
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


