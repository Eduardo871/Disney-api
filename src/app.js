const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const { headersConfiguration } = require('./config/headers.js');
const { errorConfiguration } = require('./config/errorCatching.js');
const {User} = require('./db')

const server = express();
server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));



// Configuracion de las cabeceras de la
// consulta http
// headersConfiguration();

// Middleware para detectar un error 
// en la api y consoleguearlo
errorConfiguration();

// // comprueba un token
server.use( async (req,res, next) => {
    const token = req.query.apiKey;

    if(req.path === '/auth/login' || req.path === '/auth/register'){
        next()
    }else {
        try {
        const user =  await User.findOne({where:{token}});
        if(user) next()
        else res.status(400).send({message:"Token invalid",content:""}) 
        
    } catch (error) {
            res.status(400).send({message:"Token invalid",content:""})
        }        
    }
})

// inicializando las rutas 
server.use('/', routes);


module.exports = server;
