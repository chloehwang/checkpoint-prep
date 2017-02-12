import React from 'react'
import store from '../../store.jsx'
import { findList } from '../../action-creators/list-actions.js'
import { getAllTasks } from '../../action-creators/task-actions.js'

export default class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
  }
  componentDidMount() {
      const listId = this.props.routeParams.id;
      store.dispatch(findList(listId));
      store.dispatch(getAllTasks(listId));
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.params.id !== this.props.routeParams.id) {
      const listId = nextProps.params.id;
      store.dispatch(findList(listId));
      store.dispatch(getAllTasks(listId));
    }
  }

  handleInput(e) {
    this.setState({value: event.target.value})
  }

  render() {
    const isSubmitted = this.props.isSubmitted;
    const id = this.props.routeParams.id;
    const listName = this.props.lists.selectedList.name;
    const tasks = this.props.tasks.tasks.map(task => {
      let completed = task.completed.toString()

      return (
        <tr key={task.id} onChange={(e, completed) => this.props.handleTaskToggle(e, completed)}>
              <td>{ task.completed.toString() }</td>
              <td>{ completed === "true" ? <strike>{task.name}</strike> : task.name }</td>
              <td><input id={task.id} className="form-check-input" type="checkbox" /></td>
        </tr>
      )
    });


    return (
      <div>
        <h2>{listName}</h2>
        <hr/>
        <h5>Add a Task</h5>
        <form className="form-inline" onSubmit={this.props.handleTaskSubmit}>
          <input type="text" className="form-control" name="taskName" id="inlineFormInput" value={this.state.value} onChange={this.handleInput}/>

          <button type="submit" className="btn btn-success">Submit</button>

        </form>
        <hr/>
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

// <tr key={song.id}>
//                   <td>
//                     <button className="btn btn-default btn-xs" onClick={() => toggle(song, songs)}>
//                       <span className={song.id === currentSong.id && isPlaying ? "glyphicon glyphicon-pause" : "glyphicon glyphicon-play"}></span>
//                     </button>
//                   </td>
//                   <td>{ song.name }</td>
//                   <td>
//                     <span>{ song.artists ? song.artists.map(artist => artist.name).join(', ') : null }</span>
//                   </td>
//                   <td>{ song.genre }</td>
//                 </tr>
