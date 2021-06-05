import React, { useState, useEffect } from "react";
import { getAllTasks } from "../../actions/taskActions";
import TaskForm from "./TaskForm";
import "./TaskList.css";
import { connect } from "react-redux";
import TaskItem from "./TaskItem";
import Alert from "../layout/Alert";
const TaskList = ({ getAllTasks, task: { tasks } }) => {
  useEffect(() => {
    getAllTasks();
  }, []);
  return (
    <div className="task-list">
      <h1 className="text-center my-3 form-title text-light">My Task List</h1>

      <div className="container">
        <Alert />
        <button
          className="btn btn-primary btn-lg "
          data-bs-toggle="modal"
          data-bs-target="#openform"
        >
          <i className="fas fa-plus"></i> Add new Task
        </button>
        <div className="list-group mb-5 mt-3 list-group-numbered">
          {tasks.length > 0 &&
            tasks.map((task) => <TaskItem task={task} key={task._id} />)}
        </div>
        <div className="row float-end"></div>
      </div>
      <TaskForm />
    </div>
  );
};

const mapStateToProps = (state) => ({
  task: state.task,
});

export default connect(mapStateToProps, { getAllTasks })(TaskList);
