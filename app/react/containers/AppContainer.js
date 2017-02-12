import React from 'react'
import Sidebar from '../components/Sidebar'
import store from '../../store.jsx'

import { createList, getAllLists } from '../../action-creators/list-actions.js'
import { createTask, taskToggle } from '../../action-creators/task-actions.js'

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    });
    store.dispatch(getAllLists());
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleListSubmit (e) {
    e.preventDefault();
    const name = e.target.listName.value;
    store.dispatch(createList(name));
  }

  handleTaskSubmit (e) {
    e.preventDefault();
    const listId = this.state.lists.selectedList.id;
    const task = e.target.taskName.value;
    store.dispatch(createTask(task, listId));
  }

  handleTaskToggle (e) {
    const taskStatus = e.target.name;
    const taskId = e.target.id;
    store.dispatch(taskToggle(taskId, taskStatus));
  }

  render() {
    const props = Object.assign({}, this.state, {
      handleListSubmit: this.handleListSubmit,
      handleTaskSubmit: this.handleTaskSubmit,
      handleTaskToggle: this.handleTaskToggle
    })

    return (
          <div id="main" className="container-fluid">
            <div className="col-xs-2">
              <Sidebar lists={this.state.lists.lists} />
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
