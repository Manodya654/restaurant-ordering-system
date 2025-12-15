import { Link, useNavigate } from "react-router-dom"; 
import { Lock, Mail } from "lucide-react";
import { useState,useContext } from "react"; 
import { AuthContext } from "../context/AuthContext";


export default function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

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
      
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData), 
      });

      const data = await response.json();
      
      if (response.ok) { 
        setMessage("✅ Login successful! Redirecting...");
        
      login(data.token);  
        
        
        setTimeout(() => {
            navigate('/menu'); 
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
    <div className="flex justify-center items-center py-20">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Sign in to your account to continue
        </p>
        
        
        {message && (
            <div className={`p-3 rounded-lg text-sm font-medium ${message.startsWith('❌') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message}
            </div>
          )}

        <form className="space-y-4" onSubmit={handleSubmit}> 
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <label className="text-sm font-medium sr-only">E-mail Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <label className="text-sm font-medium sr-only">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full text-white py-2 rounded-lg font-medium transition ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}`}
            disabled={isLoading} 
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-orange-500 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}