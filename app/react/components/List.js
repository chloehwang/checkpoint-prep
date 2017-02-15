import React from 'react'
import TaskContainer from '../containers/TaskContainer'

export default (props) => {
  return (
    <div>
      <h2>{props.listName}</h2>
      <button className="btn  btn-danger btn-circle" onClick={() => props.handleListDelete(props.listId)}>x</button>
      <hr />

      <h5>Add a Task</h5>
      <TaskContainer taskView={props.params.taskView} listId={props.listId} />
    </div>
    )
}
