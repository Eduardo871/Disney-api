const {Character, Movie} = require("../db");         
const Crud = require('./index');
const {Op} = require('sequelize')

// inicializamos la clase
const characterCrud = new Crud(Character);

// función que crea un personaje
const createCharacter = async (req, res) => {
    try {
        const content = req.body; // sacamos los datos del body
    
    // se comprueba que la edad sea mayor a cero
    if(content.age && content.weight){
        if(content.age < 0 || content.weight < 0){
            return res.status(400).send({message:"Number < 0",content:[]})
        };
    };
    
    // Se Crea una instancia character
    const character = await characterCrud.create(content);
    
    // se comprueba si hay que relacionar
    // una pelicula al personaje
    if(content.movies){
       await character.content.addMovies(content.movies);
    };
    
    // se comprueba que se haya podido completar el proceso
    if(character.message === "action complete"){
        character.message = "Character created";
        res.send(character)
    }else if (character.message === "action incomplete"){
        character.message = "Character not created";
        res.status(400).send(personaje)
    }
    } catch (error) {
     res.status(400).send({message:"movies not found", content:error})   
    }
}

const updateCharacter = async (req, res) => {
    const content = req.body;
    
    const id = req.query.id;
    
    // creando una instancia 
    const character = await characterCrud.update(content, id );
    
    // comprobando si el proceso se completó
    if(character.message === "action complete"){
        character.message = "Character updated";
        res.send(character)
    }else if (character.message === "action incomplete"){
        character.message = "Character not updated";
        res.status(400).send(character)
    }

}



const deleteCharacter = async (req, res) => {
    const id = req.query.id;

    // creando una instancia
    const character = await characterCrud.delete(id);
    
    // comprobando si el proceso se completó
    if(character.message === "action complete"){
        character.message = "Character deleted";
        res.send(character)
    }else if (character.message === "action incomplete"){
        character.message = "Character not deleted";
        res.status(400).send(character);
    }
}


const searchAllCharacters = async (req, res ) => {
    const {name, movie, age} = req.query;
    // comprobando si las querys de búsquedas
    // no son nulas
    const id = !movie ? ({}):{id:movie};
    
    const NAME = !name ? ({}):({name:{[Op.iLike]: `%${name}%`}})
    
    const AGE = !age || age < 0? ({}):({age: age});
    
    // creando una instancia
    const characters = await characterCrud.getAll({
        attributes:['name','image'], // se le indique que atributos traer
        where:{
            ...NAME, // filtra por nombre
            ...AGE // filtra por edad
        }, 
        include:{
            model:Movie, // filtra por película
            where:{      // y me incluye las peliculas en los parametros
                ...id
            }
        }
    });

    // comprobando si el proceso se completó
    if(characters.message === "action complete"){
        characters.message = "Sent data";
        res.send(characters)
    }else if(characters.message === "action incomplete"){
        characters.message = "Character not found";
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
        character.message = "Sent data";
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