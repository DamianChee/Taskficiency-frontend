import React from "react";
import { myContext } from "./MyContext";
import AdminNav from "./navs/AdminNav";
import BossNav from "./navs/BossNav";
import ManagerNav from "./navs/ManagerNav";
import EmployeeNav from "./navs/EmployeeNav";
import NoLoginNav from "./navs/NoLoginNav";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { isLoggedIn, permissionLevel, logout } = myContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {isLoggedIn && permissionLevel === 1 && (
        <AdminNav logout={handleLogout} />
      )}
      {isLoggedIn && permissionLevel === 2 && <BossNav logout={handleLogout} />}
      {isLoggedIn && permissionLevel === 3 && (
        <ManagerNav logout={handleLogout} />
      )}
      {isLoggedIn && permissionLevel === 4 && (
        <ManagerNav logout={handleLogout} />
      )}
      {isLoggedIn && permissionLevel === 5 && (
        <EmployeeNav logout={handleLogout} />
      )}
      {isLoggedIn && permissionLevel === 6 && (
        <EmployeeNav logout={handleLogout} />
      )}
      {isLoggedIn && permissionLevel === null && (
        <EmployeeNav logout={handleLogout} />
      )}
      {!isLoggedIn && <NoLoginNav />}
    </>
  );
};

export default Sidebar;
