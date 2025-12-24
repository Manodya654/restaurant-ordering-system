import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Home from "./pages/Home";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Profile from "./pages/Profile.jsx";
import OrderStatus from "./pages/OrderStatus";
import MyOrders from "./pages/MyOrders";
import About from "./pages/About.jsx";
import Reservation from "./pages/Reservation.jsx";

import AdminLogin from "./pages/Admin/AdminLogin";
import AdminMenu from "./pages/Admin/AdminMenu";
import AdminCategories from "./pages/Admin/AdminCategories";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminReviews from "./pages/Admin/AdminReviews";
import AdminCustomers from "./pages/Admin/AdminCustomers.jsx";
import AdminSettings from "./pages/Admin/AdminSettings.jsx";
import AdminReservations from "./pages/Admin/AdminReservations.jsx";

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
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order-status/:orderId" element={<OrderStatus />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/about" element={<About />} />
        <Route path="/reservation" element={<Reservation />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

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

        <Route
          path="/admin/customers"
          element={
            <ProtectedAdminRoute>
              <AdminCustomers />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/reviews"
          element={
            <ProtectedAdminRoute>
              <AdminReviews />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/reservations"
          element={
            <ProtectedAdminRoute>
              <AdminReservations />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedAdminRoute>
              <AdminSettings />
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
