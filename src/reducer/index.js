import { combineReducers } from "redux";
import task from "./taskReducer";
import auth from "./authReducer";
import alert from "./alert";
export default combineReducers({
  task,
  auth,
  alert,
});
