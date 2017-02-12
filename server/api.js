'use strict'
const api = require('express').Router()
const db = require('APP/db')
const { List, Task } = require('../db/models/index')

// If you aren't getting to this object, but rather the index.html your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!

//FIND ALL LISTS
api.get('/list', (req, res) => {
	List.findAll()
	.then((allLists) => res.send(allLists))
})

//FIND A LIST
api.get('/list/:id', (req, res) => {
	List.findOne({
		where: {
			id: req.params.id
		}
	})
	.then(list => res.send(list))
})

//CREATE A LIST
api.post('/list', (req, res) => {
	List.create({
		name: req.body.name
	})
	.then( list => res.send(list))
})

//DELETE A LIST
api.delete('/list/:id', (req, res) => {
	List.destroy({where: {
		id: req.params.id}
	})
	.then(res.end())
})

//CREATE A TASK IN A LIST
api.post('/list/:id', (req, res) => {
	Task.create({
		name: req.body.task,
		listId: req.params.id
	})
	.then( list => res.send(list))
})

//GET ALL TASKS FOR A LIST
api.get('/list/:id/tasks', (req, res) => {
	Task.findAll({where: {listId: req.params.id}})
	.then( tasks => res.send(tasks))
})

//MARK TASK AS COMPLETE
api.delete('/tasks/:taskId', (req, res) => {
	Task.findById(req.params.taskId)
	.then( task => {
		return task.set('completed', true).save()
	})
	.then(task => res.send(task))

})

//MARK TASK AS INCOMPLETE
api.put('/tasks/:taskId', (req, res) => {
	Task.findById(req.params.taskId)
	.then( task => {
		return task.set('completed', false).save()
	})
	.then(task => res.send(task))

})

module.exports = api;
