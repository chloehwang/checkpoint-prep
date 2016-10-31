'use strict'
const api = require('express').Router()
const db = require('APP/db')
const Star = require('APP/db/models/star');
const Wish = require('APP/db/models/wish')

//want to get the ones that have certain star id but can't right now because the association is working 
api.get('/:starId', function (req, res, next) {

    Wish.findAll()
    .then(function(wishes) {
        console.log(wishes)
        res.status(200).json(wishes);
    });
});

api.post('/:starId', function (req, res, next) {
    Star.findOne({
        where: {
            id: req.params.starId
        }
    }).then(function (foundStar) {
        return Wish.create(req.body)
        .then(function (wish) {
            return wish.setStar(foundStar)
        })
    }).then(function (createdWish) {
        res.status(201).json(createdWish);
    });
});

api.delete('/:wishId', function (req, res, next) {
    Wish.destroy({
        where: {
            id: req.params.wishId
        }
    }).then(function (numDestroyed) {
        res.status(204).json(numDestroyed);
    });
});

module.exports = api;