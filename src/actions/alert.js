import { SET_ALERT, REMOVE_ALERT } from "./types";
import nextId from "react-id-generator";

export const setAlert = (msg, type) => (dispatch) => {
  const id = nextId();
  dispatch({
    type: SET_ALERT,
    payload: {
      msg,
      type,
      id,
    },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 5000);
};
