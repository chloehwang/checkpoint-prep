'use strict'
const api = require('express').Router()
const db = require('APP/db')
const Star = require('APP/db/models/star');

api.get('/hello', (req, res) => res.send({hello: 'world'}))

api.get('/', function(req, res, next) {
    Star.findAll()
    .then(function(stars) {
        res.status(200).json(stars);
    });
});

api.post('/', function (req, res, next) {
    Star.create(req.body)
    .then(function (createdStar) {
        res.status(201).json(createdStar);
    });
});

api.put('/:starId', function (req, res, next) {
    Star.findOne({
        where: req.params.starId
    }).then(function (star) {
        return star.update(req.body);
    }).then(function (updatedStar) {
        res.status(201).json(updatedStar);
    });
});

api.delete('/:starId', function (req, res, next) {
    Star.destroy({
        where: {
            id: req.params.starId
        }
    }).then(function (numDestroyed) {
        res.status(204).json(numDestroyed);
    });
});

module.exports = api;