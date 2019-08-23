import { combineReducers } from "redux";
import studentReducer from "./studentReducer";
import cityReducer from "./cityReducer";
import itinReducer from "./itinReducer";
import activityReducer from "./activityReducer";
import commentReducer from "./commentReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer.js";

export default combineReducers({
  students: studentReducer,
  cities: cityReducer,
  itineraries: itinReducer,
  activities: activityReducer,
  comments: commentReducer,
  errors: errorReducer,
  auth: authReducer,
  profile: profileReducer
});
