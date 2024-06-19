import {
  ADD_TASK,
  TOGGLE_TASK,
  DELETE_TASK,
  EDIT_TASK,
  FETCH_TASKS,
  ASSIGN_TASKS,
  // SET_PRIORITY,
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
          ? {
              ...task,
              text: action.payload.text,
              priority: action.payload.priority,
            }
          : task,
      );
    // case SET_PRIORITY:
    //   // console.log('action.payload.priority+++', action.payload);
    //   return {
    //     ...state,
    //     [action.payload.id]: action.payload.priority,
    //   };
    case ASSIGN_TASKS:
      return state.map(task =>
        task.id === action.payload.taskId
          ? {...task, userId: action.payload.userId}
          : task,
      );
    default:
      return state;
  }
};

export default tasksReducer;
