// client/src/components/Sidebar.jsx
import { FaBoxes, FaClipboardList, FaCog, FaHome, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

// Navigation links for the dashboard sidebar
const navItems = [
    { name: 'Dashboard', icon: <FaHome />, href: '/admin/dashboard', active: false },
    { name: 'Orders', icon: <FaClipboardList />, href: '/admin/orders', active: false },
    { name: 'Menu Items', icon: <FaBoxes />, href: '/admin', active: true }, // Current active page
    { name: 'Settings', icon: <FaCog />, href: '/admin/settings', active: false },
];

const Sidebar = () => {
    return (
        // Key changes: 
        // 1. `h-screen`: Ensures the sidebar takes the full height of the viewport.
        // 2. `flex flex-col`: Makes the contents stack vertically.
        <div className="flex flex-col h-screen w-64 bg-white shadow-xl flex-shrink-0">
            
            {/* Header: Logo/Title */}
            <div className="p-4 flex items-center h-20 border-b border-gray-100">
                <FaBoxes className="w-6 h-6 text-orange-600 mr-2" />
                <span className="text-xl font-bold text-gray-800">Admin Panel</span>
            </div>

            {/* Navigation Links */}
            {/* Key change: `flex-grow` forces this section to take up all available vertical space, 
               pushing the next element (the User/Logout block) to the bottom. */}
            <nav className="flex-grow p-4 space-y-2">
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className={`flex items-center p-3 rounded-lg transition duration-150 
                            ${item.active 
                                ? 'bg-orange-100 text-orange-600 font-semibold' 
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                            }`}
                    >
                        {item.icon}
                        <span className="ml-3">{item.name}</span>
                    </a>
                ))}
            </nav>

            {/* User Profile/Logout Section */}
            {/* This section will now be pinned to the bottom */}
            <div className="p-4 border-t border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                    <FaUserCircle className="w-8 h-8 text-gray-400" />
                    <div>
                        <p className="text-sm font-semibold">Jane Doe</p>
                        <p className="text-xs text-gray-500">Admin</p>
                    </div>
                </div>
                <button className="flex items-center w-full p-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-red-500 transition">
                    <FaSignOutAlt />
                    <span className="ml-3">Log Out</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;