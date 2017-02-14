'use strict'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'
import axios from 'axios'

import App from './react/components/App'
import TaskContainer from './react/containers/TaskContainer'
import ListInput from './react/components/ListInput'

import store from './store'
import { receiveLists, getAllLists } from './action-creators/list-actions'

//if we need db data before site load, we need to make the axios call happen in the onEnter function. If we just do store.dispatch in onEnter fn, the action will be dispatched, but code will keep being processed without waiting for axios data to get back. So it will go on to render components w/o waiting, and some of those components will rely on axios data that hasn't returned yet.
//to make App wait until onEnter fn has finished running, use callback()
const onAppEnter = function (nextRouterState, replace, callback) {
  axios.get('/api/list')
      .then(res => res.data)
      .then(allLists => {
       store.dispatch(receiveLists(allLists))
      })
      .then(() => callback())
};

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} onEnter={onAppEnter} >
        <Route path='list' component={ListInput} />
        <Route path='list/:id' component={TaskContainer} />
        <Route path='list/:id/:taskView' component={TaskContainer} />
        <IndexRedirect to='/list' />
      </Route>
    </Router>
   </Provider>,
  document.getElementById('main')
)

