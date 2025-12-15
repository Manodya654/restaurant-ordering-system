// client/src/components/AdminNavbar.jsx
import React from 'react';
import { BiRestaurant } from 'react-icons/bi';
import { 
    FaUserCircle,
    FaHome, // Icon for Dashboard
    FaClipboardList, // Icon for Orders
    FaBoxes, // Icon for Menu/Items
    FaUsers, // Icon for Customers
    FaCog, // Icon for Settings
    FaSignOutAlt // Icon for Logout (optional, but good)
} from 'react-icons/fa';
import { FaBowlFood } from 'react-icons/fa6';

// Map icons to navigation items
const navItems = [
    { name: 'Dashboard', icon: <FaHome className="mr-2" />, href: '/admin/dashboard', active: false },
    { name: 'Orders', icon: <FaClipboardList className="mr-2" />, href: '/admin/orders', active: false },
    { name: 'Categories', icon: <FaBowlFood className="mr-2" />, href: '/admin/categories', active: false }, 
    { name: 'Menu', icon: <BiRestaurant className="mr-2" />, href: '/admin/menu', active: true }, 
    { name: 'Customers', icon: <FaUsers className="mr-2" />, href: '/admin/customers', active: false },
    { name: 'Settings', icon: <FaCog className="mr-2" />, href: '/admin/settings', active: false },
];

const AdminNavbar = () => {
    return (
        // Navbar container: Fixed height, white background, shadow, padding
        <header className="flex justify-between items-center h-20 bg-white p-6 border-b border-gray-100">
            
            {/* Left Section: Logo/Title */}
            <div className="flex items-center space-x-2">
                {/* 1. Flavor Town is now small: text-sm, min-w-48 replaced by simple text
                  2. Removed fixed width classes for responsiveness
                */}
                <h2 className="text-xl font-bold text-orange-600">Flavor Town </h2> 
                <span className="text-xl font-bold text-gray-800 ml-4 border-l pl-4 border-gray-200 hidden sm:inline"> Admin Panel</span>
            </div>

            {/* Center Section: Navigation Links */}
            <nav className="flex space-x-6">
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className={`flex items-center text-base font-medium transition duration-150 
                            ${item.active 
                                ? 'text-orange-600 border-b-2 border-orange-600 pb-1 font-semibold' // Active state style
                                : 'text-gray-700 hover:text-orange-600'
                            }`}
                    >
                        {/* Render the icon */}
                        {item.icon}
                        {item.name}
                    </a>
                ))}
            </nav>

            {/* Right Section: Logout Button and User Icon */}
            <div className="flex items-center space-x-4">
                <button 
                    onClick={() => alert('Logging out...')}
                    className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition shadow-md text-sm"
                >
                    <FaSignOutAlt className="mr-2" />
                    Log Out
                </button>
                <FaUserCircle className="w-8 h-8 text-gray-500" />
            </div>
        </header>
    );
};

export default AdminNavbar;