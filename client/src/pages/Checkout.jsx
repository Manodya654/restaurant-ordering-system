import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import { FaShoppingBag, FaCreditCard, FaStore, FaChevronRight, FaTrash, FaArrowLeft, FaQuestionCircle } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Checkout() {
    const { cartItems, clearCart, removeFromCart } = useCart(); 
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false); // Modal State
    
    const [orderData, setOrderData] = useState({
        paymentMethod: null, 
        specialInstructions: "",
    });

    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

const handlePlaceOrder = async () => {
    try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        if (!userInfo || !userInfo.token) {
            toast.error("Please login again");
            navigate("/login");
            return;
        }

        const orderData = {
            items: cartItems.map(item => ({
                menuItem: item._id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                subtotal: item.price * item.quantity
            })),
            paymentMethod: "At Counter",
            specialInstructions: orderData.specialInstructions
        };

        const response = await fetch("http://localhost:5000/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            },
            body: JSON.stringify(orderData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Order failed");
        }

        toast.success(`Order placed! Pickup Code: ${data.pickupCode}`);
        clearCart();
        navigate("/profile/orders");

    } catch (error) {
        toast.error(error.message);
        console.error(error);
    }
};


    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <Navbar />
            
            {/* CONFIRMATION MODAL */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaQuestionCircle className="text-orange-500 text-3xl" />
                        </div>
                        <h3 className="text-xl font-bold text-center text-gray-800">Confirm Order?</h3>
                        <p className="text-gray-500 text-center mt-2">Are you sure you want to place this pickup order for <span className="font-bold text-gray-800">LKR {totalPrice}</span>?</p>
                        
                        <div className="grid grid-cols-2 gap-3 mt-8">
                            <button 
                                onClick={() => setShowConfirm(false)}
                                className="py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handlePlaceOrder}
                                className="py-3 rounded-xl font-bold bg-orange-500 text-white hover:bg-orange-600 transition shadow-lg shadow-orange-200"
                            >
                                Yes, Place it!
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <main className="max-w-5xl mx-auto px-6 pt-32">
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] shadow-sm border border-gray-100">
                        <div className="bg-orange-100 p-6 rounded-full mb-6">
                            <FaShoppingBag className="text-orange-500 text-5xl" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
                        <Link to="/menu" className="mt-8 flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition">
                            <FaArrowLeft /> Back to Menu
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <FaShoppingBag className="text-orange-500" /> Review Your Order
                                </h2>
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <div key={item._id} className="flex items-center justify-between pb-4 border-b border-gray-50">
                                            <div className="flex items-center gap-4">
                                                <img src={item.image} className="w-16 h-16 rounded-2xl object-cover" alt={item.name} />
                                                <div>
                                                    <h4 className="font-bold text-gray-800">{item.name}</h4>
                                                    <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <p className="font-bold text-gray-700">LKR {(item.price * item.quantity).toLocaleString()}</p>
                                                <button onClick={() => removeFromCart(item._id)} className="text-gray-300 hover:text-red-500 transition-colors p-2"><FaTrash size={14} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Special Instructions</label>
                                    <textarea 
                                        placeholder="Add a note..."
                                        className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none h-24"
                                        onChange={(e) => setOrderData({...orderData, specialInstructions: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                                <div className="space-y-3">
                                    <button 
                                        onClick={() => setOrderData({...orderData, paymentMethod: "At Counter"})}
                                        className={`w-full p-4 rounded-2xl flex items-center gap-4 border-2 transition ${orderData.paymentMethod === "At Counter" ? 'border-orange-500 bg-orange-50' : 'border-gray-100'}`}
                                    >
                                        <FaStore className={orderData.paymentMethod === "At Counter" ? 'text-orange-500' : 'text-gray-400'} />
                                        <div className="text-left">
                                            <p className="font-bold text-sm text-gray-800">Pay at Counter</p>
                                            <p className="text-[10px] text-gray-400 uppercase">Cash or Card on Pickup</p>
                                        </div>
                                    </button>
                                    
                                    {/* <button 
                                        onClick={() => setOrderData({...orderData, paymentMethod: "Online"})}
                                        className={`w-full p-4 rounded-2xl flex items-center gap-4 border-2 transition ${orderData.paymentMethod === "Online" ? 'border-orange-500 bg-orange-50/50' : 'border-gray-100 hover:bg-gray-50'}`}
                                    >
                                        <FaCreditCard className={orderData.paymentMethod === "Online" ? 'text-orange-500' : 'text-gray-400'} />
                                        <div className="text-left">
                                            <p className="font-bold text-sm text-gray-800">Online Payment</p>
                                            <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Credit / Debit Card</p>
                                        </div>
                                    </button> */}
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-100 space-y-2">
                                    <div className="flex justify-between text-xl font-black text-gray-800 pt-2">
                                        <span>Total</span>
                                        <span className="text-orange-600">LKR {totalPrice.toLocaleString()}</span>
                                    </div>
                                </div>

                                <button 
                                    disabled={loading || !orderData.paymentMethod}
                                    onClick={() => setShowConfirm(true)} // Trigger modal
                                    className={`w-full mt-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition shadow-lg ${
                                        orderData.paymentMethod ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-gray-200 text-gray-400'
                                    }`}
                                >
                                    {loading ? "Processing..." : "Place Pickup Order"} 
                                    {!loading && <FaChevronRight size={12}/>}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}