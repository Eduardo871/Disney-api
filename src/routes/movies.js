const express = require('express');
const { 
    createMovie,
    deleteMovie,
    updateMovie,
    getAllMovie,
    detailsMovie
 } = require('../controllers/movies');
const server = express();

// Crear una movie
server.post('/create', createMovie);

// Eliminar una movie
server.delete('/delete', deleteMovie);

// Editar una movie 
server.put('/update', updateMovie);

// Busqueda de movie
server.get('/', getAllMovie);

// Búsqueda del detalled de una movie
server.get('/details', detailsMovie)

module.exports = server;