import { ADD_LIST, RECEIVE_LISTS, RECEIVE_LIST } from '../constants'
import axios from 'axios';
import {browserHistory} from 'react-router';

export const addList = (list) => {
  return {
    type: ADD_LIST,
    list
  }
}

export const receiveLists = (lists) => {
  return {
    type: RECEIVE_LISTS,
    lists
  }
}

export const receiveList = (selectedList) => {
  return {
    type: RECEIVE_LIST,
    selectedList
  }
}

export const createList = (name) => {
  return function(dispatch) {
    axios.post('/api/list', {name})
      .then(res => res.data)
      .then((list) => {
        return dispatch(addList(list));
      })
      .then((action) => {
        const path=`/list/${action.list.id}`;
        browserHistory.push(path);
      })
  }
}

export const getAllLists = () => {
  return function(dispatch) {
    axios.get('/api/list')
      .then(res => res.data)
      .then((allLists) => {
        dispatch(receiveLists(allLists))
      })
  }
}

export const findList = (id) => {
  return function(dispatch) {
    axios.get(`/api/list/${id}`)
      .then(res => res.data)
      .then((list) => {
        dispatch(receiveList(list))
      })
  }
}
