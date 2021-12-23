// organizes routes
const express = require('express');
const login = express.Router();
const {User} = require('../models/user');
const path = require('path');
const bcrypt = require('bcrypt');


login.get('/', async (req, res) => {
    // render login page
    res.render('login')
})

//Post Route triggered by form submit action
login.post('/validate', async (req,res) =>{
    // need to validate if this user exist
    const email = req.body.email;
    const found = await User.findOne({where:{email: email}})
    if (found) {
        // we need to compare the password
        bcrypt.compare(req.body.password, found.password, async function (err,result){
            if (result) {

                // set the session
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


    }else {
        const usernameAlert = `Username or password in incorrect, please try again`
        res.render('login', {usernameAlert})   

    }

   
 

   
})



module.exports = {login};