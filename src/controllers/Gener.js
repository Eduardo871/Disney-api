const {Gener} = require('../db');

const bulkcreateGener = (req, res) => {
    Gener.bulkCreate([
        {
            name: "Acción",
            image:""
        },
        {
            name:"Aventura",
            image: ""
        },
        {
            name:"Ciencia Ficción",
            image:"",
        },
        {
            name:"Comedia",
            image: "",
        },
        {
            name:"Terror",
            image:""
        },
        {
            name:"Drama",
            image:""
        },
        {
            name: "Fanatasia",
            image: ""
        },
        {
            name: "Musical",
            image:""
        }
    ])
    .then(resp => res.send(resp))
    .catch(err => res.send(err))
}
module.exports = {
    bulkcreateGener
}