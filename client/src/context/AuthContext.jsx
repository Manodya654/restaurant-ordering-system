import { createContext, useState, useEffect } from 'react';
import * as authService from '../services/authService'; 

export const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isLoading, setIsLoading] = useState(false);
    
    const login = async (userData) => {
        setIsLoading(true);
        try {
            const data = await authService.login(userData); 
            setUser(data);
            return data;
        } finally {
            setIsLoading(false);
        }
    };
    
    const register = async (userData) => {
        setIsLoading(true);
        try {
            
            const data = await authService.register(userData);
            setUser(data);
            return data;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        authService.logout(); 
        setUser(null);
    };

    const contextValue = {
        user, 
        isLoading, 
        
        login,
        logout,
        register,
        setUser, 
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};