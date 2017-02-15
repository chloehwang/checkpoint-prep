import { ADD_LIST, RECEIVE_LISTS, RECEIVE_LIST, REMOVE_LIST } from '../constants'
import axios from 'axios'
import { browserHistory } from 'react-router'

export const addList = (list) => {
  return {
    type: ADD_LIST,
    list
  }
}

export const removeList = (listId) => {
  return {
    type: REMOVE_LIST,
    listId
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
      .then(list => {
        return dispatch(addList(list))
      })
      .then((action) => {
        const path = `/list/${action.list.id}`;
        browserHistory.push(path);
      })
  }
}

export const deleteList = (listId) => {
  return function(dispatch) {
    axios.delete(`/api/list/${listId}`)
      .then(res => res.data)
      .then(() => {
        return dispatch(removeList(listId))
      })
      .then(() => {
        const path = `/list`;
        browserHistory.push(path);
      })
  }
}
