import { createStore, applyMiddleware, combineReducers } from 'redux'
import listReducer from './reducers/list-reducer.js'
import taskReducer from './reducers/task-reducer.js'
import creatLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'


export default createStore(combineReducers({lists: listReducer, tasks: taskReducer}), applyMiddleware(creatLogger(), thunkMiddleware))
