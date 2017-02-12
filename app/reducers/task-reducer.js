import { ADD_TASK, RECEIVE_TASKS } from '../constants'

const initialState = {
  tasks: []
}

export default function (state = initialState, action) {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case ADD_TASK:
      newState.tasks = [...newState.tasks, action.task];
      break;

    case RECEIVE_TASKS:
      newState.tasks = action.tasks;
      break;

    default: return state
  }

  return newState
}
