import React, { createContext, useContext, useState } from "react";
import useFetch from "../hooks/useFetch";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [access, setAccess] = useState("");
  const [refresh, setRefresh] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [companies, setCompanies] = useState([]);
  const [roles, setRoles] = useState([]);
  const [roleNames, setRoleNames] = useState([]);
  const [attendanceTypes, setAttendanceTypes] = useState([]);
  const [formats, setFormats] = useState([]);
  const [reports, setReports] = useState([]);
  const [permissionLevel, setPermissionLevel] = useState();

  const fetchData = useFetch();

  const login = (access, refresh) => {
    setIsLoggedIn(true);
    setAccess(access);
    setRefresh(refresh);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setAccess("");
    setRefresh("");
    setUserInfo({});
  };

  const getAllCompanies = async () => {
    try {
      const res = await fetchData("/companies/all", "GET");

      if (res.ok) {
        setCompanies(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllRoles = async () => {
    try {
      const res = await fetchData("/roles/all", "GET");

      if (res.ok) {
        setRoles(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getRoleNames = async () => {
    try {
      const res = await fetchData("/roles/all", "GET");

      if (res.ok) {
        const tempArr = res.data.data.map((role) => role["name"]);
        setRoleNames(tempArr);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllAttendanceTypes = async () => {
    try {
      const res = await fetchData("/attendancetypes/all", "GET");

      if (res.ok) {
        setAttendanceTypes(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllFormats = async (company_id) => {
    try {
      const res = await fetchData("/formats/all/company", "POST", {
        company_id: company_id,
      });

      if (res.ok) {
        setFormats(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllReports = async (company_id) => {
    try {
      const res = await fetchData("/reports/all/company", "POST", {
        company_id: company_id,
      });

      if (res.ok) {
        setReports(res.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    access,
    setAccess,
    refresh,
    setRefresh,
    userInfo,
    setUserInfo,
    companies,
    setCompanies,
    roles,
    setRoles,
    roleNames,
    setRoleNames,
    attendanceTypes,
    setAttendanceTypes,
    formats,
    setFormats,
    reports,
    setReports,
    permissionLevel,
    setPermissionLevel,
    login,
    logout,
    getAllCompanies,
    getAllRoles,
    getRoleNames,
    getAllAttendanceTypes,
    getAllFormats,
    getAllReports,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const myContext = () => {
  return useContext(MyContext);
};
