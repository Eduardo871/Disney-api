const {Movie, Gener} = require('../db');
const Crud = require('./index');
const {Op} = require('sequelize');

const CrudMovie = new Crud(Movie);

const createMovie = async (req, res) => {
    const content = req.body;
    if(content.quality > 5 || content.quality < 1) {
        return res.send({
            message:"quantity is 1 a 5",
            content: ""
        });
    };
    const movie = await CrudMovie.create(content);
    if(content.characters){
        movie.content.addCharacters(content.characters)
        .catch((err) => (
            res.status(404).send({
                message:"character not found",
                content:err
            })
        ))        
    };
    if(content.geners){
        movie.content.addGeners(content.geners)
        .catch((err) => (
            res.status(404).send({
                message:"Gener  not found",
                content:err
            })
        ))
    };
    if(movie.message === "action complete"){
        movie.message = "Movie has created";
        res.send(movie)
    }else  if (movie.message === "action incomplete"){
        movie.message = "Movie not created";
        res.status(400).send(movie);
    }
};

const deleteMovie = async (req, res) => {
    const id = req.query.id;
    const deleted = await CrudMovie.delete(id);
    if(deleted.message === "action complete"){
        deleted.message = "Movie has deleted";
        res.send(deleted)
    }else  if (deleted.message === "action incomplete"){
        deleted.message = "Movie not deleted";
        res.status(400).send(deleted);
    }
};

const updateMovie = async (req, res) => {
    const id = req.query.id;
    const content = req.body;
    const updated = await CrudMovie.update(content, id);
    if(updated.message === "action complete"){
        updated.message = "Movie has updated";
        res.send(updated)
    }else  if (updated.message === "action incomplete"){
        updated.message = "Movie not updated";
        res.status(400).send(updated);
    }
};

const getAllMovie = async (req, res) => {
    const {title, gener, order} = req.query;
    const id = !gener?({}):({id:Number(gener)});
    const ORDER = !order?("ASC"):(order);
    const TITLE = !title?({}):({title:{[Op.iLike]:`%${title}%`}})
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
    if(movies.message === "action complete"){
        movies.message = "fetching movies success";
        res.send(movies)
    }else  if (movies.message === "action incomplete"){
        movies.message = "fetching movies faild";
        res.status(404).send(movies);
    }
    
};

const detailsMovie = async (req, res) => {
    const id = req.query.id;
    const movie = await CrudMovie.getByOne({
        where:{
            id: Number(id)
        },
        include: {
            all: true,
            nested: true
        }
    });
    if(movie.message === "action complete"){
        movie.message = "Sent movie ";
        res.send(movie)
    }else  if (movie.message === "action incomplete"){
        movie.message = "Dont sent movie";
        res.status(400).send(movie);
    }
};



module.exports = {
    createMovie,
    deleteMovie,
    updateMovie,
    getAllMovie,
    detailsMovie
}