import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../../shared/utility";
const limit = 2;
const initialState = {
  doctors: [],
  loading: false,
  errors: null,
  length: 0,
  limit: limit,
};

const getDoctorsStart = (state, action) => {
  return updateObject(state, { errors: null, loading: true });
};

const getDoctorsSuccess = (state, action) => {
  return updateObject(state, {
    errors: null,
    loading: false,
    doctors: action.data,
    length: action.length,
    pageCount:
      action.length % limit === 0
        ? action.length / limit
        : Math.floor(action.length / limit) + 1,
  });
};

const getDoctorsFail = (state, action) => {
  return updateObject(state, {
    errors: action.errors,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DOCTORS_START:
      return getDoctorsStart(state, action);
    case actionTypes.GET_DOCTORS_SUCCESS:
      return getDoctorsSuccess(state, action);
    case actionTypes.GET_DOCTORS_FAIL:
      return getDoctorsFail(state, action);
    default:
      return state;
  }
};

export default reducer;
