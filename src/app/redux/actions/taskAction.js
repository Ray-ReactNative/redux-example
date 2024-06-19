import {
  ADD_TASK,
  TOGGLE_TASK,
  DELETE_TASK,
  EDIT_TASK,
  SET_PRIORITY,
  FETCH_TASKS,
  ASSIGN_TASKS,
} from '../actionType';

export const addTask = (text, id, priority) => ({
  type: ADD_TASK,
  payload: {id, text, completed: false, priority},
});

export const toggleTask = id => ({
  type: TOGGLE_TASK,
  payload: id,
});

export const deleteTask = id => ({
  type: DELETE_TASK,
  payload: id,
});

export const editTask = (id, text, priority) => ({
  type: EDIT_TASK,
  payload: {id, text, priority},
});

export const setPriority = (taskId, priority) => ({
  type: SET_PRIORITY,
  payload: {taskId, priority},
});

export const fetchTasks = () => {
  return async dispatch => {
    try {
      const response = await fetch('http://192.168.96.42:3001/tasks');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      dispatch({type: FETCH_TASKS, payload: data.tasks});
    } catch (error) {
      console.error(error);
    }
  };
};

export const addTaskToApi = task => {
  return async dispatch => {
    try {
      //mock api from mockoon
      const response = await fetch('http://192.168.96.42:3001/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      const newTask = await response.json();
      dispatch(addTask(newTask));
    } catch (error) {
      console.error(error);
    }
  };
};

export const assignTask = (taskId, userId) => ({
  type: ASSIGN_TASKS,
  payload: {taskId, userId},
});
