// organizes routes
const express = require('express');
const login = express.Router();
const {User} = require('../models/user');
//const {Crew} = require('./models/crew');


login.get('/', async (req, res) => {
    // render login page
    res.render('login')
})

//Post Route triggered by form submit action
login.post('/validate', async (req,res) =>{
    // need to valdate if this user exist
    const email = req.body.email;
    const password = req.body.password
    
    const found = await User.findOne({where:{email: email, password: password}})
    if (found) {
        if (found.role === 'manager') {
            res.redirect('/manager')
        }else {
            res.redirect('/employee')
        }
    }
   
    
    
    
    /*
    const newSauce = await Sauce.create(req.body)
    //Create a sauceAlert to pass to the template
    let sauceAlert = `${newSauce.name} added to your database`
    //Find newSauce in db by id
    const foundSauce = await Sauce.findByPk(newSauce.id)
    if(foundSauce){
        res.render('newSauceForm',{sauceAlert})
    } else {
        sauceAlert = 'Failed to add Sauce'
        res.render('newSauceForm',{sauceAlert})
    }
    */
})



module.exports = {login};