import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaClock, FaCheckCircle, FaUtensils, FaStore, FaReceipt, FaArrowLeft } from "react-icons/fa";

export default function OrderStatus() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchMyOrders = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/orders/myorders", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyOrders();
        
        // Auto-refresh every 10 seconds to catch Admin status changes
        const interval = setInterval(fetchMyOrders, 10000);
        return () => clearInterval(interval);
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending": return "bg-yellow-100 text-yellow-700";
            case "Preparing": return "bg-blue-100 text-blue-700";
            case "Ready for Pickup": return "bg-green-500 text-white animate-bounce";
            case "Completed": return "bg-gray-100 text-gray-500";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center">Loading your orders...</div>;

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <Navbar />
            
            <main className="max-w-3xl mx-auto px-6 pt-32">
                <div className="flex items-center gap-4 mb-8">
                    <button onClick={() => navigate('/menu')} className="p-3 bg-white rounded-full shadow-sm">
                        <FaArrowLeft />
                    </button>
                    <h1 className="text-3xl font-black text-gray-800">Track Orders</h1>
                </div>

                {orders.length === 0 ? (
                    <div className="text-center bg-white p-12 rounded-[2rem] shadow-sm">
                        <FaReceipt className="mx-auto text-gray-200 text-6xl mb-4" />
                        <p className="text-gray-500">No active orders found.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white rounded-[2rem] shadow-md border border-gray-100 overflow-hidden">
                                
                                {/* Header with Pickup Code */}
                                <div className="p-6 bg-orange-50 flex justify-between items-center border-b border-orange-100">
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-orange-400 tracking-widest">Show this at counter</p>
                                        <h2 className="text-3xl font-black text-orange-600">{order.pickupCode}</h2>
                                    </div>
                                    <span className={`px-4 py-2 rounded-xl text-xs font-bold uppercase ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>

                                {/* Order Progress Visualization */}
                                <div className="p-8">
                                    <div className="flex justify-between items-center relative mb-8">
                                        <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 -z-0"></div>
                                        
                                        {[
                                            { label: "Pending", icon: <FaClock /> },
                                            { label: "Preparing", icon: <FaUtensils /> },
                                            { label: "Ready", icon: <FaStore /> }
                                        ].map((step, index) => (
                                            <div key={index} className="z-10 flex flex-col items-center gap-2">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-lg 
                                                    ${order.status === step.label || (order.status === "Ready for Pickup" && step.label === "Ready") 
                                                        ? 'bg-orange-500 text-white scale-125 transition-transform' 
                                                        : 'bg-gray-200 text-gray-400'}`}>
                                                    {step.icon}
                                                </div>
                                                <span className="text-[10px] font-bold text-gray-400 uppercase">{step.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Order Details */}
                                    <div className="space-y-3 pt-4 border-t border-gray-50">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between text-sm">
                                                <span className="text-gray-600 font-medium">
                                                    <span className="text-orange-500 font-bold">{item.quantity}x</span> {item.name}
                                                </span>
                                                <span className="text-gray-400 font-bold">LKR {item.price * item.quantity}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
                                        <div>
                                            <p className="text-[10px] text-gray-400 uppercase font-bold">Payment Status</p>
                                            <p className="text-sm font-bold text-red-500">Unpaid - Pay at Counter</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-gray-400 uppercase font-bold">Total Amount</p>
                                            <p className="text-xl font-black text-gray-800">LKR {order.totalAmount || order.items.reduce((a,b)=>a+(b.price*b.quantity),0)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}