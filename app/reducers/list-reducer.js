import { ADD_LIST, RECEIVE_LIST, RECEIVE_LISTS, REMOVE_LIST } from '../constants'

const initialState = {
  lists: [],
  selectedList: {}
}


export default function (state = initialState, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case ADD_LIST:
      newState.lists = [...newState.lists, action.list];
      break;

    case REMOVE_LIST:
      newState.selectedList = {};
      newState.lists = newState.lists.filter(list => list.id !== +action.listId);
      break;

    case RECEIVE_LISTS:
      newState.lists = action.lists;
      break;

    case RECEIVE_LIST:
      newState.selectedList = action.selectedList;
      break;

    default: return state
  }

  return newState
}
