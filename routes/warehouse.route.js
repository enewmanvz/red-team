// organizes routes
const express = require('express');
const warehouse = express.Router();

//const {Cast} = require('./models/cast');
//const {Crew} = require('./models/crew');


warehouse.get('/add', async (req, res) => {
     res.render('addwarehouse')
})

warehouse.post('/addAction', async (req, res) => {
     // we need to add the ware house here
     
     res.redirect('/manager')
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