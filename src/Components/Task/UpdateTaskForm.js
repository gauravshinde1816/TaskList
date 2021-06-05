import React, { useState, useEffect } from "react";
import "./TaskList.css";
import { connect } from "react-redux";
import { getTaskByID, updateTask } from "../../actions/taskActions";
import { Link } from "react-router-dom";
import Alert from "../layout/Alert";
const UpdateTaskForm = ({ updateTask, getTaskByID, task }) => {
  //set form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  //load when id gets updated
  useEffect(() => {
    const id = window.location.pathname.split("/")[2];
    //get task
    getTaskByID(id);

    //set form data
    setFormData({
      title: task === null ? "" : task.title,
      description: task === null ? " " : task.description,
    });
    // console.log(formData);
  }, []);
  const { title, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    updateTask(formData, task._id);
  };
  if (task === null) {
    return "Loading";
  }

  return (
    <div className="task-list" style={{ height: "100vh" }}>
      <div className="container justify-content-center text-light">
        <Link to="/task">
          <button className="btn btn-lg p-2">
            <i className="fas fa-arrow-left"></i> {"  "}Go Back
          </button>
        </Link>

        <Alert />
        <h1 className="form-title">Update form</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={title}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              className="form-control"
              name="description"
              value={description}
              onChange={(e) => onChange(e)}
            >
              {description}
            </textarea>
          </div>

          <button
            onClick={onSubmit}
            type="submit"
            className="btn btn-primary btn-block"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  task: state.task.task,
});

export default connect(mapStateToProps, { getTaskByID, updateTask })(
  UpdateTaskForm
);
