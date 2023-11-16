// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // Aquí va la lógica de autenticación
    const [currentUser, setCurrentUser] = useState(/* ... */);

    const value = {
        currentUser,
        // ... otras funciones y estados relevantes
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuth };
