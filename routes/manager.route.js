// organizes routes
const express = require('express');
const manager = express.Router();

//const {Cast} = require('./models/cast');
//const {Crew} = require('./models/crew');


manager.get('/', async (req, res) => {
    res.render('manager')
})




module.exports = {manager};