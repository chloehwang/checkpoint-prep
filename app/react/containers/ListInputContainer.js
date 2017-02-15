import { connect } from 'react-redux'
import List from '../components/ListInput'
import { createList } from '../../action-creators/list-actions.js'

//containers are responsible for passing state data, any business logic
export default connect(null,
  dispatch => {
    return {
      handleListSubmit: (e) => {
        e.preventDefault();
        const name = e.target.listName.value;
        dispatch(createList(name));
      }
    }
  }
)(List)
