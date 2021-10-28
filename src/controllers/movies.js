const {Movie, Gener} = require('../db');
const Crud = require('./index');
const {Op} = require('sequelize');

// Se inicializa la clase
const CrudMovie = new Crud(Movie);

// Se crea una función para crear peliculas
const createMovie = async (req, res) => {

    try {
        const content = req.body;
    
    // Comprobando si quality es correcto
    if(content.quality && (content.quality > 5 || content.quality < 1)) {
        return res.send({
            message:"the quality must be between 1 and 5",
            content: ""
        });
    };

    // Creando una instancia
    const movie = await CrudMovie.create(content);
   
    // Relacionando los personajes con 
    // las películas
    if(content.characters){
       await movie.content.addCharacters(content.characters)       
    };

    // Relacionando los personajes con los generos
    if(content.geners){
        await movie.content.addGeners(content.geners)
    };
    
    // Comprobando si el proceso ha sido completado
    if(movie.message === "action complete"){
        movie.message = "Movie created";
        res.status(201).send(movie)
    }else  if (movie.message === "action incomplete"){
        movie.message = "Movie not created";
        res.status(400).send(movie);
    }
    } catch (error) {
     res.status(400).send({message:"Character or Gener not found", content: error})   
    }
};

const deleteMovie = async (req, res) => {

    const id = req.query.id;

    // Creando una instancia 
    const deleted = await CrudMovie.delete(id);

    // Comprobando que el proceso se haya completado
    if(deleted.message === "action complete"){
        deleted.message = "Movie deleted";
        res.send(deleted)
    }else  if (deleted.message === "action incomplete"){
        deleted.message = "Movie not deleted";
        res.status(400).send(deleted);
    }
};

const updateMovie = async (req, res) => {
   
    const id = req.query.id;

    const content = req.body;
   
    // creando una instancia  
    const updated = await CrudMovie.update(content, id);
   
   // Comprobando que el proceso se haya completado
    if(updated.message === "action complete"){
        updated.message = "Movie updated";
        res.send(updated)
    }else  if (updated.message === "action incomplete"){
        updated.message = "Movie not updated";
        res.status(400).send(updated);
    }
};

const getAllMovie = async (req, res) => {
    const {title, gener, order} = req.query;
    
    // Comprobando que las querys 
    // no sean nulas 
    const id = !gener ?({}):({id:Number(gener)});
    const ORDER = !order && (order !== "ASC" || order !== "DES") ?("ASC"):(order);
    const TITLE = !title?({}):({title:{[Op.iLike]:`%${title}%`}})
    
    // Creando una instancia 
    const movies = await CrudMovie.getAll({
        attributes:['title','image','created'],
        where: {
            ...TITLE,
        },
        include:{
            model:Gener,
            where:{
                ...id
            }
        },
        order:[
            ["created", ORDER]
        ]
    })

    // Comprobando que el proceso se haya completado
    if(movies.message === "action complete"){
        movies.message = "Sent data";
        res.send(movies)
    }else  if (movies.message === "action incomplete"){
        movies.message = "Movie not found";
        res.status(404).send(movies);
    }
    
};

const detailsMovie = async (req, res) => {
    const id = req.query.id;

    // Creando una instancia
    const movie = await CrudMovie.getByOne({
        where:{
            id: Number(id)
        },
        include: {
            all: true,
            nested: true
        }
    });
    
    // Comprobando que el proceso se haya completado 
    if(movie.message === "action complete"){
        movie.message = "Sent data";
        res.send(movie)
    }else  if (movie.message === "action incomplete"){
        movie.message = "Movie not found";
        res.status(404).send(movie);
    }
};



module.exports = {
    createMovie,
    deleteMovie,
    updateMovie,
    getAllMovie,
    detailsMovie
}