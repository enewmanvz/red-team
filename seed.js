const {Warehouse, Employee, Palette, Box, Manager, User, WarehousePalette, PaletteBox} = require('./initializedb');
const {sequelizedb } = require('./db.js'); 
const bcrypt = require('bcrypt');
//bcrypt
//set number of salt round for bcrypt encryption
const saltRounds = 10;

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
      runningCapacity: 3000  },

      { name: 'Sears4', 
      location: 'Irving, TX', 
      image: 'http://www.dummy.com',
      capacity: 7000,
      managerID: 1,
      runningCapacity: 7000  }



    


]


const palettes = [
    {
        capacity: 500, 
        boxcount: 100,
        runningCapacity: 500,
        runningBoxCount: 100,
        label: 'Palette Capacity 500, Box Count 100'


    },
    {
        capacity: 600, 
        boxcount: 200,
        runningCapacity: 600,
        runningBoxCount: 200,
        label: 'Palette Capacity 600, Box Count 200'
    },
    {
        capacity: 700, 
        boxcount: 300,
        runningCapacity: 700,
        runningBoxCount: 300,
        label: 'Palette Capacity, 700 Box Count 300'
    },
    {
        capacity: 200, 
        boxcount: 30,
        runningCapacity: 200,
        runningBoxCount: 30,
        label: 'Palette Capacity, 200 Box Count 30'
    },
    {
        capacity: 100, 
        boxcount: 10,
        runningCapacity: 100,
        runningBoxCount: 10,
        label: 'Palette Capacity 100, Box Count 10'
    }


    
]

const boxes = [
    {
        size: 300, 
        label: 'Battery',
        quantity: 234
        
    },
    {
        size: 400, 
        label: 'Mobile Phones',
        quantity: 455,

    },
    {
        size: 600, 
        label: 'Books',
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
        
    }

    


    
]

const warehousepalette = [
    {
        
        paletteID: 5,
        warehouseID:1
        
       
        

        
    }
    
   
]

const palettebox = [
    {
        
        paletteID: 5,
        boxID:1
        
       
        

        
    }
    
   
]




const seed = async () => {
    try {
      console.log('Seeding Start')
      await sequelizedb.sync({force: true})
      const salt = await bcrypt.genSalt(10);
      //await User.bulkCreate(users, {validate: true})
      let password = 'somepassword'
      for (let count = 0; count < users.length; count++) {
        hashpassword = await bcrypt.hash(users[count].password, salt);
        await User.create(
            {email:users[count].email,'password':hashpassword, role: users[count].role})
      }
     
      await Manager.bulkCreate(managers, {validate: true})
      await Warehouse.bulkCreate(warehouses, {validate: true})
      await Employee.bulkCreate(employees, {validate: true})
      
     
      await Palette.bulkCreate(palettes, {validate: true})
      await Box.bulkCreate(boxes, {validate: true})
      await WarehousePalette.bulkCreate(warehousepalette, {validate: true})
     
     
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


