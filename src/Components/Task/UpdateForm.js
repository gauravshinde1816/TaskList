import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getTaskByID, updateTask } from "../../actions/taskActions";
const UpdateForm = ({ updateTask, taskid, getTaskByID }) => {
  useEffect(() => {
    getTaskByID(taskid);
  }, []);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    updateTask(formData, taskid);

    setFormData({ title: "", description: "" });
  };
  const { title, description } = formData;
  return (
    <div className="modal fade" id="updateform">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Update Form
            </h5>

            <i className="fas fa-times btn-close" data-bs-dismiss="modal"></i>
          </div>
          <div className="modal-body">
            <form>
              <div class="mb-3">
                <label for="title" class="form-label">
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
                <label for="Description" className="form-label">
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

export default connect(null, { getTaskByID, updateTask })(UpdateForm);
