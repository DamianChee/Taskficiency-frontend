import React from "react";
import { NavLink } from "react-router-dom";

const EmployeeNav = ({ logout }) => {
  return (
    <div className="d-flex flex-column p-3 bg-light">
      <ul className="nav nav-pills flex-row">
        <li className="nav-item">
          <NavLink to="/home" className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/profile" className="nav-link">
            Profile
          </NavLink>
        </li>
        <li className="nav-item ms-auto">
          {/* Using ms-auto to push the logout button to the right */}
          <button className="btn btn-outline-danger" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default EmployeeNav;
