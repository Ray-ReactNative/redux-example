import {ADD_USER, EDIT_USER, DELETE_USER, FETCH_USERS} from '../actionType';

const initialState = [];

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload;
    case ADD_USER:
      return [...state, action.payload];
    case EDIT_USER:
      return state.map(user =>
        user.id === action.payload.id
          ? {
              ...user,
              name: action.payload.name,
            }
          : user,
      );
    case DELETE_USER:
      return state.filter(user => user.id !== action.payload);
    default:
      return state;
  }
};

export default usersReducer;
