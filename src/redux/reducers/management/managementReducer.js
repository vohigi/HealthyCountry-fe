import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../../shared/utility";

const initialState = {
  errors: null,
  loading: false,
  users: null,
  user: null,
};

const getUsersStart = (state, action) => {
  return updateObject(state, { errors: null, loading: true });
};

const getUsersSuccess = (state, action) => {
  return updateObject(state, {
    errors: null,
    loading: false,
    users: action.data,
  });
};

const getUsersFail = (state, action) => {
  return updateObject(state, {
    errors: action.errors,
    loading: false,
  });
};

const getUserStart = (state, action) => {
  return updateObject(state, { errors: null, loading: true });
};

const getUserSuccess = (state, action) => {
  return updateObject(state, {
    errors: null,
    loading: false,
    user: action.data,
  });
};

const getUserFail = (state, action) => {
  return updateObject(state, {
    errors: action.errors,
    loading: false,
  });
};

const editUserStart = (state, action) => {
  return updateObject(state, { errors: null, loading: true });
};

const editUserSuccess = (state, action) => {
  return updateObject(state, {
    errors: null,
    loading: false,
    user: action.data,
  });
};

const editUserFail = (state, action) => {
  return updateObject(state, {
    errors: action.errors,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USERS_START:
      return getUsersStart(state, action);
    case actionTypes.GET_USERS_SUCCESS:
      return getUsersSuccess(state, action);
    case actionTypes.GET_USERS_FAIL:
      return getUsersFail(state, action);
    case actionTypes.GET_USER_START:
      return getUserStart(state, action);
    case actionTypes.GET_USER_SUCCESS:
      return getUserSuccess(state, action);
    case actionTypes.GET_USER_FAIL:
      return getUserFail(state, action);
    case actionTypes.EDIT_USER_START:
      return editUserStart(state, action);
    case actionTypes.EDIT_USER_SUCCESS:
      return editUserSuccess(state, action);
    case actionTypes.EDIT_USER_FAIL:
      return editUserFail(state, action);
    default:
      return state;
  }
};

export default reducer;
