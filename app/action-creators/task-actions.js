import { ADD_TASK, RECEIVE_TASKS } from '../constants'
import axios from 'axios'

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
      .then(task => {
        return dispatch(addTask(task))
      })
  }
}

export const getAllTasks = (listId) => {
  return function(dispatch) {
    axios.get(`/api/list/${listId}/tasks`)
      .then(res => res.data)
      .then(allTasks => {
        dispatch(receiveTasks(allTasks))
      })
  }
}

export const changeTaskStatus = (taskId, status) => {
  return function(dispatch, getState) {
    const newTasks = getState().tasks.tasks.map(task => {
      if (task.id === taskId) task.completed = status;
      return task
    })
    dispatch(receiveTasks(newTasks))
  }
}

export const taskToggle = (taskId, taskStatus) => {
  return function(dispatch) {
    if (taskStatus == "true") {
      axios.put(`/api/tasks/${taskId}`)
          .then(res => res.data)
          .then(completedTask => dispatch(changeTaskStatus(completedTask.id, false)))
    }
    else {
      axios.delete(`/api/tasks/${taskId}`)
          .then(res => res.data)
          .then(completedTask => dispatch(changeTaskStatus(completedTask.id, true)))
    }
  }
}
