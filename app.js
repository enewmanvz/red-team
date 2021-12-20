const express = require('express')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const app = express();

app.engine('handlebars', expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

app.set('view engine', 'handlebars');


// support the parsing of incoming requests with urlencoded payloads (e.g. form POST)
app.use(express.urlencoded({ extended: true }));
// support the parsing of incoming requests with json payloads
app.use(express.json());


// serve static assets from the public/ folder
app.use(express.static('public'));


// various routes
const {login} = require('./routes/login.route')
const {employee} = require('./routes/employee.route')
const {manager} = require('./routes/manager.route')

// Import my routes into the path '/'
app.use('/login', login);
app.use('/employee/', employee);
app.use('/manager/', manager);



module.exports = app;