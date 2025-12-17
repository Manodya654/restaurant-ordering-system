import { useState, useEffect, useRef } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { FaSearch, FaClock } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const STATUS_OPTIONS = ['Pending', 'Confirmed', 'Preparing', 'Ready for Pickup', 'Completed', 'Cancelled'];

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All Orders');
    
    // Use a Ref to keep track of previous count without triggering re-renders
    const prevOrderCount = useRef(0);
    const notificationSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/orders');
            const data = await response.json();
            
            // Notification logic: Play sound only if current data count is higher than previous
            if (data.length > prevOrderCount.current && prevOrderCount.current !== 0) {
                notificationSound.play().catch(e => console.log("Audio play blocked by browser"));
                toast.success("New Order Received!", { 
                    icon: '🔔',
                    duration: 4000,
                    position: 'top-right'
                });
            }
            
            // Update the ref and the state
            prevOrderCount.current = data.length;
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        fetchOrders(); // Initial fetch

        // LIVE UPDATE: Run fetchOrders every 10 seconds
        const interval = setInterval(() => {
            fetchOrders();
        }, 10000); 

        return () => clearInterval(interval); // Cleanup on leave
    }, []);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (response.ok) {
                toast.success(`Status updated to ${newStatus}`);
                fetchOrders(); 
            }
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const getStatusPill = (status) => {
        const colors = {
            'Pending': 'bg-yellow-100 text-yellow-700 border-yellow-200',
            'Preparing': 'bg-blue-100 text-blue-700 border-blue-200',
            'Ready for Pickup': 'bg-purple-100 text-purple-700 border-purple-200',
            'Completed': 'bg-green-100 text-green-700 border-green-200',
            'Cancelled': 'bg-red-100 text-red-700 border-red-200',
            'Confirmed': 'bg-orange-100 text-orange-700 border-orange-200'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${colors[status] || 'bg-gray-100'}`}>
                {status}
            </span>
        );
    };

    const filteredOrders = orders
        .filter(order => 
            (order.pickupCode && order.pickupCode.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (order.user?.name && order.user.name.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .filter(order => activeFilter === 'All Orders' ? true : order.status === activeFilter);

    return (
        <div className="bg-orange-50 min-h-screen">
            <AdminNavbar />
            <Toaster /> {/* Required for the toast notifications to show */}
            
            <main className="p-10 max-w-7xl mx-auto">
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-semibold text-gray-800 mb-2">Live Orders</h2>
                        <p className="text-gray-500">Auto-refreshing every 10 seconds...</p>
                    </div>
                    {/* Visual indicator of live status */}
                    <div className="flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 px-4 py-2 rounded-full border border-green-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                        SYSTEM LIVE
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                    <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                        <div className="relative flex-grow max-w-lg">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search by Pickup Code or Customer Name..." 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none transition"
                            />
                        </div>

                        <div className="flex space-x-2 overflow-x-auto pb-1">
                            {['All Orders', 'Pending', 'Preparing', 'Ready for Pickup', 'Completed'].map(filter => (
                                <button 
                                    key={filter} 
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-5 py-2 rounded-lg text-sm font-bold transition-all border ${
                                        activeFilter === filter 
                                        ? 'bg-[#1e293b] text-white border-[#1e293b]' 
                                        : 'bg-gray-100 text-gray-600 border-transparent hover:bg-gray-200'
                                    }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {['Code', 'Customer', 'Items', 'Total', 'Pickup Time', 'Status', 'Actions'].map(h => (
                                        <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-100">
                                {filteredOrders.map(order => (
                                    <tr key={order._id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 font-black text-orange-600">{order.pickupCode}</td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-bold text-gray-800">{order.user?.name || 'Guest'}</div>
                                            <div className="text-xs text-gray-400 uppercase tracking-tighter font-bold">{order.paymentMethod}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-xs text-gray-600">
                                                {order.items.length} items
                                                <div className="text-[10px] text-gray-400 truncate w-32">
                                                    {order.items.map(i => i.name).join(', ')}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-700">
                                            LKR {order.items.reduce((acc, i) => acc + (i.price * i.quantity), 0).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-xs text-gray-500">
                                            <span className="flex items-center gap-1">
                                                <FaClock className="text-blue-400" />
                                                {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{getStatusPill(order.status)}</td>
                                        <td className="px-6 py-4">
                                            <select 
                                                value={order.status}
                                                onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                                className="text-xs border rounded-lg p-2 outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 font-semibold"
                                            >
                                                {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredOrders.length === 0 && (
                            <div className="text-center py-20 text-gray-400 italic">No orders found in this category.</div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminOrders;