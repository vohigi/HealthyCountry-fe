import axios from "axios";

import * as actionTypes from "../actionTypes";
import { getBearer } from "../../../shared/utility";
import { logout } from "../login/login";

export const getDoctorsStart = () => {
  return {
    type: actionTypes.GET_DOCTORS_START,
  };
};
export const getDoctorsSuccess = (data, length) => {
  return {
    type: actionTypes.GET_DOCTORS_SUCCESS,
    data: data,
    length: length,
  };
};

export const getDoctorsFail = (errors) => {
  return {
    type: actionTypes.GET_DOCTORS_FAIL,
    errors: errors,
  };
};

export const getDoctors = (params) => {
  return (dispatch) => {
    dispatch(getDoctorsStart());
    const url = "/api/users/doctors";
    const token = getBearer();
    axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + token ?? "",
        },
        params: params,
      })
      .then((response) =>
        dispatch(
          getDoctorsSuccess(response.data.data, response.data.paging.length)
        )
      )
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch(logout());
        }
        dispatch(
          getDoctorsFail(
            err.response.data ? err.response.data.errors : err.response
          )
        );
      });
  };
};
