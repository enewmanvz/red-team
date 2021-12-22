// organizes routes
const express = require('express');
const main = express.Router();



main.get('/logout', async (req, res) => {
    // render login page
    req.session.destroy()
    res.redirect('http://localhost:3000')
})




module.exports = {main};