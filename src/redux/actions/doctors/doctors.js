import axios from "axios";

import * as actionTypes from "../actionTypes";
import { getBearer } from "../../../shared/utility";

export const getDoctorsStart = () => {
  return {
    type: actionTypes.GET_USERS_START,
  };
};
export const getDoctorsSuccess = (data) => {
  return {
    type: actionTypes.GET_USERS_SUCCESS,
    data: data,
  };
};

export const getDoctorsFail = (errors) => {
  return {
    type: actionTypes.GET_USERS_FAIL,
    errors: errors,
  };
};

export const getDoctors = () => {
  return (dispatch) => {
    dispatch(getDoctorsStart());
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
      .then((response) => dispatch(getDoctorsSuccess(response.data.data)))
      .catch((err) => {
        console.log(err);
        dispatch(getDoctorsFail(err.response.data.errors));
      });
  };
};
