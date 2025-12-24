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
        // Change authService.login to authService.loginRequest
        const data = await authService.login(userData.email, userData.password); 
        
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);

        setUser(data.user);
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
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    
    // Redirect based on current URL
    if (window.location.pathname.includes('admin')) {
        window.location.href = '/admin/login';
    } else {
        window.location.href = '/login';
    }
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