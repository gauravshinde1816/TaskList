import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
const Navbar = ({ logout, auth: { isAuthenticated } }) => {
  const guestLinks = (
    <div>
      <Link to="/login">
        <button className="btn btn-success pl-3">Login</button>
      </Link>
    </div>
  );

  const authLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <a onClick={logout} style={{ cursor: "pointer" }} className="nav-link">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="text-light">logout</span>
        </a>
      </li>
    </ul>
  );
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand">
          <i className="fas fa-tasks"> MyTask</i>
        </Link>
        <div className="d-flex justify-content-between">
          {!isAuthenticated ? guestLinks : authLinks}
        </div>
      </div>
    </nav>
  );
};

const mapStateProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateProps, { logout })(Navbar);
