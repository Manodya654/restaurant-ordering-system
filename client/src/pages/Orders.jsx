import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { FaClock, FaCheckCircle, FaUtensils, FaStore, FaReceipt } from "react-icons/fa";
import Footer from '../components/Footer'

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    fetchMyOrders(); // Initial fetch

    // This "Polls" the server every 5 seconds to see if Admin changed the status
    const interval = setInterval(() => {
        fetchMyOrders();
    }, 5000); 

    return () => clearInterval(interval); // Stops polling when user leaves the page
    }, []);

    const fetchMyOrders = async () => {
        try {
            // Assumes you have a way to pass the auth token (e.g., from localStorage)
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

    const getStatusStep = (status) => {
        const steps = ["Pending", "Confirmed", "Preparing", "Ready for Pickup", "Completed"];
        return steps.indexOf(status);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <Navbar />
            
            <main className="max-w-4xl mx-auto px-6 pt-32">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
                    <span className="text-gray-500 text-sm">{orders.length} orders found</span>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-[2rem] p-20 text-center shadow-sm border border-dashed border-gray-300">
                        <FaReceipt className="mx-auto text-gray-200 size-16 mb-4" />
                        <p className="text-gray-500">You haven't placed any orders yet.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {orders.map((order) => (
                            <div key={order._id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                                
                                {/* Order Header */}
                                <div className="p-6 border-b border-gray-50 flex flex-wrap justify-between items-center gap-4 bg-orange-50/30">
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Pickup Code</p>
                                        <h2 className="text-2xl font-black text-orange-600">{order.pickupCode}</h2>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400 font-medium">Status</p>
                                        <span className="inline-block px-4 py-1 rounded-full bg-orange-500 text-white text-xs font-bold shadow-sm shadow-orange-200">
                                            {order.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Order Content */}
                                <div className="p-8">
                                    {/* PROGRESS TIMELINE */}
                                    <div className="relative flex justify-between mb-10 max-w-2xl mx-auto">
                                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
                                        {["Confirmed", "Preparing", "Ready for Pickup"].map((step, index) => {
                                            const currentStep = getStatusStep(order.status);
                                            const isDone = currentStep >= getStatusStep(step);
                                            return (
                                                <div key={step} className="relative z-10 flex flex-col items-center">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-md transition-colors duration-500 ${isDone ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                                                        {step === "Confirmed" && <FaCheckCircle size={14}/>}
                                                        {step === "Preparing" && <FaUtensils size={14}/>}
                                                        {step === "Ready for Pickup" && <FaStore size={14}/>}
                                                    </div>
                                                    <span className={`text-[10px] mt-2 font-bold uppercase tracking-tighter ${isDone ? 'text-orange-600' : 'text-gray-400'}`}>
                                                        {step}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Order Items List */}
                                    <div className="space-y-3 mb-6">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between text-sm">
                                                <span className="text-gray-600 font-medium">
                                                    <span className="text-orange-500 font-bold">{item.quantity}x</span> {item.name}
                                                </span>
                                                <span className="text-gray-400">LKR {item.subtotal}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-6 border-t border-gray-100 flex justify-between items-end">
                                        <div className="flex items-center gap-2 text-gray-400 text-xs">
                                            <FaClock />
                                            <span>Placed: {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400 font-medium">Total Paid</p>
                                            <p className="text-xl font-black text-gray-800">LKR {order.items.reduce((acc, i) => acc + i.subtotal, 0)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Order;