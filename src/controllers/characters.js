const {Character, Movie} = require("../db");         
const Crud = require('./index');
const {Op} = require('sequelize')


const characterCrud = new Crud(Character);

const createCharacter = async (req, res) => {
    const content = req.body;
    console.log(content)
    const character = await characterCrud.create(content);
    if(content.movies){
        character.content.addMovies(content.movies)
    }
    if(character.message === "action complete"){
        character.message = "Personaje created";
        res.send(character)
    }else if (character.message === "action incomplete"){
        character.message = "Personaje not created";
        res.status(400).send(personaje)
    }
}

const updateCharacter = async (req, res) => {
    const content = req.body;
    const id = req.query.id;
    const character = await characterCrud.update(content, id );
    if(character.message === "action complete"){
        character.message = "Personaje updated";
        res.send(character)
    }else if (character.message === "action incomplete"){
        character.message = "Personaje not updated";
        res.status(400).send(character)
    }

}



const deleteCharacter = async (req, res) => {
    const id = req.query.id;
    const character = await characterCrud.delete(id);
    if(character.message === "action complete"){
        character.message = "Personaje deleted";
        res.send(character)
    }else if (character.message === "action incomplete"){
        character.message = "Personaje not deleted";
        res.status(400).send(character);
    }
}


const searchAllCharacters = async (req, res ) => {
    const {name, movie, age} = req.query;
    const id = !movie ? ({}):{id:movie};
    const NAME = !name ? ({}):({name:{[Op.iLike]: `%${name}%`}})
    const AGE = !age ? ({}):({age: age});
    const characters = await characterCrud.getAll({
        attributes:['name','image'],
        where:{
            ...NAME,
            ...AGE
        }, 
        include:{
            model:Movie,
            where:{
                ...id
            }
        }
    });
    if(characters.message === "action complete"){
        characters.message = "Fetching Complete";
        res.send(characters)
    }else if(characters.message === "action incomplete"){
        characters.message = "Personaje not deleted";
        res.status(400).send(characters);
    }
};

const charactersFilter = async (req, res, next) => {
    const {name, age, movies} = req.query;

    const characters = await characterCrud.getAll({
        where: {
            name:{[Op.iLike]: `%${name}%`},
            age,
        },
        include: {
            all: true,
            nested: true
        }
    });
    if(characters.message === "action complete"){
        characters.message = "Fetching Complete";
        res.send(characters)
    }else if(characters.message === "action incomplete"){
        characters.message = "Characters not found";
        res.status(400).send(characters);
    }
}


const charactersDetails = async (req, res) => {
    const {id} = req.query;
    const character = await characterCrud.getByOne({
        where:{
            id
        },
        include: {
            all: true,
            nested: true
        }
    });
    if(character.message === "action complete"){
        character.message = "Fetching Complete";
        res.send(character)
    }else if(character.message === "action incomplete"){
        character.message = "Character not found";
        res.status(400).send(character);
    }
}

module.exports = {
    deleteCharacter,
    updateCharacter,
    createCharacter,
    searchAllCharacters,
    charactersFilter,
    charactersDetails
}