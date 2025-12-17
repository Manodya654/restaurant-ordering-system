import { createContext, useState } from 'react';
import * as authService from '../services/authService'; 

export const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isLoading, setIsLoading] = useState(false);
    
    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const data = await authService.login(email, password); 
            if (data.user) {
                setUser(data.user);
            }
            return data;
        } finally {
            setIsLoading(false);
        }
    };
    
    // Example of what your authService register function should look like
const register = async (userData) => {
    const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Sends whatever object we give it
    });
    return response.json();
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
        // Helper to check if admin
        isAdmin: user?.role === 'admin'
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};