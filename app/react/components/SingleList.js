import React from 'react'
import store from '../../store.jsx'
import { findList } from '../../action-creators/list-actions.js'

export default class List extends React.Component {

  componentDidMount() {
      const listId = this.props.routeParams.id;
      store.dispatch(findList(listId));
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.params.id !== this.props.routeParams.id) {
      const listId = nextProps.params.id;
      store.dispatch(findList(listId));
    }
  }

  render() {

    const listName = this.props.selectedList.name
    return (
      <div>
        <h2>{listName}</h2>

        <table className='table'>
          <thead>
            <tr>
              <th></th>
              <th>Taske</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>

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
