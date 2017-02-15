'use strict'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'
import axios from 'axios'

import App from './react/components/App'
import ListContainer from './react/containers/ListContainer'
import ListInputContainer from './react/containers/ListInputContainer'

import store from './store'
import { receiveLists, receiveList } from './action-creators/list-actions'
import { receiveTasks } from './action-creators/task-actions'

//if we need db data before site load, we need to make the axios call happen in the onEnter function. If we just do store.dispatch in onEnter fn, the action will be dispatched, but code will keep being processed without waiting for axios data to get back. So it will go on to render components w/o waiting, and some of those components will rely on axios data that hasn't returned yet.
//to make App wait until onEnter fn has finished running, use callback()
const onAppEnter = function (nextState, replace, callback) {
  //this is our frontend, so need to make axios calls to db. Can't just query db.
  axios.get('/api/list')
      .then(res => res.data)
      .then(lists => store.dispatch(receiveLists(lists)))
      .then(() => callback())
};

const onListEnter = function (nextState, replace, callback) {
  const list = axios.get(`/api/list/${nextState.params.id}`).then(res => res.data)
  const listTasks =  axios.get(`/api/list/${nextState.params.id}/tasks`).then(res => res.data)

  Promise.all([list, listTasks])
        .then(([list, tasks]) => {
          store.dispatch(receiveList(list));
          store.dispatch(receiveTasks(tasks));
        })
        .then(() => callback())
        .catch(console.error)
};

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} onEnter={onAppEnter} >
        <Route path='list' component={ListInputContainer} />
        <Route path='list/:id' component={ListContainer} onEnter={onListEnter}>
          <Route path=':taskView' />
        </Route>
       <IndexRedirect to='/list' />
      </Route>
    </Router>
   </Provider>,
  document.getElementById('main')
)

