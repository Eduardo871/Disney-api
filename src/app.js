const {User} = require("./db");
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const { passportConfigure } = require('./config/auth.js');
const { headersConfiguration } = require('./config/headers.js');
const { errorConfiguration } = require('./config/errorCatching.js');

const server = express();
server.name = 'API';
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
//  SEBA TENES QUE VER LA PELÍCULA "Palabras robadas"
// // configure passport and session !!
// passportConfigure();

// headers middlewares configuration
headersConfiguration();

// error middlewares configuration
errorConfiguration();

// Middleware para comprobar el token de regitro
// server.use( async (req,res, next) => {
//     const token = req.query.apiKey;

//     if(req.path === '/auth/login' || req.path === '/auth/register'){
//         next()
//     }else {
//         try {
//         const user =  await User.findOne({where:{token}});
//         if(user) next() 
//         } catch (error) {
//             res.status(400).send({message:"Token invalid",content:""})
//         }        
//     }
// })

server.use('/', routes);


module.exports = server;
