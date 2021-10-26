const {STRING, INTEGER, DATE} = require("sequelize");


module.exports = (sequelize) => {
    sequelize.define('movie', {
        title: {
            type: STRING,
            allownull: true
        },
        image: {
            type: STRING,
            allownull: true,
        },
        created:{
            type: DATE,
            allownull: true,
        },
        quality: {
            type: INTEGER,
            allownull: false,
        }
    },{ timestamps: false })
}