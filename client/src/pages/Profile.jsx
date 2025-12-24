import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import { Toaster } from 'react-hot-toast';
import { Package, LogOut, Settings, ChevronRight, ShoppingBag, CreditCard } from 'lucide-react';

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
        navigate('/login');
        return;
    }

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/orders/my-orders', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          // We take only the latest 3 for a "Recent" view on the profile
          setOrders(data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      ready: 'bg-green-100 text-green-700',
      completed: 'bg-blue-100 text-blue-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  if (!user) return null;

  const totalSpent = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto pt-32 pb-12 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: User Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-orange-500 h-24 w-full"></div>
              <div className="px-6 pb-6">
                <div className="relative -top-12 flex flex-col items-center">
                  <img 
                    src={user.profileImage || `https://ui-avatars.com/api/?name=${user.name}&size=128&background=f97316&color=fff`} 
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md mb-4 bg-white"
                  />
                  <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                  <p className="text-gray-500 text-sm mb-4">{user.email}</p>
                  <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider">
                    {user.role || 'Customer'}
                  </span>
                </div>

                <div className="space-y-2 mt-2">
                  <button onClick={() => navigate('/settings')} className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition text-gray-700">
                    <div className="flex items-center gap-3"><Settings size={18}/> <span>Account Settings</span></div>
                    <ChevronRight size={16} className="text-gray-400"/>
                  </button>
                  <button onClick={logout} className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-xl transition font-medium">
                    <LogOut size={18}/> <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <ShoppingBag className="text-orange-500 mb-2" size={20}/>
                <p className="text-xs text-gray-500 uppercase font-bold">Orders</p>
                <p className="text-xl font-bold">{orders.length}</p>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <CreditCard className="text-green-500 mb-2" size={20}/>
                <p className="text-xs text-gray-500 uppercase font-bold">Spent</p>
                <p className="text-xl font-bold">LKR {totalSpent.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Recent Activity */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Recent Activity</h3>
              <button 
                onClick={() => navigate('/history')} 
                className="text-orange-600 font-semibold text-sm hover:underline"
              >
                View All Orders
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-4">
                {orders.slice(0, 3).map((order) => (
                  <div key={order._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition group">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-orange-50 p-3 rounded-xl group-hover:bg-orange-100 transition">
                          <Package className="text-orange-600" size={24}/>
                        </div>
                        <div>
                          <p className="font-bold text-gray-800">Order #{order._id.slice(-8)}</p>
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock size={12}/> {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="text-right">
                          <p className="font-bold text-gray-900">LKR {order.totalAmount?.toLocaleString()}</p>
                          <span className={`text-[10px] px-2 py-1 rounded-md font-bold uppercase ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <button 
                          onClick={() => navigate(`/order-status/${order._id}`)}
                          className="p-2 bg-gray-50 rounded-full hover:bg-orange-500 hover:text-white transition"
                        >
                          <ChevronRight size={20}/>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-200">
                <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4"/>
                <p className="text-gray-500">You haven't placed any orders yet.</p>
                <button 
                   onClick={() => navigate('/menu')}
                   className="mt-4 text-orange-600 font-bold hover:text-orange-700"
                >
                  Explore the menu →
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}