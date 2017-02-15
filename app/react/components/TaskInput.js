import React from 'react'

export default function TaskInput (props) {
  return (
    <form className="form-inline" onSubmit={props.handleTaskSubmit}>
      <input
        className="form-control"
        name="taskName"
        id="inlineFormInput"
        value={props.value}
        onChange={props.handleInput}
      />
      <button type="submit" className="btn btn-success">Submit</button>
    </form>
  )
}
