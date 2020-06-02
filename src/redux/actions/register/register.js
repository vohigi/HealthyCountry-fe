import axios from "axios";

import * as actionTypes from "../actionTypes";

export const registerStart = () => {
  return {
    type: actionTypes.REGISTER_START,
  };
};
export const registerSuccess = () => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
  };
};

export const registerFail = (errors) => {
  return {
    type: actionTypes.REGISTER_FAIL,
    errors: errors,
  };
};

export const register = (data, history) => {
  return (dispatch) => {
    dispatch(registerStart());
    const url = "/api/users/register";
    axios
      .post(url, data)
      .then((response) => {
        dispatch(registerSuccess());
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
        dispatch(registerFail(err.response.data.errors));
      });
  };
};
