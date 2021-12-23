// organizes routes
const express = require('express');
const box = express.Router();
const {User} = require('../models/user');
const {Box} = require('../models/box');
const {PaletteBox} = require('../models/paletteBox');
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
        res.render('addbox', {returnPalette, returnBox})
    }else {
        // I need to get boxes which have not been added
        const boxArray  = allBoxes.filter(function(array_el){
            return paletteBoxes.filter(function(anotherOne_el){
             return array_el.id == anotherOne_el.boxID 
            }).length == 0
          });
      
          returnBox = boxArray



        
        res.render('addbox', {returnPalette, returnBox})

    }
    
    
    
  
   
   })


   box.post('/addAction', async (req, res) => {
    // this userid is a loggedIn userID
    const loggedInUser = req.session.userID
    const warehouseID = req.session.warehouseID
    
    const paletteSelectedValue = req.body.selectedPaletteValue
    const boxSelectedValue = req.body.selectedBoxValue
    
    const singleBox = await Box.findByPk(boxSelectedValue)
    const singlePalette = await Palette.findByPk(paletteSelectedValue)

    const paletteRunningCapacity = singlePalette.runningCapacity
    const boxCapacity = singleBox.size

    //console.log("Box size" + boxCapacity )
    //console.log("Palette size" + paletteRunningCapacity )


    if (boxCapacity > paletteRunningCapacity ) {
        const alertError = "Palette Capacity exceeds, please select another box"
        res.render("error", {alertError})
    } else {

        const paletteBox  = {
            paletteID: paletteSelectedValue,
            warehouseID:warehouseID,
            employeeID: loggedInUser,
            boxID: boxSelectedValue,
            boxLabel: singleBox.label,
            paletteLabel: singlePalette.label
          }
        
          const newPaletteBox = await PaletteBox.create(paletteBox)
          // now update the running capacity for palette
          const updatepaletteRunningCapacity = paletteRunningCapacity - boxCapacity
        
          whattoUpdate = {
            runningCapacity: updatepaletteRunningCapacity
        
          }
    
          let updatePalette = await Palette.update(whattoUpdate, {
            where : {id: paletteSelectedValue}
          })
    
          res.redirect('/employee')
     }



    })
    
    box.get('/remove', async (req, res) => {
      // we need to show palettes in the system to be added
       // need to get the list to render
     //find all employees for this user
     const loggedInUser = req.session.userID
     const warehouseID = req.session.warehouseID
     
     
    
     // dummy vars sets them later to be returned
     let returnBox = 0
     let returnPalette = 0
     
     const PalletBoxes = await PaletteBox.findAll({where: {warehouseID: warehouseID, employeeID: loggedInUser}})
     if  (PalletBoxes.length == 0) {
      const alertError = "Nothing to remove, pleaase add palette and boxes"
      res.render('error', {alertError})

     } else {
      // prepare for palettes and boxes drop down 

      


      
      


       res.render('removebox', {PalletBoxes})

     }



  
     
  
  
          
          
  
      
      
      
      
    
     
     })

     box.post('/removeAction', async (req, res) => {
      // this userid is a loggedIn userID
      const loggedInUser = req.session.userID
      const warehouseID = req.session.warehouseID
      const selectedPaletteBoxValue = req.body.selectedPaletteValue
      
      console.log("option value" + selectedPaletteBoxValue)

      const palettBox = await PaletteBox.findByPk(selectedPaletteBoxValue)
      const singlePalette = await Palette.findByPk(palettBox.paletteID)
      const singleBox = await Box.findByPk(palettBox.boxID)

      const paletteRunningCapacity =  singlePalette.runningCapacity + singleBox.size

      // delete the record
      const deleteBoxPalette = await PaletteBox.destroy({
        where : {paletteboxID: selectedPaletteBoxValue}
      })

      whattoUpdate = {
        runningCapacity: paletteRunningCapacity
      
        }

        const updatePalette = await Palette.update(whattoUpdate, {
          where : {id: palettBox.paletteID}
        })

      
     
    
      res.redirect('/employee')
       
    
    
      
    })
  
  
    
  


module.exports = {box};