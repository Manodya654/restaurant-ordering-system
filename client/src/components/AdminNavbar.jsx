import React, { useContext } from 'react'; 
import { useLocation, Link, useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../context/AuthContext';
import { BiRestaurant } from 'react-icons/bi';
import { 
    FaUserCircle,
    FaHome,
    FaClipboardList,
    FaUsers,
    FaCog,
    FaSignOutAlt, 
    FaRadiation,
    FaTable,
    FaMeteor,
    FaDashcube
} from 'react-icons/fa';
import { FaBowlFood, FaStar } from 'react-icons/fa6';

const navItems = [
    { name: 'Dashboard', icon: <FaDashcube className="mr-2" />, href: '/admin/dashboard' },
    { name: 'Orders', icon: <FaClipboardList className="mr-2" />, href: '/admin/orders' },
    { name: 'Categories', icon: <FaBowlFood className="mr-2" />, href: '/admin/categories' }, 
    { name: 'Menu', icon: <BiRestaurant className="mr-2" />, href: '/admin/menu' }, 
    { name: 'Reviews', icon: <FaStar className="mr-2" />, href: '/admin/reviews' },
    { name: 'Reservations', icon: <FaTable className="mr-2" />, href: '/admin/reservations' },
    { name: 'Customers', icon: <FaUsers className="mr-2" />, href: '/admin/customers' },
    { name: 'Settings', icon: <FaCog className="mr-2" />, href: '/admin/settings' },
];

const AdminNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Access user data and logout function from AuthContext
    const { user, logout } = useContext(AuthContext); 

    const handleLogout = () => {
        logout(); 
        navigate('/admin/login');
    };

    return (
        <header className="flex justify-between items-center h-20 bg-white p-6 border-b border-gray-100 sticky top-0 z-50">
            
            <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-orange-600">Flavor Town</h2> 
                <span className="text-xl font-bold text-gray-800 ml-4 border-l pl-4 border-gray-200 hidden sm:inline">Admin Panel</span>
            </div>

            <nav className="flex space-x-6">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.href;

                    return (
                        <Link
                            key={item.name}
                            to={item.href} 
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
                    onClick={handleLogout}
                    className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition shadow-md text-sm"
                >
                    <FaSignOutAlt className="mr-2" />
                    Log Out
                </button>

                <div className="flex flex-col items-end mr-2">
                    <span className="text-sm font-bold text-gray-800">
                        {user?.name || 'Admin User'} 
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-green-600 font-bold">
                        {user?.role || 'Administrator'}
                    </span>
                </div>

                <div className="w-10 h-10 rounded-full border-2 border-orange-200 overflow-hidden bg-gray-100">
                    <img 
                        src={user?.profileImage || "https://ui-avatars.com/api/?name=Admin&background=f97316&color=fff"} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
                    />
                </div>
            </div>
        </header>
    );
};

export default AdminNavbar;