const Crud = require("./index");
const {User} = require('../db');
const bcrypt = require('bcrypt');
const {SECRET} = process.env;
const sgMail = require('@sendgrid/mail')


// inicialuiza la clase
const userCrud = new Crud(User)

// Función que registra a un usuario
const registerUser = async (req, res) => {
    try {
        
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    const content = req.body;
    if(content.password && !regexPassword.test(content.password)){
        return res.status(400).send({message:"The password must contain between 6 and 20 characters at least one uppercase and at least one lowercase.",content:[]})
    }

    // Creando los hash necesarios 
    content.password = await bcrypt.hash(content.password, 10);
    content.token = await bcrypt.hash(`${content.email}@${SECRET}`, 10);
    
    // Creando una instacia 
    const register = await userCrud.create(content);
    
    // verificando que el proceso haya completado
    if(register.message === "action complete"){
        const emailSent = await sendMail(register.content.email, register.content.fullname, register.content.token); 
              
        if(emailSent === "Email sent"){
    
            res.send({
            message:"User created", 
            content:{
                token: register.content.token,
                fullname: register.content.fullname
            }});
            
        }else if(emailSent === "Email not sent"){

            res.send({
                message:"Email invalid but user created",
                content:{
                token: register.content.token,
                fullname: register.content.fullname
                }});
        }
    }else if (register.message === "action incomplete"){
        register.message = "Create faild";
        res.status(400).send(register)
    }
    } catch (error) {
     res.status(400).send({message:"the body is empty", content: error})   
    }
};

// Función para loguear a un usuario
const loginUser = async (req, res) => {
    try {
        const content = {email: req.query.email, password: req.query.password};
    
        // Creando una instancia
        const user = await userCrud.getByOne({ where: { email: content.email } });
        
        // Comparando los hash 
        const correctPassword = await bcrypt.compare(content.password, user.content.password)
        
        // Comprobando si el proceso se ha realizado correctamente
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
    } catch (error) {
        res.status(400).send({message:"The query is empty", content:error})
    }
}
const sendMail = async (to,fullname, token) => {
    const html = `
    <h1>Hello ${fullname}</h1>
    <h2>Welcome to API DISNEY</h2>
    <p>Your token authentiction is: ${token}</p>
    `
    
    try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
    to, 
    from:'eduardociare871@gmail.com',
    subject: 'WELCOME TO API DISNEY',
    html: html
    }
    const email = await sgMail.send(msg);
    if(email){
        console.log(email)
        return "Email sent"
    }
    } catch (error) {
        console.log(error)
        return "Email not sent"  
    }
}

module.exports = {
    registerUser,
    loginUser
}