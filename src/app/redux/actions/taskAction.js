import {
  ADD_TASK,
  TOGGLE_TASK,
  DELETE_TASK,
  EDIT_TASK,
  SET_PRIORITY,
} from '../actionType';

export const addTask = (text, id) => ({
  type: ADD_TASK,
  payload: {id, text, completed: false},
});

export const toggleTask = id => ({
  type: TOGGLE_TASK,
  payload: id,
});

export const deleteTask = id => ({
  type: DELETE_TASK,
  payload: id,
});

export const editTask = (id, text) => ({
  type: EDIT_TASK,
  payload: {id, text},
});

export const setPriority = (taskId, priority) => ({
  type: SET_PRIORITY,
  payload: {taskId, priority},
});
