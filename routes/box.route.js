// organizes routes
const express = require('express');
const box = express.Router();
const {User} = require('../models/user');
const {Box} = require('../models/box');
const {PaletteBox} = require('../models/paletteBox');
const {Warehouse} = require('../models/warehouse');
const {WarehousePalette} = require('../models/warehousepalette');
const {Palette} = require('../models/palette');
const { Op } = require("sequelize");

box.get('/select', async (req, res) => {
    // we need to show palettes in the system to be added
     // need to get the list to render
   //find all employees for this user
   const loggedInUser = req.session.userID
   const warehouseID = req.session.warehouseID
   
   
  
   // dummy vars sets them later to be returned
   let returnBox = 0
   let returnPalette = 0
   
   

   // only get palettes for this warehouse
   const palettesForWarehouse = await WarehousePalette.findAll({where: {warehouseID: warehouseID, employeeID: loggedInUser}})
   if (palettesForWarehouse.length == 0) {
        const alertError = "Please first add palette"
        res.render('error', {alertError})
    }else {
    // we need to show only palettes which have been added because I can only add boxes to those palettes
        const arrayofPalettes = []
        for(let count = 0; count < palettesForWarehouse.length; count ++) {
            arrayofPalettes.push(palettesForWarehouse[count].paletteID)
        }

        const palettesForUserID = await Palette.findAll(
            {where: {id: {
          [Op.in]: arrayofPalettes
        } 
    
        }})

        returnPalette = palettesForUserID
    }
    // now I need to find the boxes which have not been added
    
    let allBoxes = await Box.findAll()
    const paletteBoxes = await PaletteBox.findAll({where: {warehouseID: warehouseID, employeeID: loggedInUser}})
    if (paletteBoxes.length == 0) {
        // this means none of the boxes have been added
        // I can use allBoxes
        returnBox = allBoxes
        res.render('addbox', {returnPalette, returnBox, singleWarehouse})
    }else {
        // I need to get boxes which have not been added

        const arrayofBoxes = []
        for(let count = 0; count < paletteBoxes.length; count ++) {
            arrayofBoxes.push(paletteBoxes[count].boxID)
        }

        const boxesalreadyAdded = await Box.findAll(
            {where: {id: {
              [Op.in]: arrayofBoxes
            } 
        
        }})

        returnBox = boxesalreadyAdded
        res.render('addbox', {returnPalette, returnBox, singleWarehouse})

    }
    
    
    
  
   
   })


   box.post('/addAction', async (req, res) => {
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


module.exports = {box};