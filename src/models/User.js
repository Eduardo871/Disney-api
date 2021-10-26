const {STRING, INTEGER} = require("sequelize");


module.exports = (sequelize) => {
    sequelize.define('user', {
        fullname: {
            type: STRING,
            allownull: true
        },
        email: {
            type: STRING,
            allownull: true,
            unique: true,
        },
        password:{
            type: STRING,
            allownull: true,
            unique: true,
        },
        token: {
            type: STRING,
            allownull: true   
        }
    },{ timestamps: false })
}