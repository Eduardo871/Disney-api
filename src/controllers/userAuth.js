const Crud = require("./index");
const {User} = require('../db');
const bcrypt = require('bcrypt');
const {SECRET} = process.env;

const userCrud = new Crud(User)

const registerUser = async (req, res) => {// 
    const content = req.body;
    content.password = await bcrypt.hash(content.password, 10);
    content.token = await bcrypt.hash(`${content.email}@${SECRET}`, 10);
    const register = await userCrud.create(content);
    console.log(register)
    if(register.message === "action complete"){
        register.message = "User created";
        res.send(register)
    }else if (register.message === "action incomplete"){
        register.message = "Create faild";
        res.status(400).send(register)
    }
};

const loginUser = async (req, res) => {
    const content = {email: req.query.email, password: req.query.password};
    const user = await userCrud.getByContent({ where: { email: content.email } });
    const correctPassword = await bcrypt.compare(content.password, user.content.password)
    if(user.message === "action complete" && user.content !== null){
        if(correctPassword){
            user.message = "Login Success";
            res.send({
                fullname: user.content.fullname,
                token: user.content.token
            })
        }else{
            res.status(400).send({
                message:"Email or password is incorrect",
                content:""
            })
        }
    }else if (user.message === "action complete"){
        res.status(400).send({
            message:"Email or password is incorrect",
            content:""
        })
    }
}


module.exports = {
    registerUser,
    loginUser
}