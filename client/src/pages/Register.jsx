// client/src/pages/Register.jsx
import { Link, useNavigate } from "react-router-dom"; 
import { Lock, Mail, User, Phone } from "lucide-react"; // Import Phone icon
import { useState, useContext } from "react"; 
// import { AuthContext } from "../context/AuthContext"; 
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";

export default function Register() {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(""); // NEW State for Phone Number
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(''); 
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();
    // const { login } = useContext(AuthContext); 

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        // 1. Client-side validation: Check all required fields
        if (!name || !email || !phoneNumber || !password) {
            setMessage("Please fill in all required fields.");
            return;
        }
        
        setIsLoading(true);

        const registerData = {
            name,
            email,
            phoneNumber, // Include in payload
            password,
        };

        try {
            
            // 2. API Call to the backend 
            const response = await fetch('http://localhost:3000/users/register', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData), 
            });

            const data = await response.json();
            
            // 3. Handle response
            if (response.ok) { 
                setMessage("✅ Registration successful! You can now log in.");
                
                setTimeout(() => {
                    navigate('/login'); 
                }, 2000); 

            } else {
                
                setMessage(`❌ Registration failed: ${data.message || 'An error occurred during sign up.'}`);
            }
        } catch (error) {
            console.error('Network Error:', error);
            setMessage("❌ Network error: Could not connect to the server (Is the backend running?).");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            
            <div className="flex-grow flex justify-center items-center pt-28 pb-20"> 
                
                {/* Registration Form Card: Changed max-w-sm to max-w-md */}
                <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-3xl">
                    <h2 className="text-3xl font-extrabold text-center mb-1 text-gray-800">
                        Create Account
                    </h2>
                    <p className="text-sm text-center text-gray-500 mb-8">
                        Join us today and enjoy exclusive offers
                    </p>
                    
                    {message && (
                        <div className={`p-3 mb-4 rounded-lg text-sm font-medium ${message.startsWith('❌') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                            {message}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}> 
                        
                        {/* Name Field */}
                        <div className="relative">
                            <label className="text-sm font-medium text-gray-600 mb-1 block">Your Name</label>
                            <User
                                size={18}
                                className="absolute left-3 top-9 transform text-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150"
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required
                            />
                        </div>
                        
                        {/* Email Field */}
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
                        
                        {/* NEW: Phone Number Field */}
                        <div className="relative">
                            <label className="text-sm font-medium text-gray-600 mb-1 block">Phone Number</label>
                            <Phone
                                size={18}
                                className="absolute left-3 top-9 transform text-gray-400"
                            />
                            <input
                                type="tel"
                                placeholder="e.g., 077 123 4567"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150"
                                value={phoneNumber} 
                                onChange={(e) => setPhoneNumber(e.target.value)} 
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="relative">
                            <label className="text-sm font-medium text-gray-600 mb-1 block">Password</label>
                            <Lock
                                size={18}
                                className="absolute left-3 top-9 transform text-gray-400"
                            />
                            <input
                                type="password"
                                placeholder="Create your password"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-150"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`w-full text-white py-3 rounded-lg text-lg font-bold transition shadow-md hover:shadow-lg transform active:scale-95 duration-150
                                ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'}`}
                            disabled={isLoading} 
                        >
                            {isLoading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="text-sm text-center text-gray-500 mt-6">
                        Already have an account?{" "}
                        <Link to="/login" className="text-orange-600 font-bold hover:text-orange-700 transition">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}