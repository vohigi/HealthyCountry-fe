import axios from "axios";

import * as actionTypes from "../actionTypes";
import { getBearer } from "../../../shared/utility";

export const getUsersStart = () => {
  return {
    type: actionTypes.GET_USERS_START,
  };
};
export const getUsersSuccess = (data) => {
  return {
    type: actionTypes.GET_USERS_SUCCESS,
    data: data,
  };
};

export const getUsersFail = (errors) => {
  return {
    type: actionTypes.GET_USERS_FAIL,
    errors: errors,
  };
};

export const getUsers = () => {
  return (dispatch) => {
    dispatch(getUsersStart());
    const url = "/api/users/all";
    const token = getBearer();
    axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + token ?? "",
        },
        params: {
          page: 1,
          limit: 30,
        },
      })
      .then((response) => dispatch(getUsersSuccess(response.data.data)))
      .catch((err) => {
        console.log(err);
        dispatch(getUsersFail(err.response.data.errors));
      });
  };
};
