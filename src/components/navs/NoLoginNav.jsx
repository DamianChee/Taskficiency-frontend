import React from "react";
import { NavLink } from "react-router-dom";

const NoLoginNav = () => {
  return (
    <div className="d-flex flex-column p-3 bg-light">
      <ul className="nav nav-pills flex-row">
        <li className="nav-item">
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NoLoginNav;
