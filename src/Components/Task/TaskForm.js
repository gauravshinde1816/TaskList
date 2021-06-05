import React, { useState } from "react";
import { connect } from "react-redux";
import { createTask } from "../../actions/taskActions";
const TaskForm = ({ createTask }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    createTask(formData);
    setFormData({ title: "", description: "" });
  };
  const { title, description } = formData;
  return (
    <div className="modal fade" id="openform">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title form-title" id="exampleModalLabel">
              Add new task
            </h5>

            <i className="fas fa-times btn-close" data-bs-dismiss="modal"></i>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="title" className="htmlForm-label">
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
                <label htmlFor="Description" className="form-label">
                  Description
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  name="description"
                  value={description}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-secondary btn-block"
                data-bs-dismiss="modal"
                onClick={onSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { createTask })(TaskForm);
