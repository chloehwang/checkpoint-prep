import React from 'react'

export default function List (props) {

  return (
    <div className="well">
      <form onSubmit={props.handleListSubmit}>
        <fieldset>
          <legend>New To-Do List</legend>

            <div className="form-group">
              <label className="col-xs-2 control-label">List Name</label>
              <div className="col-xs-10">
                <input className="form-control" type="text" name="listName" />
              </div>
            </div>

            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" className="btn btn-success">Create List</button>
              </div>
            </div>
          </fieldset>
      </form>
    </div>
  )

}
