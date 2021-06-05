import React from "react";
import { connect } from "react-redux";
import { deleteTask, getTaskByID } from "../../actions/taskActions";
import { Link } from "react-router-dom";
const TaskItem = ({ task, deleteTask }) => {
  return (
    <div href="#" className="list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-3 text-dark">{task.title}</h5>
        {/* {task.user._id === auth.user._id && ( */}
        <div>
          <Link to={`/task/${task._id}`}>
            <i
              className="fas fa-edit text-primary pr-3"
              style={{ cursor: "pointer" }}
            ></i>
          </Link>

          <i
            className="fa fa-trash text-danger pl-2"
            aria-hidden="true"
            style={{ cursor: "pointer" }}
            onClick={() => deleteTask(task._id)}
          ></i>
        </div>
        {/* )} */}
      </div>
      <p className="mb-1">{task.description}</p>
      <div className="my-2">
        <small className="text-muted">
          {new Date().getDate() - new Date(task.date).getDate() === 0
            ? "Recently added"
            : `${
                new Date().getDate() - new Date(task.date).getDate()
              }   days ago`}{" "}
        </small>
      </div>

      {/* <small className="text-muted">And some muted small print.</small> */}
    </div>
  );
};

const mapStateProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateProps, { deleteTask })(TaskItem);
