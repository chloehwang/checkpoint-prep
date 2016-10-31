'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const db = require('../../db/index');
const Star = require('./star');
const Wish = require('./wish');

module.exports = {Star, Wish};

Star.hasMany(Wish, { as: 'wish' });



