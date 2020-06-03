import axios from "axios";

import * as actionTypes from "../actionTypes";
import { getBearer } from "../../../shared/utility";

export const getUserStart = () => {
  return {
    type: actionTypes.GET_USER_START,
  };
};
export const getUserSuccess = (data) => {
  return {
    type: actionTypes.GET_USER_SUCCESS,
    data: data,
  };
};

export const getUserFail = (errors) => {
  return {
    type: actionTypes.GET_USER_FAIL,
    errors: errors,
  };
};

export const getUser = (id) => {
  return (dispatch) => {
    dispatch(getUserStart());
    const url = `/api/users/${id}`;
    const token = getBearer();
    axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + token ?? "",
        },
      })
      .then((response) => dispatch(getUserSuccess(response.data)))
      .catch((err) => {
        console.log(err);
        dispatch(getUserFail(err.response.data.errors));
      });
  };
};
