import React from 'react';
import { useLocation, Link } from 'react-router-dom'; // Import these for routing
import { BiRestaurant } from 'react-icons/bi';
import { 
    FaUserCircle,
    FaHome,
    FaClipboardList,
    FaUsers,
    FaCog,
    FaSignOutAlt 
} from 'react-icons/fa';
import { FaBowlFood } from 'react-icons/fa6';

const navItems = [
    { name: 'Dashboard', icon: <FaHome className="mr-2" />, href: '/admin/dashboard' },
    { name: 'Orders', icon: <FaClipboardList className="mr-2" />, href: '/admin/orders' },
    { name: 'Categories', icon: <FaBowlFood className="mr-2" />, href: '/admin/categories' }, 
    { name: 'Menu', icon: <BiRestaurant className="mr-2" />, href: '/admin/menu' }, 
    { name: 'Customers', icon: <FaUsers className="mr-2" />, href: '/admin/customers' },
    { name: 'Settings', icon: <FaCog className="mr-2" />, href: '/admin/settings' },
];

const AdminNavbar = () => {
    // 1. Get the current URL path
    const location = useLocation();

    return (
        <header className="flex justify-between items-center h-20 bg-white p-6 border-b border-gray-100 sticky top-0 z-50">
            
            <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-orange-600">Flavor Town </h2> 
                <span className="text-xl font-bold text-gray-800 ml-4 border-l pl-4 border-gray-200 hidden sm:inline"> Admin Panel</span>
            </div>

            <nav className="flex space-x-6">
                {navItems.map((item) => {
                    // 2. Check if the current path matches the item's link
                    const isActive = location.pathname === item.href;

                    return (
                        <Link
                            key={item.name}
                            to={item.href} // Use 'to' instead of 'href'
                            className={`flex items-center text-base font-medium transition duration-150 
                                ${isActive 
                                    ? 'text-orange-600 border-b-2 border-orange-600 pb-1 font-semibold' 
                                    : 'text-gray-700 hover:text-orange-600'
                                }`}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

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