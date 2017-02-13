'use strict'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router'

import AppContainer from './react/containers/AppContainer'
import TaskContainer from './react/containers/TaskContainer'
import ListInput from './react/components/List'

import store from './store'

render(
  <Router history={browserHistory}>
    <Provider store={store}>
      <Route path='/' component={AppContainer}>
        <Route path='list' component={ListInput} />
        <Route path='list/:id' component={TaskContainer} />
        <Route path='list/:id/:taskView' component={TaskContainer} />
        <IndexRedirect to='/list' />
      </Route>
    </Provider>
  </Router>,
  document.getElementById('main')
)

