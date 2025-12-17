import { Link, NavLink } from 'react-router-dom'; 
import { FaHome, FaBookOpen, FaHistory, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useContext } from 'react'; // Added
import { AuthContext } from '../context/AuthContext'; // Added
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart();
  const { user } = useContext(AuthContext); // Get user data from context

  const activeLinkStyle = ({ isActive }) => 
    `cursor-pointer flex items-center gap-2 transition ${
      isActive ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-black'
    }`;
    
  return (
    <nav className="border-b fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
      <div className="flex justify-between items-center py-6 px-6 lg:px-18 mx-auto max-w-7xl">
        
        <Link to="/" className="logo text-xl font-bold text-orange-600 min-w-48">
          Flavor Town
        </Link> 

        <ul className="hidden md:flex gap-14 text-sm">
          <li>
            <NavLink to="/" className={activeLinkStyle} end>
              <FaHome className="w-4 h-4"/> 
              Home 
            </NavLink>
          </li>
          
          <li>
             <NavLink to="/menu" className={activeLinkStyle} end>
               <FaBookOpen className="w-4 h-4"/> 
               Menu
             </NavLink>
          </li>
          
          <li>
            <NavLink to="/history" className={activeLinkStyle}>
              <FaHistory className="w-4 h-4"/> 
              History
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-6 min-w-48 justify-end"> 
          
          <Link to="/checkout" className="relative p-2 flex items-center group cursor-pointer">
            <FaCartShopping className="w-5 h-5 text-gray-700 hover:text-orange-600 transition" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Conditional Rendering: Profile vs Sign In */}
          {user ? (
            <Link to="/profile" className="flex items-center gap-3 group transition">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-xs font-semibold text-gray-800 group-hover:text-orange-600">
                  {user.name}
                </span>
                <span className="text-[10px] text-gray-400 capitalize">{user.role}</span>
              </div>
              
              <div className="w-9 h-9 rounded-full border-2 border-orange-500 overflow-hidden bg-orange-50 shrink-0">
                <img 
                  src={user.profileImage || `https://ui-avatars.com/api/?name=${user.name}&background=f97316&color=fff`} 
                  alt="User Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center gap-2 cursor-pointer text-sm font-medium bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition shadow-sm"
            >
              <FaUser className="w-3 h-3" />
              Sign In
            </Link>
          )}
          
        </div>
      </div>
    </nav>
  );
}