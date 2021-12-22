// organizes routes
const express = require('express');
const box = express.Router();
const {User} = require('../models/user');
const path = require('path');



box.get('/', async (req, res) => {
    // render login page
    res.render('login')
})





module.exports = {box};