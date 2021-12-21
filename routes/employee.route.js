// organizes routes
const express = require('express');
const employee = express.Router();

//const {Cast} = require('./models/cast');
//const {Crew} = require('./models/crew');


employee.get('/', async (req, res) => {
    res.render('employee')
})

employee.get('/add', async (req, res) => {
    
    res.render('addemployee')
})


module.exports = {employee};