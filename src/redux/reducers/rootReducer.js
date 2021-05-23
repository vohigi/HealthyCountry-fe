import { combineReducers } from "redux";
import loginReducer from "../reducers/login/loginReducer";
import registerReducer from "../reducers/register/registerReducer";
import managementReducer from "../reducers/management/managementReducer";
import doctorsReducer from "../reducers/doctors/doctorsReducer";

const rootReducer = combineReducers({
  auth: loginReducer,
  register: registerReducer,
  management: managementReducer,
  doctors: doctorsReducer,
});

export default rootReducer;
