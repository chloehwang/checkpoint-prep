import React from 'react'
import { connect } from 'react-redux'
import TaskInput from '../components/TaskInput'
import Tasks from '../components/Tasks'

import { createTask, taskToggle } from '../../action-creators/task-actions.js'

const filterTasks = (tasks, view) => {
  if (!view) return tasks;
  const complete = view === "complete";
  return tasks.filter(task => task.completed === complete)
}

export default connect(
  (state, ownProps) => {
    return {
      listId: ownProps.listId,
      tasks: filterTasks(state.tasks.tasks, ownProps.taskView)
    }
  },
  (dispatch) => {
    return {
      create: (task, listId) => dispatch(createTask(task, listId)),
      toggle: (taskId, taskStatus) => dispatch(taskToggle(taskId, taskStatus))
      }
  }
)(class extends React.Component {
  constructor () {
    super()
    this.state = {value: ''};
    this.handleInput = this.handleInput.bind(this);
    this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
    this.handleTaskToggle = this.handleTaskToggle.bind(this);
  }

  handleInput(e) {
    this.setState({value: e.target.value});
  }

  handleTaskSubmit (e) {
    e.preventDefault();
    const listId = this.props.listId;
    const task = e.target.taskName.value;
    this.setState({value: ""});
    this.props.create(task, listId);
  }

  handleTaskToggle (e) {
    const taskStatus = e.target.name;
    const taskId = e.target.id;
    this.props.toggle(taskId, taskStatus);
  }

  render() {
    return (
      <div>
        <TaskInput
          handleTaskSubmit={this.handleTaskSubmit}
          handleInput={this.handleInput}
          value={this.state.value}
        />
        <hr/>

        <Tasks
          listId = {this.props.listId}
          handleTaskToggle = {this.handleTaskToggle}
          tasks = {this.props.tasks}
        />
      </div>
      )
  }
})
