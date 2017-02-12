import { ADD_TASK, RECEIVE_TASKS } from '../constants'
import axios from 'axios';
import {browserHistory} from 'react-router';

export const addTask = (task) => {
  return {
    type: ADD_TASK,
    task
  }
}

export const receiveTasks = (tasks) => {
  return {
    type: RECEIVE_TASKS,
    tasks
  }
}


export const createTask = (task, listId) => {
  return function(dispatch) {
    axios.post(`/api/list/${listId}`, {task})
      .then(res => res.data)
      .then((task) => {
        return dispatch(addTask(task));
      })
      // .then((action) => {
      //   const path=`/list/${action.list.id}`;
      //   browserHistory.push(path);
      // })
  }
}

export const getAllTasks = (listId) => {
  return function(dispatch) {
    axios.get(`/api/list/${listId}/tasks`)
      .then(res => res.data)
      .then((allTasks) => {
        dispatch(receiveTasks(allTasks))
      })
  }
}

export const taskToggle = (taskId) => {
  return function(dispatch, getState) {
    axios.delete(`/api/tasks/${taskId}`)
      .then(res => res.data)
      .then(completedTask => {
        const newTasks = getState().tasks.tasks.map(task => {
          if (task.id === completedTask.id) {
            task.completed = true;
          }
          return task
        })
        return newTasks
      })
      .then(newTasks => dispatch(receiveTasks(newTasks)))
  }
}

// export const findList = (id) => {
//   return function(dispatch) {
//     axios.get(`/api/list/${id}`)
//       .then(res => res.data)
//       .then((list) => {
//         dispatch(receiveList(list))
//       })
//   }
// }
