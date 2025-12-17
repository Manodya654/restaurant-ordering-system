import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Home from "./pages/Home";
import Order from "./pages/Orders.jsx";
import Checkout from "./pages/Checkout.jsx";
import AtCounter from "./pages/AtCounter.jsx";
import Profile from "./pages/Profile.jsx";

import AdminLogin from "./pages/Admin/AdminLogin";
import AdminMenu from "./pages/Admin/AdminMenu";
import AdminCategories from "./pages/Admin/AdminCategories";
import AdminOrders from "./pages/Admin/AdminOrders.jsx";

import ProtectedAdminRoute from "./components/ProtectedAdminRoute.jsx";
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/atcounter" element={<AtCounter />} />
        <Route path="/profile" element={<Profile />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/menu"
          element={
            <ProtectedAdminRoute>
              <AdminMenu />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <ProtectedAdminRoute>
              <AdminCategories />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedAdminRoute>
              <AdminOrders />
            </ProtectedAdminRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster position="bottom-right" reverseOrder={false} />
    </Router>
  );
}

export default App;
