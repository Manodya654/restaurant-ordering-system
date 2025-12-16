import { Link, NavLink } from 'react-router-dom'; 
import { FaHome, FaBookOpen, FaHistory, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

export default function Navbar() {
  const activeLinkStyle = ({ isActive }) => 
    `cursor-pointer flex items-center gap-2 transition ${
      isActive ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-black'
    }`;
    
  return (
    <nav className="border-b fixed top-0 left-0 w-full bg-white z-50">
      <div className="flex justify-between items-center py-6 px-6 lg:px-18 mx-auto max-w-7xl">
        
        <Link to="/" className="logo text-xl font-celtic min-w-48">Flavor Town</Link> 

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
          
          <Link to="/cart">
            <FaCartShopping className="w-5 h-5 cursor-pointer text-gray-700 hover:text-black transition" />
          </Link>
          
          <Link to="/login" className="flex items-center gap-1 cursor-pointer text-sm text-gray-700 hover:text-black transition">
            <FaUser className="w-4 h-4" />
            Sign In
          </Link>
          
        </div>

      </div>
    </nav>
  );
}