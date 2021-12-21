// organizes routes
const express = require('express');
const warehouse = express.Router();
const {Warehouse} = require('../models/warehouse')

//const {Cast} = require('./models/cast');
//const {Crew} = require('./models/crew');


warehouse.get('/add', async (req, res) => {
    
     res.render('addwarehouse')
})

warehouse.post('/addAction', async (req, res) => {
    // grab form values 
    const userID = req.session.userID
   
    const warehouse = {
          
          name: req.body.name,
          location:  req.body.location,
          image:  req.body.image,
          capacity:  req.body.capacity,
          managerID: userID
         
    }
    
   
     const newWarehouse = await Warehouse.create(warehouse)
     //Find newWarehouse in db by id
     const foundWarehouse = await Warehouse.findByPk(newWarehouse.id)
     if(foundWarehouse){
         res.redirect('/manager')
    } 
})



warehouse.get('/select/:action', async (req, res) => {
     // need to get the list to render
    //find all Warehouses for this user
    const userID = req.session.userID
    const action = req.params.action
    const warehousesForUserID = await Warehouse.findAll({where: {managerID: userID}})
    if (warehousesForUserID) {
        if (action === "update") {
            res.render('updatewarehouse', {warehousesForUserID})
        }else if (action === "delete") {
            res.render('deletewarehouse', {warehousesForUserID})
        } 
       
    }
   
  
     
})

warehouse.get('/getOneWarehouse/:id', async (req, res) => {
    const userID = req.session.userID
    const selectID = req.params.id
    const singleWarehouseForUserID = await Warehouse.findOne({where: {id: selectID, managerID: userID}})
    if (singleWarehouseForUserID) {
     res.json({singleWarehouseForUserID})
    }
   
  
     
})

warehouse.post('/updateAction', async (req, res) => {
     const whattoUpdate = {
         name: req.body.name,
          location:  req.body.location,
          image:  req.body.image,
          capacity:  req.body.capacity,
          

     }
     const userID = req.session.userID
     const selectedValue = req.body.selectedValue
     console.log('selected value' + selectedValue)
     let updatedWarehouse = await Warehouse.update(whattoUpdate, {
          where : {managerID: userID, id: selectedValue}
      })
      if (updatedWarehouse) {
          res.redirect('/manager')
      }
})


warehouse.post('/deleteAction', async (req, res) => {
    
    const userID = req.session.userID
    const selectedValue = req.body.selectedValue
    const deleted = await Warehouse.destroy({
        where : {managerID: userID, id: selectedValue}
    })
    
    console.log("I am here in deleted")
     if (deleted) {
         res.redirect('/manager')
     }
})


module.exports = {warehouse};