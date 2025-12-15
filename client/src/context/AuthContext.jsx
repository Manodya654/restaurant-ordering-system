// client/src/context/AuthContext.jsx

import { createContext, useState, useEffect } from 'react';
import * as authService from '../services/authService'; // Adjust path as needed

// 1. Create the Context
export const AuthContext = createContext();

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
    // Check local storage for a user upon initial load
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useState(storedUser || null);

    // Login function updates state and calls service
    const login = async (userData) => {
        const data = await authService.login(userData);
        setUser(data);
        return data;
    };

    // Register function updates state and calls service
    const register = async (userData) => {
        const data = await authService.register(userData);
        setUser(data);
        return data;
    };

    // Logout function clears state and local storage
    const logout = () => {
        authService.logout();
        setUser(null);
    };
    
    const contextValue = {
        user, // The current logged-in user object
        isLoading: false, // You can expand this for loading state
        login,
        logout,
        register,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};