import { Link, useNavigate } from "react-router-dom"; 
import { useState } from "react"; 

export default function Register() {
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  
  const [message, setMessage] = useState(''); 
  
  const [isLoading, setIsLoading] = useState(false); 

  
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); 
    
    
    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }
    
    
    if (!fullName || !email || !phoneNumber || password.length < 6) {
        setMessage("❌ Please fill out all fields correctly, and ensure the password is at least 6 characters.");
        return;
    }

    setIsLoading(true);

    const userData = {
      fullName,
      email,
      phoneNumber,
      password,
    };

    try {
      
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), 
      });

      const data = await response.json();

      if (response.ok) { 
        setMessage("✅ Registration successful! Redirecting to Sign In...");
        
        
        setTimeout(() => {
            navigate('/login'); 
        }, 1500); 

      } else {
        
        setMessage(`❌ Registration failed: ${data.message || 'Unknown error occurred.'}`);
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
          Create Account
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Join Tasty Bites and start ordering today
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}> 
          
          
          {message && (
            <div className={`p-3 rounded-lg text-sm font-medium ${message.startsWith('❌') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message}
            </div>
          )}

          
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          
          <div>
            <label className="text-sm font-medium">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          
          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              placeholder="07XXXXXXXX"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={phoneNumber}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, '');
                setPhoneNumber(numericValue);
              }}
              required
            />
          </div>

          
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="At least 6 characters"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          
          <div>
            <label className="text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full text-white py-2 rounded-lg font-medium transition ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'}`}
            disabled={isLoading} 
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}