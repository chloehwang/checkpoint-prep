import React from 'react'
import { Link } from 'react-router'

export default function Sidebar (props) {
  const lists = props.lists.map((list) => {
    return (
      <li key={list.id}>
        <Link to={`/list/${list.id}`} activeStyle={{ color: 'yellow' }}>{list.name}</Link>
      </li>
    )
  })

  return (
    <sidebar>
      <section>
        <h4 className="menu-item">
          <Link to='/list' activeStyle={{ color: 'yellow' }}>Make a To-Do List</Link>
        </h4>
      </section>
      <hr />
      <section>
        <h4 className="menu-item">
          My To-Do Lists
        </h4>
        <ul>
          {lists}
        </ul>
      </section>
    </sidebar>
  )

}
