// organizes routes
const express = require('express');
const login = express.Router();
const {User} = require('../models/user');
const path = require('path');
//const {Crew} = require('./models/crew');


login.get('/', async (req, res) => {
    // render login page
    res.render('login')
})

//Post Route triggered by form submit action
login.post('/validate', async (req,res) =>{
    // need to validate if this user exist
    const email = req.body.email;
    const password = req.body.password
    const found = await User.findOne({where:{email: email, password: password}})
    if (found) {
        const loggedInUserID = found.id
        console.log("logged in user  " + loggedInUserID)
        req.session.userID = loggedInUserID
        if (found.role === 'manager') {
            res.redirect(`/manager`)
        }else {
            res.redirect(`/employee/`)
        }
    }else {
        const usernameAlert = `Username or password in incorrect, please try again`
        res.render('login', {usernameAlert})     
    }
 

   
})



module.exports = {login};