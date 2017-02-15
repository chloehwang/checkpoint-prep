import { connect } from 'react-redux'
import List from '../components/List'

import { deleteList } from '../../action-creators/list-actions.js'


//ListContainer is just this very empty component that renders the List dumb component
export default connect(
  (state, ownProps) => {
    return {
      listId: ownProps.params.id,
      listName: state.lists.selectedList.name
    }
  },
  (dispatch) => {
    return {
      handleListDelete: (listId) => {
        dispatch(deleteList(listId))
      }
    }
  }
)(List)
