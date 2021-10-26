const express = require("express");
const { bulkcreateGener } = require("../controllers/Gener");
const server = express();
const {
    registerUser,
    loginUser
} = require('../controllers/userAuth');

// Ruta para registrar un usuario
server.post('/register',registerUser)


// Ruta para hacer login
server.get('/login', loginUser)


// Ruta para probar el bulkcreate
server.get('/bulkcreate', bulkcreateGener);



module.exports = server;