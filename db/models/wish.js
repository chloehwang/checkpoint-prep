'use strict';
var Sequelize = require('sequelize')
var db = require('../../db/index')

const Wish = db.define('wish', {
    wish: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = Wish;
