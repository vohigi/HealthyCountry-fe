import * as actionTypes from "../../actions/actionTypes";
import { updateObject } from "../../../shared/utility";

const initialState = {
  errors: null,
  loading: false,
};

const registerStart = (state, action) => {
  return updateObject(state, { errors: null, loading: true });
};

const registerSuccess = (state, action) => {
  return updateObject(state, {
    errors: null,
    loading: false,
  });
};

const registerFail = (state, action) => {
  return updateObject(state, {
    errors: action.errors,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_START:
      return registerStart(state, action);
    case actionTypes.REGISTER_SUCCESS:
      return registerSuccess(state, action);
    case actionTypes.REGISTER_FAIL:
      return registerFail(state, action);
    default:
      return state;
  }
};

export default reducer;
