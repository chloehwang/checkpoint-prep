import React from 'react'
import { Link } from 'react-router'

export default function Tasks (props) {
  const listId = props.listId;
  const handleTaskToggle = props.handleTaskToggle;
  let tasks = props.tasks;

  tasks = tasks.map(task => {
    const completed = task.completed.toString() === "true";

    return (
      <tr key={task.id}>
        <td>{completed.toString()}</td>
        <td style={{textDecoration: completed ? 'line-through' : 'none'}}>{task.name}</td>
        <td><input
          checked={completed}
          id={task.id}
          name={task.completed}
          onChange={handleTaskToggle}
          className="form-check-input"
          type="checkbox"
        /></td>
      </tr>
    )
  });

  return (
    <div>
      <h5>View:
      <Link to={`/list/${listId}`} activeStyle={{ color: 'yellow' }}> All Tasks</Link> |
      <Link to={`/list/${listId}/complete`} activeStyle={{ color: 'yellow' }}> Completed Tasks</Link> |
      <Link to={`/list/${listId}/active`} activeStyle={{ color: 'yellow' }}> Active Tasks</Link>
        </h5>
        <br />

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
