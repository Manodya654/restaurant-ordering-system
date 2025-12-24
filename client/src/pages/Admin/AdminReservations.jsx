import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { FaCalendarAlt, FaUser, FaUsers, FaClock, FaCheck, FaTimes, FaSearch } from 'react-icons/fa';

export default function AdminReservations() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Mock fetch - Replace with your actual API endpoint
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                // const response = await fetch('http://localhost:5000/api/reservations');
                // const data = await response.json();
                
                // Static sample data for visualization
                const sampleData = [
                    { id: 1, name: "Amila Perera", email: "amila@example.com", date: "2024-05-20", time: "19:00", guests: 4, status: "Pending" },
                    { id: 2, name: "Sarah Silva", email: "sarah@example.com", date: "2024-05-21", time: "20:30", guests: 2, status: "Confirmed" },
                    { id: 3, name: "John Doe", email: "john@example.com", date: "2024-05-22", time: "18:00", guests: 6, status: "Cancelled" },
                ];
                setReservations(sampleData);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReservations();
    }, []);

    const updateStatus = (id, newStatus) => {
        setReservations(prev => prev.map(res => 
            res.id === id ? { ...res, status: newStatus } : res
        ));
        // Add actual API call here to update backend
    };

    const filteredReservations = reservations.filter(res => 
        res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <>
      <AdminNavbar />
        <div className="p-6 bg-[#FFF7ED] min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900">Reservations</h1>
                        <p className="text-gray-500 font-medium">Manage incoming table bookings</p>
                    </div>

                    {/* Search Bar Pill */}
                    <div className="relative group">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Search guest name..."
                            className="bg-white border-none rounded-full py-3 pl-12 pr-6 shadow-sm focus:ring-2 focus:ring-orange-500/20 outline-none w-full md:w-80 text-sm font-medium"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Main Content Pill */}
                <div className="bg-white rounded-[1.8rem] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-white border-b border-gray-100">
    <tr>
        <th className="px-10 py-5 text-[13px] font-semibold text-gray-400 tracking-wide">
            GUEST
        </th>
        <th className="px-8 py-5 text-[13px] font-semibold text-gray-400 tracking-wide">
            DATE & TIME
        </th>
        <th className="px-8 py-5 text-[13px] font-semibold text-gray-400 tracking-wide">
            PARTY SIZE
        </th>
        <th className="px-8 py-5 text-[13px] font-semibold text-gray-400 tracking-wide">
            STATUS
        </th>
        <th className="px-10 py-5 text-[13px] font-semibold text-gray-400 tracking-wide">
            ACTIONS
        </th>
    </tr>
</thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredReservations.map((res) => (
                                    <tr key={res.id} className="hover:bg-orange-50/30 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
                                                    {res.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{res.name}</p>
                                                    <p className="text-xs text-gray-400">{res.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                                    <FaCalendarAlt className="text-gray-300" size={12} />
                                                    {res.date}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                                                    <FaClock className="text-gray-300" size={12} />
                                                    {res.time}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 font-black text-gray-700">
                                                <FaUsers size={16} className="text-orange-500" />
                                                {res.guests} <span className="text-xs text-gray-400 font-medium ml-1">People</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider 
                                                ${res.status === 'Confirmed' ? 'bg-green-100 text-green-600' : 
                                                  res.status === 'Cancelled' ? 'bg-red-100 text-red-600' : 
                                                  'bg-orange-100 text-orange-600'}`}>
                                                {res.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => updateStatus(res.id, 'Confirmed')}
                                                    className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-600 hover:text-white transition-all shadow-sm shadow-green-100"
                                                    title="Confirm"
                                                >
                                                    <FaCheck size={14} />
                                                </button>
                                                <button 
                                                    onClick={() => updateStatus(res.id, 'Cancelled')}
                                                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm shadow-red-100"
                                                    title="Cancel"
                                                >
                                                    <FaTimes size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredReservations.length === 0 && (
                            <div className="py-20 text-center">
                                <p className="text-gray-400 font-medium">No reservations found matching your criteria.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </>
    );
}