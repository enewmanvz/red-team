// organizes routes
const express = require('express');
const employee = express.Router();
const {Employee} = require('../models/employee');
const {User} = require('../models/user');
const {Warehouse} = require('../models/warehouse');
const bcrypt = require('bcrypt');
//bcrypt
//set number of salt round for bcrypt encryption
const salt = 10;



employee.get('/', async (req, res) => {
    // can get warehouse info
    const userID = req.session.userID
    const getWarehouseInfo = await Employee.findOne({where: {userID : userID}})
    const warehouseID = getWarehouseInfo.warehouseID
    // add this to the session to be used in subsequent calls
    req.session.warehouseID = warehouseID
    const singleWarehouse = await Warehouse.findOne({where: {id: warehouseID}})
    
    res.render('employee', {singleWarehouse})
})

employee.get('/add', async (req, res) => {
    
    res.render('addemployee')
})

// form submit to add an employee
employee.post('/addAction', async (req, res) => {
    // this userid is a loggedIn userID
    const loggedInUser = req.session.userID
   
    const user = {
          email: req.body.email,
          password: req.body.password,
          role : 'employee'
    }
    
    // need to insert user table to ger ID
    const newUser = await User.create(user)
    const foundUser = await User.findByPk(newUser.id)

    const employee  = {
        firstName: req.body.firstName,
        lastName:  req.body.lastName,
        managerID: loggedInUser,
        userID: newUser.id
    }

    const newEmployee = await Employee.create(employee)
    const foundEmployee = await Employee.findByPk(newEmployee.id)
    
    if (foundEmployee && foundUser) {
        res.redirect('/manager')
    }
})


employee.get('/select/:action', async (req, res) => {
    // need to get the list to render
   //find all employees for this user
   const id = req.session.userID
   const action = req.params.action
   const employeesForUserID = await Employee.findAll({where: {managerID: id}})
   if (employeesForUserID) {
       if (action === "update") {
           res.render('updateemployee', {employeesForUserID})
       }else if (action === "delete") {
           res.render('deleteemployee', {employeesForUserID})
       } 
      
   }
  
 
    
})

employee.get('/getOneEmployee/:id', async (req, res) => {
    const userID = req.session.userID
    const selectID = req.params.id
    const singleEmployee = await Employee.findOne({where: {id: selectID, managerID: userID}})
    const singleUser = await User.findOne({where: {id: singleEmployee.userID}})
    console.log(singleEmployee)
    const singleEmployeeForUserID = {
        lastName: singleEmployee.lastName,
        firstName: singleEmployee.firstName,
        email: singleUser.email,
        password: singleUser.password

    }

    
    
    if (singleEmployeeForUserID) {
     res.json({singleEmployeeForUserID})
    }
    
  
     
})

employee.post('/updateAction', async (req, res) => {
    let whattoUpdate = {
         lastName: req.body.lastName,
         firstName:  req.body.firstName
         

    }
    const userID = req.session.userID
    const selectedValue = req.body.selectedValue
    console.log('selected value' + selectedValue)
    let updateEmployee = await Employee.update(whattoUpdate, {
         where : {managerID: userID, id: selectedValue}
     })
     const singleEmployee = await Employee.findOne({where: {id: selectedValue, managerID: userID}})
     hashpassword = await bcrypt.hash(req.body.password, salt);
     whattoUpdate = {
        email: req.body.email,
        password:  hashpassword
        

    }
    let updateUser = await User.update(whattoUpdate, {
        where : {id: singleEmployee.userID}
    })


     console.log(updateUser)
     if (updateUser && updateEmployee) {
         res.redirect('/manager')
     }
})


employee.post('/deleteAction', async (req, res) => {
    
    const userID = req.session.userID
    const selectedValue = req.body.selectedValue

    // first get the userID from employee table
    const singleEmployee = await Employee.findOne({where: {id: selectedValue, managerID: userID}})
    userIDUsersTable = singleEmployee.userID
    
    const deleteEmployee = await Employee.destroy({
        where : {managerID: userID, id: selectedValue}
    })

    const deleteUser = await User.destroy({
        where : {id: userIDUsersTable}
    })


    
    
     if (deleteEmployee && deleteUser) {
         res.redirect('/manager')
     }
})


module.exports = {employee};