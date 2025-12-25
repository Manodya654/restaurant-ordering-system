import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";
import { Toaster } from 'react-hot-toast';
// Added 'Clock' to the imports below
import { Package, LogOut, Settings, ChevronRight, ShoppingBag, CreditCard, Clock } from 'lucide-react';

export default function Profile() {

  // Add this state at the top with your others
const [reservations, setReservations] = useState([]);

// Add this to your useEffect fetch logic
const fetchReservations = async () => {
  try {
    const token = localStorage.getItem('token');
    // Assuming your backend route handles filtering by email/user
    const res = await fetch(`http://localhost:5000/api/reservations/my-bookings?email=${user.email}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      setReservations(data);
    }
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }
};

// Function to handle User Action (Confirm/Cancel)
const handleUpdateBooking = async (id, newStatus) => {
  if (newStatus === 'Cancelled' && !window.confirm("Are you sure you want to cancel?")) return;
  try {
    const res = await fetch(`http://localhost:5000/api/reservations/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    if (res.ok) {
      setReservations(prev => prev.map(r => r._id === id ? { ...r, status: newStatus } : r));
    }
  } catch (err) {
    alert("Update failed");
  }
};

  const { user, logout, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If auth is finished and there is no user, go to login
    if (!authLoading && !user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      if (!user) return;
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/orders/my-orders', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate, authLoading]);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      ready: 'bg-green-100 text-green-700',
      completed: 'bg-blue-100 text-blue-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-700';
  };

  // 1. Fix the "Blank Screen": Show a loader instead of 'null' if auth is still working
  if (authLoading || (!user && loading)) {
    return (
      <div className="min-h-screen bg-[#FFF7ED] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div>
      </div>
    );
  }

  // 2. Final safety check
  if (!user) return null;

  const totalSpent = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

  return (
    <div className="min-h-screen bg-[#FFF7ED]">
      <Navbar />
      <Toaster position="top-right" />
      
      <div className="max-w-6xl mx-auto pt-32 pb-20 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: User Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-orange-900/5 border border-orange-100 overflow-hidden">
              <div className="bg-orange-500 h-28 w-full relative">
                 <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              </div>
              <div className="px-8 pb-8">
                <div className="relative -top-14 flex flex-col items-center">
                  <img 
                    src={user.profileImage || `https://ui-avatars.com/api/?name=${user.name}&size=128&background=f97316&color=fff&bold=true`} 
                    alt="Profile"
                    className="w-28 h-28 rounded-3xl border-8 border-white shadow-xl mb-4 bg-white object-cover"
                  />
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">{user.name}</h2>
                  <p className="text-gray-400 text-sm font-medium mb-5 lowercase italic">{user.email}</p>
                  <span className="px-4 py-1.5 bg-orange-100 text-orange-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-orange-200">
                    {user.role || 'Customer'}
                  </span>
                </div>

                <div className="space-y-3 mt-2">
                  <button onClick={() => navigate('/settings')} className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-orange-50 rounded-2xl transition-all group">
                    <div className="flex items-center gap-3 text-gray-700 font-bold group-hover:text-orange-600 transition-colors">
                      <Settings size={20}/> <span>Account Settings</span>
                    </div>
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-orange-400"/>
                  </button>
                  <button onClick={logout} className="w-full flex items-center gap-3 p-4 text-red-500 hover:bg-red-50 rounded-2xl transition-all font-black uppercase tracking-widest text-[11px]">
                    <LogOut size={18}/> <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-[2rem] shadow-lg shadow-orange-900/5 border border-orange-50">
                <div className="bg-orange-100 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                  <ShoppingBag className="text-orange-600" size={20}/>
                </div>
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Total Orders</p>
                <p className="text-2xl font-black text-gray-900">{orders.length}</p>
              </div>
              <div className="bg-white p-6 rounded-[2rem] shadow-lg shadow-orange-900/5 border border-orange-50">
                <div className="bg-green-100 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
                  <CreditCard className="text-green-600" size={20}/>
                </div>
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Total Spent</p>
                <p className="text-xl font-black text-gray-900">Rs. {totalSpent.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Reservations Section */}
<div className="mb-12">
  <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-6">
    My <span className="text-orange-500">Table Bookings</span>
  </h3>
  
  {reservations.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {reservations.map((booking) => (
        <div key={booking._id} className="bg-white p-6 rounded-[2rem] border border-orange-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-black text-lg text-gray-900">Table {booking.tableNumber}</p>
              <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">{booking.floor}</p>
            </div>
            <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border 
              ${booking.status === 'Confirmed' ? 'bg-green-50 text-green-600 border-green-100' : 
                booking.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
              {booking.status}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-xs font-bold text-gray-500 mb-6">
            <div className="flex items-center gap-1"><Calendar size={14}/> {booking.date}</div>
            <div className="flex items-center gap-1"><Clock size={14}/> {booking.time}</div>
          </div>

          {/* User Actions: Only show if not already Cancelled */}
          {booking.status !== 'Cancelled' && (
            <div className="flex gap-2">
              {booking.status !== 'Confirmed' && (
                <button 
                  onClick={() => handleUpdateBooking(booking._id, 'Confirmed')}
                  className="flex-1 py-2 bg-green-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-700 transition-all"
                >
                  Confirm Arrival
                </button>
              )}
              <button 
                onClick={() => handleUpdateBooking(booking._id, 'Cancelled')}
                className="flex-1 py-2 bg-gray-50 text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  ) : (
    <div className="p-8 bg-orange-50/50 border-2 border-dashed border-orange-100 rounded-[2rem] text-center">
      <p className="text-sm font-bold text-orange-400">No active table reservations</p>
    </div>
  )}
</div>

          {/* Right Column: Recent Activity */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
                Recent <span className="text-orange-500">Activity</span>
              </h3>
              <button 
                onClick={() => navigate('/history')} 
                className="bg-white px-5 py-2.5 rounded-xl border border-orange-100 text-orange-600 font-black text-xs uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all shadow-sm"
              >
                View All
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center py-20 bg-white rounded-[2.5rem] border border-orange-50">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-4">
                {orders.slice(0, 4).map((order) => (
                  <div key={order._id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-orange-50 hover:shadow-xl hover:shadow-orange-900/5 transition-all group">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                      <div className="flex items-center gap-5">
                        <div className="bg-orange-50 p-4 rounded-2xl group-hover:bg-orange-500 transition-all duration-300">
                          <Package className="text-orange-600 group-hover:text-white transition-colors" size={28}/>
                        </div>
                        <div>
                          <p className="font-black text-gray-900 text-lg">Order #{order._id.slice(-6).toUpperCase()}</p>
                          <p className="text-xs text-gray-400 font-bold flex items-center gap-2 uppercase">
                            <Clock size={14} className="text-orange-400"/> {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-8 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-50">
                        <div className="text-right">
                          <p className="font-black text-gray-900 text-lg">Rs. {order.totalAmount?.toLocaleString()}</p>
                          <span className={`text-[9px] px-3 py-1 rounded-lg font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <button 
                          onClick={() => navigate(`/order-status/${order._id}`)}
                          className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-2xl hover:bg-orange-500 hover:text-white transition-all shadow-sm"
                        >
                          <ChevronRight size={24}/>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[2.5rem] p-16 text-center border-2 border-dashed border-orange-100 shadow-inner">
                <div className="bg-orange-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                   <ShoppingBag size={40} className="text-orange-200"/>
                </div>
                <h4 className="text-xl font-black text-gray-900 uppercase">No orders yet</h4>
                <p className="text-gray-400 font-medium mt-2">Hungry? Your next favorite meal is just a click away.</p>
                <button 
                   onClick={() => navigate('/menu')}
                   className="mt-8 bg-orange-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-lg shadow-orange-500/30 hover:scale-105 transition-transform"
                >
                  Browse Menu
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