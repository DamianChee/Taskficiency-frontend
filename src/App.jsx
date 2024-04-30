import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import AdminHome from "./pages/AdminHome";
import EmployerHome from "./pages/EmployerHome";

function App() {
  return (
    <div>
      <h2>GA SEI</h2>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/employer" element={<EmployerHome />} />
          <Route path="/adminhome" element={<AdminHome />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
