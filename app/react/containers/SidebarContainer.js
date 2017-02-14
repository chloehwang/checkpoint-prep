import { connect } from 'react-redux'
import Sidebar from '../components/Sidebar'

export default connect(
  state => {
    return {
      lists: state.lists.lists,
      selectedList: state.selectedList
    }
  }
)(Sidebar)
