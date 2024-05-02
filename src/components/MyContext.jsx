import React, { createContext, useContext, useState } from "react";
import useFetch from "../hooks/useFetch";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [access, setAccess] = useState("");
  const [refresh, setRefresh] = useState("");
  const [userInfo, setUserInfo] = useState({});

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

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    access,
    setAccess,
    refresh,
    setRefresh,
    userInfo,
    setUserInfo,
    login,
    logout,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const myContext = () => {
  return useContext(MyContext);
};
