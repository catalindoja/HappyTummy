import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [error, setError] = useState(null); // Declarar el estado de error

  const login = async (inputs) => {
    console.log("HI THERE!");
    try {
      // ESTO ES 3000 SEGURO
      const res = await axios.post("/auth/login", inputs); // http://localhost:4000/api/  "http://localhost:5000/backend/src/routes/auth/login"
      setCurrentUser(res.data);
      setError(null); // Limpiar el error si la autenticación es exitosa
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      // Puedes establecer el error en el estado para mostrarlo en la interfaz de usuario
      setError(error.response.data.message || "Error desconocido al iniciar sesión");
    }
  };

  const logout = async (inputs) => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
