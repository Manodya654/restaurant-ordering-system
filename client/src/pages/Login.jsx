// client/src/pages/Login.jsx (Polished UI)
import { Link, useNavigate } from "react-router-dom"; 
import { Lock, Mail } from "lucide-react"; 
import { useState, useContext } from "react"; 
// import { AuthContext } from "../context/AuthContext"; // Keeping this commented out as requested
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";
import { AuthProvider } from "../context/AuthContext";

export default function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    // 1. Client-side validation
    if (!email || !password) {
        setMessage("Please enter both email and password.");
        return;
    }
    
    setIsLoading(true);

    const loginData = {
      email,
      password,
    };

    try {
      
      // 2. API Call to the backend (Using port 3000 as defined in your code)
      const response = await fetch('http://localhost:3000/users/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData), 
      });

      const data = await response.json();
      
      // 3. Handle response
      if (response.ok) { 
        setMessage("✅ Login successful! Redirecting...");
        
        // login(data.token); // Re-enable when AuthContext is ready
        
        setTimeout(() => {
            navigate('/menu'); // Redirect to the main menu page
        }, 1500); 

      } else {
        
        setMessage(`❌ Login failed: ${data.message || 'Invalid email or password.'}`);
      }
    } catch (error) {
      console.error('Network Error:', error);
      setMessage("❌ Network error: Could not connect to the server (Is the backend running?).");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Outer container for Navbar and Footer setup
    <div className="min-h-screen flex flex-col">
        <Navbar />
        
        {/* Main Content Area: flex-grow and pt-28 to clear fixed Navbar */}
        <div className="flex-grow flex justify-center items-center pt-28 pb-20"> 
            
            {/* Login Form Card */}
            <div className="bg-white w-full max-w-sm rounded-xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-3xl">
                <h2 className="text-3xl font-extrabold text-center mb-1 text-gray-800">
                    Welcome Back
                </h2>
                <p className="text-sm text-center text-gray-500 mb-8">
                    Sign in to your account to continue
                </p>
                
                {/* Message Display */}
                {message && (
                    <div className={`p-3 mb-4 rounded-lg text-sm font-medium ${message.startsWith('❌') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {message}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}> 
                    
                    {/* Email Field - Styled to match design */}
                    <div className="relative">
                        <label className="text-sm font-medium text-gray-600 mb-1 block">Email Address</label>
                        <Mail
                            size={18}
                            className="absolute left-3 top-9 transform text-gray-400"
                        />
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                        />
                    </div>

                    {/* Password Field - Styled to match design */}
                    <div className="relative">
                        <label className="text-sm font-medium text-gray-600 mb-1 block">Password</label>
                        <Lock
                            size={18}
                            className="absolute left-3 top-9 transform text-gray-400"
                        />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full text-white py-3 rounded-lg text-lg font-semibold transition shadow-md hover:shadow-lg transform active:scale-95 duration-150
                            ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'}`}
                        disabled={isLoading} 
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                {/* Register Link */}
                <p className="text-sm text-center text-gray-500 mt-6">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-orange-600 font-bold hover:text-orange-700 transition">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
        <Footer />
    </div>
  );
}