const express = require('express')
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const session = require('express-session');
const app = express();

app.engine('handlebars', expressHandlebars({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

app.set('view engine', 'handlebars');

// express session
app.set('trust proxy', 1)
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 365 * 1000
  }
}))


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
const {warehouse} = require('./routes/warehouse.route')
const {main} = require('./routes/main.route')

// Import my routes into the path '/'
app.use('/login', login);
app.use('/employee/', employee);
app.use('/manager/', manager);
app.use('/warehouse/', warehouse);
app.use('/', main)



module.exports = app;