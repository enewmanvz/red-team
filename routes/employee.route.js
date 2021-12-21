// organizes routes
const express = require('express');
const employee = express.Router();
const {Employee} = require('../models/employee');
const {User} = require('../models/user');



employee.get('/', async (req, res) => {
    res.render('employee')
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


module.exports = {employee};