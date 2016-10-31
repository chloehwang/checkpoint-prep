'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {Router, Route, browserHistory, IndexRoute} from 'react-router'
import store from './store'
import Root from './components/Root'
import AllStarsContainer from './components/allStars/AllStarsContainer'
import SingleStarContainer from './components/singleStar/SingleStarContainer'
import {loadStars, loadStar, loadWishes} from './action-creators';

const onStarsEnter = function () {
    store.dispatch(loadStars());
}

const onStarEnter = function (nextRouterState) {
    const starId = nextRouterState.params.starId;
    const thunk = loadStar(starId);
    const thunk2 = loadWishes(starId)
    console.log('THUNK',thunk)
    store.dispatch(thunk);
    console.log(nextRouterState)
    store.dispatch(thunk2)
}

ReactDOM.render (
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path='/'/>
            <Route path='stars' component={AllStarsContainer} onEnter={onStarsEnter}/>
            <Route path='stars/:starId' component={SingleStarContainer} onEnter={onStarEnter}/>
            <IndexRoute component={AllStarsContainer} onEnter={onStarsEnter} />
            
    </ Router >
  </Provider>,
  document.getElementById('main')
);


