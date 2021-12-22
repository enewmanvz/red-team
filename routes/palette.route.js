// organizes routes
const express = require('express');
const palette = express.Router();
const {Palette} = require('../models/palette');
const {Warehouse} = require('../models/warehouse');
const {WarehousePalette} = require('../models/warehousepalette')
const { Op } = require("sequelize");



palette.get('/select', async (req, res) => {
    // we need to show palettes in the system to be added
     // need to get the list to render
   //find all employees for this user
   const loggedInUser = req.session.userID
   const warehouseID = req.session.warehouseID
   
   //first get the ware house info
   const singleWarehouse = await Warehouse.findByPk(warehouseID)
   // get all palettes for this user id
   const palettesForUserID = await Palette.findAll({where: {employeeID: loggedInUser, warehouseID: warehouseID}})
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

  const singlePalette = await Palette.findByPk(selectedPaletteValue)
  const paletteCapacity = singlePalette.capacity

  // we need to check if this can be added

  // do this check later, lets add first 


  const warehousePalette  = {
    paletteID: selectedPaletteValue,
    warehouseID:warehouseID
}

const newEmployee = await WarehousePalette.create(warehousePalette)
// now update the running capacity for warehouse
const updatewarehouseRunningCapacity = warehouseRunningCapacity - paletteCapacity

whattoUpdate = {
  runningCapacity: updatewarehouseRunningCapacity

}

let updateWarehouse = await Warehouse.update(whattoUpdate, {
  where : {id: warehouseID}
})

res.redirect('/employee')
})







module.exports = {palette};