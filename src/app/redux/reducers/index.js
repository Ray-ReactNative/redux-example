import {combineReducers} from '@reduxjs/toolkit';
import tasksReducer from './tasksReducer';

export default combineReducers({
  tasks: tasksReducer,
});
