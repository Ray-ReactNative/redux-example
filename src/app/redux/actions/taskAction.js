import {
  ADD_TASK,
  TOGGLE_TASK,
  DELETE_TASK,
  EDIT_TASK,
  SET_PRIORITY,
  FETCH_TASKS,
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

export const fetchTasks = () => {
  return async dispatch => {
    try {
      const response = await fetch('http://localhost:3000/tasks');
      const tasks = await response.json();
      dispatch({type: FETCH_TASKS, payload: tasks});
    } catch (error) {
      console.error(error);
    }
  };
};

export const addTaskToApi = task => {
  return async dispatch => {
    try {
      const response = await fetch('http://localhost:3000/tasks', {
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
