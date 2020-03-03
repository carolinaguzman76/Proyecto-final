// Enviroment variables
require('dotenv').config()

// Database connection
require('./configs/mongoose.config')

const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const path         = require('path');

const app = express();

// // Configs
require('./configs/middleware.config')(app)
require('./configs/locals.config')(app)
require('./configs/session.config')(app)

// // Base URLS
const index = require('./routes/index');
app.use('/', index);
app.use('/api/auth', require('./routes/auth.routes'))
// app.use('/api/coasters', require('./routes/coasters.routes'))
// app.use('/api/files', require('./routes/files.routes.js'))

// Esto se puede quitar?
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


module.exports = app;

