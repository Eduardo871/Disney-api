const {STRING, INTEGER} = require("sequelize");


module.exports = (sequelize) => {
    sequelize.define('gener', {
        name: {
            type: STRING,
            allownull: true
        },
        image: {
            type: STRING,
            allownull: true,
        }
    },{ timestamps: false })
}