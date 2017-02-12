//app has two children =
import React from 'react'
import Sidebar from '../components/Sidebar'
import store from '../../store.jsx'

import { createList, getAllLists } from '../../action-creators/list-actions.js'

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
    store.dispatch(getAllLists());
  }


  handleListSubmit (e) {
    e.preventDefault();
    const name = e.target.listName.value;
    store.dispatch(createList(name))
  }

  render() {

    const props = Object.assign({}, this.state, {
      handleListSubmit: this.handleListSubmit
    })
    return (
          <div id="main" className="container-fluid">
            <div className="col-xs-2">
              <Sidebar lists={this.state.lists}/>
            </div>
            <div className="col-xs-10">
            {
              this.props.children && React.cloneElement(this.props.children, props)
            }
            </div>
          </div>
        )
  }
}
