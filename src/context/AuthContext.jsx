import { createContext, useState } from 'react';


export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    
    const [token, setToken] = useState(localStorage.getItem('token')); 

    
    const login = (newToken) => {
        setToken(newToken); 
        localStorage.setItem('token', newToken); 
    };

    
    const logout = () => {
        setToken(null);
        localStorage.removeItem('token'); 
    };

    
    const isLoggedIn = !!token; 

    const contextValue = {
        token,
        isLoggedIn, 
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

