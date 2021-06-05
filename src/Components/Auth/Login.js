import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/authActions";
import { Redirect, Link } from "react-router-dom";
import "./Auth.css";
import Alert from "../layout/Alert";
const Login = ({ login, auth: { isAuthenticated } }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    login(email, password);
    setEmail("");
    setPassword("");
  };

  if (isAuthenticated === true) {
    return <Redirect to="/task" />;
  }
  return (
    <Fragment>
      <div className="row background">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 mt-5 ">
              <div className="card bg-light text-center card-form p-2 login-card">
                <div className="card-body">
                  <h3 className="title text-secondary">Welcome Back</h3>
                  <Alert />
                  <form onSubmit={onSubmit}>
                    <div className="input-group  mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-envelope"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="input-group  mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fas fa-lock"></i>
                        </span>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <button className="btn btn-primary btn-block">Login</button>
                  </form>
                  <div className="text-center my-2">
                    Don't have an Account? {"  "}
                    <Link to="/register">Sign up</Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <img src="" alt="" />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(Login);
