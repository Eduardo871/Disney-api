const express = require("express");
const server = express();
const { 
    createCharacter,
    updateCharacter,
    deleteCharacter,
    searchAllCharacters,
    charactersFilter,
    charactersDetails
} = require('../controllers/characters');


// ruta para crear un personaje
server.post('/create', createCharacter );

// Ruta para eliminar un personaje
server.delete('/delete', deleteCharacter);

// Ruta para actualizar a un personaje 
server.put('/update', updateCharacter);

// Ruta para buscar todos los personajes
server.get('/', searchAllCharacters);

// Ruta para buscar personajes por nombres
server.get('/search',charactersFilter);

// Ruta que te devueleve el detalle de un pesonaje
server.get('/details', charactersDetails);


module.exports= server;