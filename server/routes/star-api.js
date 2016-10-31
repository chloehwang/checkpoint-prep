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
    console.log('POSTING!!!!')
    console.log(req.body)
    Star.create(req.body)
    .then(function (createdStar) {
        res.status(201).json(createdStar);
    });
});

api.get('/:starId', function (req, res, next) {
    Star.findOne({
        where: {
            id: req.params.starId
        }
    }).then(function (star) {
        console.log('STAR!!!',star)
        res.status(200).json(star);
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