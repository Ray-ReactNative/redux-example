import {
  ADD_TASK,
  TOGGLE_TASK,
  DELETE_TASK,
  EDIT_TASK,
  FETCH_TASKS,
} from '../actionType';

const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_TASKS:
      return action.payload;
    case ADD_TASK:
      return [...state, action.payload];
    case TOGGLE_TASK:
      return state.map(task =>
        task.id === action.payload
          ? {...task, completed: !task.completed}
          : task,
      );
    case DELETE_TASK:
      return state.filter(task => task.id !== action.payload);
    case EDIT_TASK:
      return state.map(task =>
        task.id === action.payload.id
          ? {...task, text: action.payload.text}
          : task,
      );
    default:
      return state;
  }
};

export default tasksReducer;
