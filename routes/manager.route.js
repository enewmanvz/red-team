// organizes routes
const express = require('express');
const manager = express.Router();
const {Warehouse} = require('../models/warehouse');
const {Employee} = require('../models/employee');
const { Op } = require("sequelize");


manager.get('/', async (req, res) => {
   
    res.render('manager')
})

manager.get('/select/:action', async (req, res) => {
    // need to get the list to render
   //find all employees for this user
   const id = req.session.userID
   const action = req.params.action
   if (action === 'link') {
    const employeesForUserID = await Employee.findAll({where: {managerID: id, warehouseID: null}})
    const warehouseForUserID = await Warehouse.findAll({where: {managerID: id}})
    if (employeesForUserID && warehouseForUserID) {
     
        res.render('linkemployee', {employeesForUserID,warehouseForUserID })
    }
    }else {
    const employeesForUserID = await Employee.findAll({where: {managerID: id, warehouseID: {
        [Op.ne]: null
    }}})
    const warehouseForUserID = await Warehouse.findAll({where: {managerID: id}})
    if (employeesForUserID && warehouseForUserID) {
       res.render('moveemployee', {employeesForUserID, warehouseForUserID})
         
       
    }
   }
  
   
   
   
  
 
    
})


manager.post('/linkAction', async (req, res) => {
    // need to get the list to render
   //find all employees for this user
   const id = req.session.userID
   const selectedEmployee = req.body.selectedEmployeeValue
   const selectedWarehouse = req.body.selectedWarehouseValue

   //console.log('selected employee value' + selectedEmployee)
   //console.log('selected warehouse value' + selectedWarehouse)

   const whattoUpdate = {
       warehouseID: selectedWarehouse
   }
   
   const linkEmployeeWarehouse= await Employee.update(whattoUpdate,
       {where: {managerID: id,  id:selectedEmployee }
    
    })

    if (linkEmployeeWarehouse) {
        res.redirect('/manager')
    }
   
    
 
    
})

manager.post('/moveAction', async (req, res) => {
    // need to get the list to render
   //find all employees for this user
   const id = req.session.userID
   const selectedEmployee = req.body.selectedEmployeeValue
   const selectedWarehouse = req.body.selectedWarehouseValue

   //console.log('selected employee value' + selectedEmployee)
   //console.log('selected warehouse value' + selectedWarehouse)

   const whattoUpdate = {
       warehouseID: selectedWarehouse
   }
   
   const linkEmployeeWarehouse= await Employee.update(whattoUpdate,
       {where: {managerID: id,  id:selectedEmployee }
    
    })

    if (linkEmployeeWarehouse) {
        res.redirect('/manager')
    }
   
    
 
    
})






module.exports = {manager};