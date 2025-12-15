// client/src/components/Navbar.jsx
import { Link, NavLink } from 'react-router-dom'; // Import Link/NavLink
import { FaHome, FaBookOpen, FaHistory, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

export default function Navbar() {
  // Define active styling for NavLink (optional, but good practice)
  const activeLinkStyle = ({ isActive }) => 
    `cursor-pointer flex items-center gap-2 transition ${
      isActive ? 'text-orange-600 font-semibold' : 'text-gray-700 hover:text-black'
    }`;
    
  return (
    <nav className="border-b fixed top-0 left-0 w-full bg-white z-50">
      <div className="flex justify-between items-center py-6 px-6 lg:px-18 mx-auto max-w-7xl">
        
        <Link to="/" className="logo text-xl font-celtic min-w-48">Flavor Town</Link> 

        {/* 2. Center Group: Navigation Links */}
        <ul className="hidden md:flex gap-14 text-sm">
          
          {/* Home Link (Uses path "/") */}
          <li>
            <NavLink to="/" className={activeLinkStyle} end>
              <FaHome className="w-4 h-4"/> 
              Home 
            </NavLink>
          </li>
          
          {/* Menu Link (Assuming Menu is at path "/") */}
          {/* NOTE: Since Home and Menu are the same page, we keep the active styling for Menu. 
             If Menu were on its own page, you'd link it there. */}
          <li>
             {/* If you add a separate /menu route later, change 'to="/" to 'to="/menu"' */}
             <NavLink to="/menu" className={activeLinkStyle} end>
               <FaBookOpen className="w-4 h-4"/> 
               Menu
             </NavLink>
          </li>
          
          {/* History Link (Need to define this route in App.jsx later) */}
          <li>
            <NavLink to="/history" className={activeLinkStyle}>
              <FaHistory className="w-4 h-4"/> 
              History
            </NavLink>
          </li>
        </ul>

        {/* 3. Right Group: Cart and Sign In */}
        <div className="flex items-center gap-6 min-w-48 justify-end"> 
          
          {/* Cart Icon (Link to /cart - Need to define this route in App.jsx) */}
          <Link to="/cart">
            <FaCartShopping className="w-5 h-5 cursor-pointer text-gray-700 hover:text-black transition" />
          </Link>
          
          {/* Sign In Element (Link to /login - Need to define this route in App.jsx) */}
          <Link to="/login" className="flex items-center gap-1 cursor-pointer text-sm text-gray-700 hover:text-black transition">
            <FaUser className="w-4 h-4" />
            Sign In
          </Link>
          
        </div>

      </div>
    </nav>
  );
}