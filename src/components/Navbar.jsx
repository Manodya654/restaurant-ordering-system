import { Link, useNavigate } from "react-router-dom"; 
import { Home, Menu, History, LogIn, LogOut } from "lucide-react"; 
import { useContext } from "react"; 
import { AuthContext } from "../context/AuthContext"; 

export default function Navbar() {
    
    const { isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    
    const handleLogout = () => {
        logout();
        navigate('/login'); 
    };

    return (
        <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-orange-500">Flavor Town</h1>

            <div className="flex gap-8 text-sm text-gray-600">
                <Link to="/" className="flex items-center gap-1 hover:text-orange-500">
                    <Home size={18} /> Home
                </Link>
              {isLoggedIn && (
                <>
                <Link to="/menu" className="flex items-center gap-1 hover:text-orange-500">
                    <Menu size={18} /> Menu
                </Link>

                <Link to="/history" className="flex items-center gap-1 hover:text-orange-500">
                    <History size={18} /> History
                </Link>
                
              </> 
              )} 
                {isLoggedIn ? (
                    
                    <button
                        onClick={handleLogout} 
                        className="flex items-center gap-1 font-medium text-gray-600 hover:text-orange-500 transition"
                    >
                        <LogOut size={18} /> Log Out
                    </button>
                ) : (
                    
                    <Link to="/login" className="flex items-center gap-1 font-medium hover:text-orange-500">
                        <LogIn size={18} /> Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
}