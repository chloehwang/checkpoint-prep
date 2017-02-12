import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
import listReducer from './reducers/list-reducer.js'
import creatLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'


export default createStore(listReducer, applyMiddleware(creatLogger(), thunkMiddleware))
