import {combineReducers} from '@reduxjs/toolkit';
import tasksReducer from './tasksReducer';
import priorityReducer from './priorityReducer';

export default combineReducers({
  tasks: tasksReducer,
  priorities: priorityReducer,
});
