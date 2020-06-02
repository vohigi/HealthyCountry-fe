import { combineReducers } from "redux";
import loginReducer from "../reducers/login/loginReducer";
import registerReducer from "../reducers/register/registerReducer";

const rootReducer = combineReducers({
  auth: loginReducer,
  register: registerReducer,
});

export default rootReducer;
