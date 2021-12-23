// organizes routes
const express = require('express');
const palette = express.Router();
const {Palette} = require('../models/palette');
const {Warehouse} = require('../models/warehouse');
const {Employee} = require('../models/employee');
const {WarehousePalette} = require('../models/warehousepalette')
const { Op } = require("sequelize");
const {sequelizedb } = require('../db.js'); 



palette.get('/select', async (req, res) => {
    // we need to show palettes in the system to be added
     // need to get the list to render
   //find all employees for this user
   const loggedInUser = req.session.userID
   const warehouseID = req.session.warehouseID
   
   //first get the ware house info
   const singleWarehouse = await Warehouse.findByPk(warehouseID)
   // get all palettes for this user id
   const palettesForUserID = await Palette.findAll()
   // we need to check if these palettes have already been added
   const palettesForWarehouse = await WarehousePalette.findAll({where: {warehouseID: warehouseID}})
   let palettesArray = palettesForUserID
   if (palettesForWarehouse.length == 0) {
  
    res.render('addPalette', {singleWarehouse, palettesArray})


   }else {
    // we need to show only palettes which have not been added yet
   
    const palettesArray  = palettesForUserID.filter(function(array_el){
      return palettesForWarehouse.filter(function(anotherOne_el){
       return array_el.id == anotherOne_el.paletteID 
      }).length == 0
    });

    
    res.render('addPalette', {singleWarehouse, palettesArray})
   
   //console.log(filteredArray.length)
   
   //console.log("palettes from join " + palettesForWarehouse.length )
   
   }
  })


  // form submit to add an employee
palette.post('/addAction', async (req, res) => {
  // this userid is a loggedIn userID
  const loggedInUser = req.session.userID
  // we need to do the following
  // insert record in WarehousePalette
  // 
  // check for error if this can be added otherwise return error

  // we will need the capacity for the warehouse
  // and running capacity to the warehouse table
  const warehouseID = req.session.warehouseID
  //first get the ware house info
  const singleWarehouse = await Warehouse.findByPk(warehouseID)
  const warehouseCapacity = singleWarehouse.warehouseCapacity
  const warehouseRunningCapacity = singleWarehouse.runningCapacity
  // get the palette info now
  const selectedPaletteValue = req.body.selectedValue
  console.log("Palette" + selectedPaletteValue)
  console.log("Warehouse" + warehouseID)
  console.log("Logged In User" + loggedInUser)
  

  const singlePalette = await Palette.findByPk(selectedPaletteValue)
  const paletteCapacity = singlePalette.capacity
  // we need to get the employee ID for the user ID
  const singleEmployeeIDForUserID = await Employee.findOne({where: {userID: loggedInUser}})
  const employeeID = singleEmployeeIDForUserID.id
  // we need to check if this can be added
  
   if (paletteCapacity > warehouseRunningCapacity) {
    const alertError = "Warehouse Capacity exceeds, please select another palette"
    res.render("error", {alertError})
   


   }else {
    
    
        const warehousePalette  = {
          paletteID: selectedPaletteValue,
          warehouseID:warehouseID,
          employeeID: loggedInUser
        }
      
        const newWarehousePalette = await WarehousePalette.create(warehousePalette)
        // now update the running capacity for warehouse
        const updatewarehouseRunningCapacity = warehouseRunningCapacity - paletteCapacity
      
        whattoUpdate = {
          runningCapacity: updatewarehouseRunningCapacity
      
        }
  
        let updateWarehouse = await Warehouse.update(whattoUpdate, {
          where : {id: warehouseID}
        })
  
        res.redirect('/employee')
   }


  
})


palette.get('/remove', async (req, res) => {
  // we need to show palettes in the system to be added
   // need to get the list to render
 //find all employees for this user
 const loggedInUser = req.session.userID
 const warehouseID = req.session.warehouseID
 
 //first get the ware house info
 const singleWarehouse = await Warehouse.findByPk(warehouseID)
 // get all palettes for this user id
 
 // we need to check if these palettes have already been added
 const palettesForWarehouse = await WarehousePalette.findAll({where: {warehouseID: warehouseID}})
 const alertError = "Please first add the palette to be removed"
 if (palettesForWarehouse.length == 0) {
  res.render('error', {alertError})
 } else {
  
  const arrayofPalettes = []
  for(let count = 0; count < palettesForWarehouse.length; count ++) {
  arrayofPalettes.push(palettesForWarehouse[count].paletteID)
  }

  const palettesForUserID = await Palette.findAll(
   {where: {id: {
              [Op.in]: arrayofPalettes
          } 
  }})
 
  const palettesArray = palettesForUserID
  res.render('removePalette', {singleWarehouse, palettesArray})

 }

 


 
 
 
 
 
})




palette.post('/removeAction', async (req, res) => {
  // this userid is a loggedIn userID
  const loggedInUser = req.session.userID
  const warehouseID = req.session.warehouseID
  const selectedPaletteValue = req.body.selectedValue
  //first get the ware house info
  const singleWarehouse = await Warehouse.findByPk(warehouseID)
  const warehouseCapacity = singleWarehouse.warehouseCapacity
  const warehouseRunningCapacity = singleWarehouse.runningCapacity
  // delete the palette from WarehousePalette
  const deleteWarehousePalette = await WarehousePalette.destroy({
    where : {paletteID: selectedPaletteValue}
  })

  const singlePalette = await Palette.findByPk(selectedPaletteValue)
  const paletteCapacity = singlePalette.capacity
  const updatewarehouseRunningCapacity = warehouseRunningCapacity + paletteCapacity

  whattoUpdate = {
    runningCapacity: updatewarehouseRunningCapacity
  
    }

    const updateWarehouse = await Warehouse.update(whattoUpdate, {
      where : {id: warehouseID}
    })

  res.redirect('/employee')
   


  
})


palette.get('/empty', async (req, res) => {
  // this userid is a loggedIn userID
  const loggedInUser = req.session.userID
  const warehouseID = req.session.warehouseID
  
  //first get the ware house info
  const singleWarehouse = await Warehouse.findByPk(warehouseID)
  
  
  
  const palettesArray = await Palette.findAll(
    {where: {capacity: {
               [Op.eq]: sequelizedb.col('runningCapacity')
           } 
   }})

  res.render('emptypalette', {singleWarehouse, palettesArray})
   


  
})

palette.post('/emptyAction', async (req, res) => {
  // this userid is a loggedIn userID
  const loggedInUser = req.session.userID
  const warehouseID = req.session.warehouseID
  const selectedPalette = req.body.selectedValue

  const deleteWarehousePalette = await Palette.destroy({
    where : {id: selectedPalette}
  })

  res.redirect('/employee')
  
   


  
})






module.exports = {palette};