import { createContext, useState, useEffect } from 'react';
import * as authService from '../services/authService'; // <-- CRITICAL IMPORT

// 1. Create and Export the Context
export const AuthContext = createContext(); 

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
    // ----------------------------------------------------
    // FIX 1: Initialize State
    // Read the user from local storage when the app loads
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isLoading, setIsLoading] = useState(false);
    // ----------------------------------------------------

    // --- Authentication Functions (login/register/logout) ---
    
    // Function to handle general customer login
    const login = async (userData) => {
        setIsLoading(true);
        try {
            // Calls the standard login API endpoint
            const data = await authService.login(userData); 
            setUser(data);
            return data;
        } finally {
            setIsLoading(false);
        }
    };
    
    // Function to handle general customer registration
    const register = async (userData) => {
        setIsLoading(true);
        try {
            // Calls the registration API endpoint
            const data = await authService.register(userData);
            setUser(data);
            return data;
        } finally {
            setIsLoading(false);
        }
    };

    // Function to handle logout
    const logout = () => {
        authService.logout(); // Clears localStorage
        setUser(null);
    };

    // NOTE: You can add loginAdmin function here as well, but for now, we'll
    // rely on the dedicated AdminLogin.jsx page and its service call.

    // --- Context Value ---
    const contextValue = {
        // State variables
        user, 
        isLoading, // Use the state variable
        
        // Functions
        login,
        logout,
        register,
        // We need to expose the setter if other components need to update the user object
        setUser, 
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};