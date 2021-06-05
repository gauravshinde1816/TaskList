import {
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  GET_ALLTASKS,
  GET_TASK,
  TASK_ERROR,
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";
//get all tasks
export const getAllTasks = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/task/all");
    dispatch({
      type: GET_ALLTASKS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: TASK_ERROR,
    });
  }
};

//create new task

export const createTask = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(data);
    const res = await axios.post(`/api/task`, body, config);

    dispatch({
      type: CREATE_TASK,
      payload: res.data,
    });
    dispatch(setAlert("new task created", "success"));
  } catch (error) {
    const err = error.response.data.errors;
    console.log(error.response.data.errors);
    console.log(err);
    if (err) {
      err.map((item) => dispatch(setAlert(item.msg, "danger")));
    }

    dispatch({
      type: TASK_ERROR,
    });
  }
};

// get task by id
export const getTaskByID = (id) => async (dispatch) => {
  try {
    console.log("Action get");
    const res = await axios.get(`/api/task/${id}`);
    dispatch({
      type: GET_TASK,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: TASK_ERROR,
    });
  }
};

//update task
export const updateTask = (data, taskid) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(data);
    console.log(data);
    const res = await axios.put(`/api/task/${taskid}`, body, config);

    dispatch({
      type: UPDATE_TASK,
      payload: res.data,
    });
    dispatch(setAlert("task updated", "success"));
  } catch (error) {
    dispatch({
      type: TASK_ERROR,
    });
  }
};

// delete task

//update task
export const deleteTask = (taskid) => async (dispatch) => {
  try {
    console.log("Task deleted");
    await axios.delete(`/api/task/${taskid}`);

    dispatch({
      type: DELETE_TASK,
      payload: taskid,
    });
    dispatch(setAlert("task deleted", "danger"));
  } catch (error) {
    dispatch({
      type: TASK_ERROR,
    });
  }
};
