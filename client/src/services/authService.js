// client/src/services/authService.js

const API_URL = 'http://localhost:5000/api/users'; 

const config = {
    headers: {
        'Content-Type': 'application/json',
    },
};

// client/src/services/authService.js (Add this new function)

// ... existing imports and API_URL ...

// Login admin
export const loginAdmin = async (userData) => {
    // Note the '/admin/login' endpoint
    const response = await fetch(`${API_URL}/admin/login`, { 
        method: 'POST',
        // ...config (headers)
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Admin Login failed. Access Denied.');
    }

    const data = await response.json();

    // Store user in local storage (same key, but the stored user object now has role: 'admin')
    if (data.token) {
        localStorage.setItem('user', JSON.stringify(data));
    }
    
    return data;
};

// ... existing register, login, and logout functions ...

// Register user
export const register = async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        ...config,
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
    }
    
    const data = await response.json();
    
    // Store user in local storage
    if (data.token) {
        localStorage.setItem('user', JSON.stringify(data));
    }

    return data;
};

// Login user
export const login = async (userData) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        ...config,
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();

    // Store user in local storage
    if (data.token) {
        localStorage.setItem('user', JSON.stringify(data));
    }
    
    return data;
};

// Logout user
export const logout = () => {
    localStorage.removeItem('user');
};