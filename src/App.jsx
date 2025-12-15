import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

const MenuPage = () => <div className="p-8">Menu Page (Protected)</div>;
const HistoryPage = () => <div className="p-8"> History Page (Protected)</div>;

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/menu" element={
                <ProtectedRoute>
                    <MenuPage />
                </ProtectedRoute>
            } />
            <Route path="/history" element={
                <ProtectedRoute>
                    <HistoryPage />
                </ProtectedRoute>
            } />
        </Routes>
      </div>
    </Router>
  );
}
