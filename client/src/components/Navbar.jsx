import { FaHome, FaBookOpen, FaHistory, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

// You should also define the padding element used just below the navbar 
// in your main layout to prevent content from hiding behind the fixed navbar.
// See the note below the code block for details.

export default function Navbar() {
  return (
    // 1. Made the nav fixed, full-width (w-full), and gave it a background (bg-white) 
    //    so the content doesn't show through.
    <nav className="border-b fixed top-0 left-0 w-full bg-white z-50">
      
      {/* 2. Increased horizontal padding (px-6 and lg:px-24) 
          and centered the content container (mx-auto max-w-7xl) for larger space. */}
      <div className="flex justify-between items-center py-6 px-5 lg:px-18 mx-auto max-w-7xl">
        
        {/* 1. Left Group: Logo */}
        <h1 className="logo text-xl font-celtic min-w-48">Flavor Town</h1> 

        {/* 2. Center Group: Navigation Links */}
        <ul className="hidden md:flex gap-14 text-sm">
          <li className="cursor-pointer flex items-center gap-2">
            <FaHome className="w-4 h-4"/> 
            Home
          </li>
          <li className="text-primary font-semibold cursor-pointer flex items-center gap-2">
            <FaBookOpen className="w-4 h-4"/> 
            Menu
          </li>
          <li className="cursor-pointer flex items-center gap-2">
            <FaHistory className="w-4 h-4"/> 
            History
          </li>
        </ul>

        {/* 3. Right Group: Cart and Sign In */}
        <div className="flex items-center gap-6 min-w-48 justify-end"> 
          
          {/* Cart Icon */}
          <FaCartShopping className="w-5 h-5 cursor-pointer text-gray-700 hover:text-black transition" />
          
          {/* Sign In Element */}
          <div className="flex items-center gap-1 cursor-pointer text-sm">
            <FaUser className="w-4 h-4" />
            Sign In
          </div>
          
        </div>

      </div>
    </nav>
  );
}