'use strict';
var Sequelize = require('sequelize');
var db = require('../../db/index');

const Star = db.define('star', {
  name: Sequelize.STRING,
});

module.exports = Star;