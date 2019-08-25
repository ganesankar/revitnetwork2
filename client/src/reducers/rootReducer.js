import { combineReducers } from "redux";
import studentReducer from "./studentReducer";
import staffReducer from "./staffReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer.js";

export default combineReducers({
  students: studentReducer,
  staffs: staffReducer,
  errors: errorReducer,
  auth: authReducer,
  profile: profileReducer
});
