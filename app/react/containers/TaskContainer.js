import React from 'react'

import TaskInput from './TaskInput'
import Tasks from './Tasks'
import store from '../../store.jsx'
import { findList, deleteList } from '../../action-creators/list-actions.js'
import { getAllTasks } from '../../action-creators/task-actions.js'

export default class TaskContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    const listId = this.props.routeParams.id;
    store.dispatch(findList(listId));
    store.dispatch(getAllTasks(listId));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tasks.tasks !== this.props.tasks.tasks) {
      this.setState({value: ''});
    }
    if (nextProps.params.id !== this.props.routeParams.id) {
      const listId = nextProps.params.id;
      store.dispatch(findList(listId));
      store.dispatch(getAllTasks(listId));
    }
  }

  handleInput(e) {
    this.setState({value: e.target.value});
  }

  render() {
    const listId = this.props.routeParams.id;
    const listName = this.props.lists.selectedList.name;

    return (
      <div>
        <h2>{listName}</h2>
        <button className="btn  btn-danger btn-circle" onClick={() => store.dispatch(deleteList(listId)) }>x</button>
        <hr />

        <h5>Add a Task</h5>
        <TaskInput
          handleTaskSubmit={this.props.handleTaskSubmit}
          handleInput={this.handleInput}
          value={this.state.value}
        />
        <hr/>

        <Tasks
          listId = {this.props.routeParams.id}
          handleTaskToggle = {this.props.handleTaskToggle}
          taskView = {this.props.routeParams.taskView}
          tasks = {this.props.tasks.tasks}
        />
      </div>
      )
  }
}
