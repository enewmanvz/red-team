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







module.exports = {palette};