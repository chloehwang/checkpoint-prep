'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


module.exports = db.define('task', {
  name: Sequelize.STRING,
  completed: Sequelize.BOOLEAN
})
