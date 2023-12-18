import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { BACKEND_API_URL } from '../config/proxy.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    const res = await axios.post(`${BACKEND_API_URL}/login`, inputs);
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    await axios.post(`${BACKEND_API_URL}/logout`);
    setCurrentUser(null);
    window.location.href = "/";
  };

  const updatePremium = async () => {
    try {
      const updatedUser = await axios.patch(`${BACKEND_API_URL}/users/${currentUser.id}`, {
        premium: 1,
      });
      setCurrentUser(updatedUser.data[0]);
      localStorage.setItem("user", JSON.stringify(updatedUser.data[0]));
    } catch (error) {
      console.error("Error updating premium:", error);
    }
  };

  const contextValue = {
    currentUser,
    login,
    logout,
    updatePremium,
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};