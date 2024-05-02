import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="d-flex flex-column p-3 bg-light">
        <ul className="nav nav-pills flex-row">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" aria-current="page">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/register" className="nav-link">
              Register
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/profile" className="nav-link">
              Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/employer" className="nav-link">
              Employer
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/adminhome" className="nav-link">
              Admin
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/devpage" className="nav-link">
              Developer Page
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
