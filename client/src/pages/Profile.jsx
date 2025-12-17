import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchMyOrders = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/orders/myorders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) setOrders(data);
    };

    if (user) fetchMyOrders();
  }, [user]);

  if (!user) return <div className="text-center mt-20">Please log in to view your profile.</div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-28 p-6">
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

        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
        <div className="space-y-4">
          {orders.length > 0 ? orders.map(order => (
            <div key={order._id} className="bg-white p-4 rounded-lg shadow border-l-4 border-orange-500 flex justify-between">
              <div>
                <p className="font-bold">Order #{order._id.slice(-6)}</p>
                <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-orange-600">LKR {order.totalAmount}</p>
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full uppercase">{order.status}</span>
              </div>
            </div>
          )) : <p>No orders placed yet.</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
}