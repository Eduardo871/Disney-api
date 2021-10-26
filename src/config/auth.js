const passport = require("passport");
const session = require("express-session");
const PassportLocal = require('passport-local').Strategy;
const {User} = require('../db');
const bcrypt = require('bcrypt');
const express = require("express");
const SECRET = process.env.SECRET;
const server = express();

const passportConfigure = () => {

    server.use(session({
        secret: SECRET,
        resave: true,
        saveUninitialized: true
      }))
      server.use(passport.initialize());
      server.use(passport.session());
      
      passport.use(new PassportLocal( async (username, password, done) => {
      
        try {
          const user = await User.findOne({where:{email:username}});
          const compare = await bcrypt.compare(password, user.password);
          if(!compare) return done(null, false, { message: 'Incorrect Password' });
          console.log(compare)
          return done(null, user);
      
        } catch (error) {
           return done(null, false, { message: 'Incorrect username.' });
        }
      }))
      
      
      passport.serializeUser((user, done)=>{
        done(null, user.id);
      });
      
      passport.deserializeUser(async (id, done)=>{
        const user = await User.findByPk(id);
        done(null, user);
      })
      
}

module.exports = {
    passportConfigure
}