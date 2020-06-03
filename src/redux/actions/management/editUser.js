import axios from "axios";

import * as actionTypes from "../actionTypes";
import { getBearer } from "../../../shared/utility";
import { getUsers } from "./getUsers";

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

export const deactivateUserStart = () => {
  return {
    type: actionTypes.EDIT_USER_START,
  };
};
export const deactivateUserSuccess = (id, status) => {
  return {
    type: actionTypes.EDIT_USER_SUCCESS,
    id: id,
    status: status,
  };
};

export const deactivateUserFail = (errors) => {
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

export const deactivateUser = (id, status) => {
  return (dispatch) => {
    dispatch(deactivateUserStart());
    const url = `/api/users/${id}/status`;
    const token = getBearer();
    axios
      .put(
        url,
        {},
        {
          headers: {
            Authorization: "Bearer " + (token ?? ""),
          },
          params: {
            status: status,
          },
        }
      )
      .then((response) => {
        dispatch(
          deactivateUserSuccess(response.data.userId, response.data.isActive)
        );
        dispatch(getUsers());
      })
      .catch((err) => {
        console.log(err);
        dispatch(deactivateUserFail(err.response.data.errors));
      });
  };
};
