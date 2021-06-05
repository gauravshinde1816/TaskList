import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from "./types";

import axios from "axios";
import { setUserToken } from "../utils/setUserToken";
import { setAlert } from "./alert";
//load user
export const loadUser = () => async (dispatch) => {
  // get the token from local storage
  if (localStorage.token) {
    setUserToken(localStorage.token);
  }

  try {
    const res = await axios.get(`/api/auth`);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    console.log("user loaded");
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//register user
export const register = (name, email, password, history) => async (
  dispatch
) => {
  console.log(name, email, password);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password });
    const res = await axios.post("/api/user", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    await dispatch(loadUser());
    dispatch(setAlert(`Welcome ${name}, create your todo list`, "success"));
    history.push("/task");
  } catch (error) {
    console.log(error.message);
    const err = error.response.data.errors; //array
    console.log(err);
    if (err) {
      err.map((item) => dispatch(setAlert(item.msg, "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//login user
export const login = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });
    const res = await axios.post(`/api/auth`, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch(setAlert("Welcome back, check your todo list", "success"));
  } catch (error) {
    const err = error.response.data.errors;
    console.log(error.response.data.errors);
    console.log(err);
    if (err) {
      err.map((item) => dispatch(setAlert(item.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//logout

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
