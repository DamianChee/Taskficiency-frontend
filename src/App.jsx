import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import AdminHome from "./pages/AdminHomePage";
import AttendanceListPage from "./pages/AttendanceListPage";
import DevPage from "./pages/DevPage";
import ProfilePage from "./pages/ProfilePage";
import EmployerReportsPage from "./pages/EmployerReportsPage";
import EmployeeReportsPage from "./pages/EmployeeReportsPage";
import { myContext } from "./components/MyContext";

function App() {
  const { getAllCompanies, getAllRoles, getRoleNames, getAllAttendanceTypes } =
    myContext();

  useEffect(() => {
    getAllCompanies();
    getAllRoles();
    getRoleNames();
    getAllAttendanceTypes();
  }, []);

  return (
    <div>
      <h2>GA SEI</h2>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegistrationPage />} />
          <Route path="home" element={<LandingPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="attendance" element={<AttendanceListPage />} />
          <Route path="reportbuilder" element={<EmployerReportsPage />} />
          <Route path="reportuser" element={<EmployeeReportsPage />} />
          <Route path="devpage" element={<DevPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
