import { combineReducers } from "redux";
import loginReducer from "../reducers/login/loginReducer";
import registerReducer from "../reducers/register/registerReducer";
import managementReducer from "../reducers/management/managementReducer";

const rootReducer = combineReducers({
  auth: loginReducer,
  register: registerReducer,
  management: managementReducer,
});

export default rootReducer;
