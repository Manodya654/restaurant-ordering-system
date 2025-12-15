// client/src/pages/Admin/AdminLogin.jsx

import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import * as authService from '../../services/authService';
import { FaUserShield } from 'react-icons/fa';

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { user, setUser } = useContext(AuthContext); // Need setUser if we didn't add loginAdmin to AuthContext
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // If user is already logged in as admin, redirect to dashboard
    if (user && user.role === 'admin') {
        navigate('/admin/dashboard'); 
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        setLoading(true);
        try {
            // CALL THE ADMIN SPECIFIC SERVICE FUNCTION
            const data = await authService.loginAdmin(formData); 
            
            // Update AuthContext state (assuming AuthContext handles login)
            // If you updated AuthContext with loginAdmin, use context.loginAdmin(formData);
            // Otherwise, manually update the user state:
            localStorage.setItem('user', JSON.stringify(data));
            // This is crucial: update the context's state manually after successful loginAdmin
            // If your AuthContext exposes a way to update the user object, use it.
            // For now, let's rely on the AuthContext logic running on load, or expand AuthContext.

            // Since we didn't update AuthContext yet, we rely on the context refreshing, 
            // or we add the logic here:
            // setUser(data); // Assuming AuthContext exposes a setter, otherwise we update AuthContext later

            navigate('/admin/dashboard'); 
        } catch (err) {
            setError(err.message || 'Login failed. Check admin credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-orange-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl border-t-4 border-orange-600">
                <h2 className="text-3xl font-bold text-center text-gray-900 flex items-center justify-center">
                    <FaUserShield className="mr-2 text-orange-600" /> Admin Access
                </h2>
                <p className="text-center text-gray-500">Sign in with your administrator credentials.</p>
                
                {error && (
                    <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-3 text-lg font-semibold text-white bg-orange-600 rounded-md hover:bg-orange-700 transition duration-150 disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Admin Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;