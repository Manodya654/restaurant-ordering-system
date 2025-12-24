import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import toast, { Toaster } from 'react-hot-toast';

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const res = await fetch('http://localhost:5000/api/orders/myorders', {
                headers: { 
                    'Authorization': `Bearer ${token}` 
                }
            });

            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    fetchOrders();
}, [user]);

  return (
    <div>
      <Navbar />
      <Toaster position="top-right" />
      <div className="max-w-4xl mx-auto mt-28 p-6">
        {/* User Info */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 flex items-center space-x-6">
          <img 
            src={`https://ui-avatars.com/api/?name=${user.name}&size=128&background=f97316&color=fff`} 
            className="w-24 h-24 rounded-full border-4 border-orange-100"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
            <button onClick={logout} className="text-red-500 text-sm font-semibold mt-2 underline">Logout</button>
          </div>
        </div>

        {/* Orders */}
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <div className="space-y-4">
            {orders.length > 0 ? orders.map(order => (
              <div key={order._id} className="bg-white p-4 rounded-lg shadow border-l-4 border-orange-500 flex flex-col md:flex-row justify-between">
                <div>
                  <p className="font-bold">Order #{order.orderNumber || order._id.slice(-6)}</p>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                  <p className="text-xs text-gray-400 mt-1">Payment Method: {order.paymentMethod}</p>
                </div>
                <div className="text-right mt-2 md:mt-0">
                  <p className="font-bold text-orange-600">LKR {order.items.reduce((acc, i) => acc + i.price * i.quantity, 0).toLocaleString()}</p>
                  <p className="text-sm">Status: <span className="font-semibold">{order.status}</span></p>
                  <p className="text-sm">Payment: <span className="font-semibold">{order.paymentStatus}</span></p>
                  <div className="text-xs text-gray-500 truncate mt-1">
                    Items: {order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}
                  </div>
                </div>
              </div>
            )) : <p>No orders placed yet.</p>}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
