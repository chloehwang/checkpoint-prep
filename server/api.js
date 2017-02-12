'use strict'
const api = require('express').Router()
const db = require('APP/db')
const { List, Task } = require('../db/models/index')

// If you aren't getting to this object, but rather the index.html your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!

api.get('/list', (req, res) => {
	List.findAll()
	.then((allLists) => res.send(allLists))
})

api.get('/list/:id', (req, res) => {
	List.findOne({
		where: {
			id: req.params.id
		}
	})
	.then(list => res.send(list))
})


api.post('/list', (req, res) => {
	List.create({
		name: req.body.name
	})
	.then( list => res.send(list))
})


//list/:id/tasks

module.exports = api;
