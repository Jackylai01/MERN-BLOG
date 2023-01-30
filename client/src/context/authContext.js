import axios from "axios";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  //預設的State就直接去找localStorage裡面有沒有user(token)
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") || null)
  );

  //登入
  const login = async (inputs) => {
    const res = await axios.post(
      "http://localhost:6060/api/auth/login",
      inputs
    );
    setCurrentUser(res.data.accessToken);
  };

  //登出
  const logout = async () => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

  //如果有currentUser就存在localStorage裡面
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);
  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
