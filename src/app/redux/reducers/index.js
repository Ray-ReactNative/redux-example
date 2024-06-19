import {combineReducers} from '@reduxjs/toolkit';
import tasksReducer from './tasksReducer';
import priorityReducer from './priorityReducer';
import usersReducer from './usersReducer';

export default combineReducers({
  tasks: tasksReducer,
  priorities: priorityReducer,
  users: usersReducer,
});
