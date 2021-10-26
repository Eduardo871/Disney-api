const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const userAuth = require('./userAuth');

const character = require('./characters');

const movie = require('./movies');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/auth', userAuth);

router.use('/characters', character);

router.use('/movies', movie);


module.exports = router;
