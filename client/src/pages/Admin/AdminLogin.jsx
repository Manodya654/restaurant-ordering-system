import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Use the global login function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // This calls authService.login which handles the fetch and localStorage
    const data = await login(email.trim().toLowerCase(), password);

    if (!data.token) {
      alert(data.message || "Invalid credentials");
      return;
    }

    if (data.user.role !== "admin") {
      alert("Access denied. Admin only.");
      return;
    }

    // Redirect to admin menu
    navigate("/admin/menu");
  } catch (err) {
    alert("Server error");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <form onSubmit={submitHandler} className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6 text-orange-600">Admin Login</h2>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg mb-6"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;