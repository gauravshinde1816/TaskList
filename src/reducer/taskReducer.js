import {
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  GET_ALLTASKS,
  TASK_ERROR,
  GET_TASK,
} from "../actions/types";

const initialState = {
  tasks: [],
  task: null,
};
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALLTASKS:
      return {
        ...state,
        tasks: payload,
      };
    case CREATE_TASK:
      return {
        ...state,
        tasks: [payload, ...state.tasks],
      };

    case UPDATE_TASK:
      return {
        ...state,
        task: payload,
      };
    case GET_TASK:
      return {
        ...state,
        task: payload,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== payload),
      };
    default:
      return state;
  }
};
