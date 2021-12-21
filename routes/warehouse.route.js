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



warehouse.get('/update', async (req, res) => {
     res.render('updatewarehouse')
})

warehouse.post('/updateAction', async (req, res) => {
    
})

warehouse.get('/delete', async (req, res) => {
     res.render('deletewarehouse')
})

warehouse.post('/deleteAction', async (req, res) => {
    
})


module.exports = {warehouse};