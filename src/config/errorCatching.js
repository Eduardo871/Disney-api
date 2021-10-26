const express = require("express");

const server = express();


const errorConfiguration = () => {
    // Error catching endware.
    server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
    });

}

module.exports = {
    errorConfiguration
}