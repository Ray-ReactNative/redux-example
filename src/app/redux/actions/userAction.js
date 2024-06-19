import {ADD_USER, EDIT_USER, DELETE_USER, FETCH_USERS} from '../actionType';

export const fetchUsers = () => {
  return async dispatch => {
    try {
      const response = await fetch('http://192.168.96.42:3001/users');
      const data = await response.json();
      dispatch({
        type: FETCH_USERS,
        payload: data.users,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addUser = name => ({
  type: ADD_USER,
  payload: {id: Date.now(), name},
});

export const editUser = (id, name) => ({
  type: EDIT_USER,
  payload: {id, name},
});

export const deleteUser = id => ({
  type: DELETE_USER,
  payload: id,
});
