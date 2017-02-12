import React from 'react'
import { Link } from 'react-router'

import store from '../../store.jsx'
import { findList, deleteList } from '../../action-creators/list-actions.js'
import { getAllTasks } from '../../action-creators/task-actions.js'

export default class List extends React.Component {
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
      this.setState({value: ''})
    }
    if (nextProps.params.id !== this.props.routeParams.id) {
      const listId = nextProps.params.id;
      store.dispatch(findList(listId));
      store.dispatch(getAllTasks(listId));
    }
  }

  handleInput(e) {
    this.setState({value: e.target.value})
  }

  render() {
    const listId = this.props.routeParams.id;
    const listName = this.props.lists.selectedList.name;
    const handleTaskToggle = this.props.handleTaskToggle;
    const handleTaskSubmit = this.props.handleTaskSubmit;
    const taskView = this.props.routeParams.taskView;
    let tasks = this.props.tasks.tasks;
    let taskStatus;

    if (taskView) {
      taskStatus = taskView === "complete" ? true : false;
      tasks = tasks.filter(task => {
        return task.completed === taskStatus
      });
    }

    tasks = tasks.map(task => {
      const completeStr = task.completed.toString();
      const completed = completeStr === "true";

      return (
        <tr key={task.id}>
          <td>{ completeStr }</td>
          <td>{ completed ? <strike>{task.name}</strike> : task.name }</td>
          <td><input checked={ completed ? true : false } id={task.id} name={task.completed} onChange={handleTaskToggle} className="form-check-input" type="checkbox" /></td>
        </tr>
      )
    });

    return (
      <div>
        <h2>{listName}</h2>
        <button className="btn  btn-danger btn-circle" onClick={() => store.dispatch(deleteList(listId)) }>x</button>

        <hr />

        <h5>Add a Task</h5>
        <form className="form-inline" onSubmit={handleTaskSubmit}>
          <input type="text" className="form-control" name="taskName" id="inlineFormInput" value={this.state.value} onChange={this.handleInput} />
          <button type="submit" className="btn btn-success">Submit</button>
        </form>

        <hr/>

        <h5>View: <Link to={`/list/${listId}`} activeStyle={{ color: 'yellow' }}>All Tasks</Link> | <Link to={`/list/${listId}/complete`} activeStyle={{ color: 'yellow' }}>Completed Tasks</Link> | <Link to={`/list/${listId}/active`} activeStyle={{ color: 'yellow' }}>Active Tasks</Link>
        </h5>

        <br/>

        <table className='table'>
          <thead>
            <tr>
              <th>Completed?</th>
              <th>Task</th>
              <th>Mark as Complete</th>
            </tr>
          </thead>
          <tbody>
            {tasks ? tasks : null}
          </tbody>
        </table>

      </div>
      )
  }
}
