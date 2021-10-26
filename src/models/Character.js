const {STRING, INTEGER} = require("sequelize");


module.exports = (sequelize) => {
    sequelize.define('character', {
        name: {
            type: STRING,
            allownull: true
        },
        age: {
            type: INTEGER,
            allownull: true,
        },
        weight:{
            type: INTEGER,
            allownull: true,
        },
        image : {
            type: STRING,
            allownull: false,
        },
        description : {
            type: STRING, 
            allownull: false
            
        }
    },{ timestamps: false })
}