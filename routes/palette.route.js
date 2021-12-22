// organizes routes
const express = require('express');
const palette = express.Router();
const {User} = require('../models/user');
const path = require('path');



palette.get('/select', async (req, res) => {
    // we need to show palettes in the system to be added
    res.render('addPalette')
})





module.exports = {palette};