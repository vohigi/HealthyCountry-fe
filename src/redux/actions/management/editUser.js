import axios from "axios";

import * as actionTypes from "../actionTypes";
import { getBearer } from "../../../shared/utility";

export const editUserStart = () => {
  return {
    type: actionTypes.EDIT_USER_START,
  };
};
export const editUserSuccess = (data) => {
  return {
    type: actionTypes.EDIT_USER_SUCCESS,
    data: data,
  };
};

export const editUserFail = (errors) => {
  return {
    type: actionTypes.EDIT_USER_FAIL,
    errors: errors,
  };
};

export const editUser = (id, data, history) => {
  return (dispatch) => {
    dispatch(editUserStart());
    const url = `/api/users/${id}`;
    const token = getBearer();
    axios
      .put(url, data, {
        headers: {
          Authorization: "Bearer " + token ?? "",
        },
      })
      .then((response) => {
        dispatch(editUserSuccess(response.data.data));
        history.push(`/management/users`);
      })
      .catch((err) => {
        console.log(err);
        dispatch(editUserFail(err.response.data.errors));
      });
  };
};
