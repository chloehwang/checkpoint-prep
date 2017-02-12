'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';

import AppContainer from './react/containers/AppContainer'
import List from './react/components/List'
import SingleList from './react/components/SingleList'

import store from './store'



render (
  <Router history={browserHistory}>
    <Provider store={store}>
      <Route path='/' component={AppContainer}>
        <Route path='list' component={List}/>
        <Route path='list/:id' component={SingleList}/>
        <Route path='list/:id/:taskView' component={SingleList}/>
        <IndexRedirect to='/list' />
      </Route>
    </Provider>
  </Router>,
  document.getElementById('main')
)

