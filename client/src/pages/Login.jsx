import { Link, useNavigate } from "react-router-dom"; 
import { Lock, Mail } from "lucide-react"; 
import { useState, useContext } from "react"; 
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext"; // Import the context

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Get login from context
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!email || !password) {
        setMessage("❌ Please enter both email and password.");
        return;
    }
    
    setIsLoading(true);

    try {
      // Use the AuthContext login (which calls the service and sets localStorage)
      const data = await login(email.trim().toLowerCase(), password);
      
      if (data.token) { 
        setMessage("Login successful! Redirecting...");
        setTimeout(() => {
            navigate('/menu'); 
        }, 1500); 
      } else {
        setMessage(`Login failed: ${data.message || 'Invalid credentials.'}`);
      }
    } catch (error) {
      setMessage("Network error: Could not connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex justify-center items-center pt-28 pb-20"> 
            <div className="bg-white w-full max-w-sm rounded-xl shadow-2xl p-8 transform transition-all duration-300">
                <h2 className="text-3xl font-extrabold text-center mb-1 text-gray-800">Welcome Back</h2>
                <p className="text-sm text-center text-gray-500 mb-8">Sign in to your account</p>
                
                {message && (
                    <div className={`p-3 mb-4 rounded-lg text-sm font-medium ${message.startsWith('❌') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {message}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}> 
                    <div className="relative">
                        <label className="text-sm font-medium text-gray-600 mb-1 block">Email Address</label>
                        <Mail size={18} className="absolute left-3 top-9 text-gray-400" />
                        <input
                            type="email"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required
                        />
                    </div>

                    <div className="relative">
                        <label className="text-sm font-medium text-gray-600 mb-1 block">Password</label>
                        <Lock size={18} className="absolute left-3 top-9 text-gray-400" />
                        <input
                            type="password"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full text-white py-3 rounded-lg text-lg font-semibold transition ${isLoading ? 'bg-gray-400' : 'bg-orange-600 hover:bg-orange-700'}`}
                        disabled={isLoading} 
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-500 mt-6">
                    Don't have an account? <Link to="/register" className="text-orange-600 font-bold">Sign up</Link>
                </p>
            </div>
        </div>
        <Footer />
    </div>
  );
}