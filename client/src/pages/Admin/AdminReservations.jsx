import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import axios from 'axios';
import { 
    FaCalendarAlt, FaUsers, FaClock, FaSearch, 
    FaMapMarkerAlt, FaStickyNote, FaTrash, FaEye, FaTimes 
} from 'react-icons/fa';

export default function AdminReservations() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBooking, setSelectedBooking] = useState(null);

    const fetchReservations = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/reservations');
            setReservations(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error fetching reservations:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const deleteReservation = async (id) => {
        if (!window.confirm("Delete this record permanently?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/reservations/${id}`);
            setReservations(prev => prev.filter(res => res._id !== id));
            setSelectedBooking(null);
        } catch (error) {
            alert("Delete failed.");
        }
    };

    const filteredReservations = reservations.filter(res => {
        const search = searchTerm.toLowerCase();
        return (
            (res.name?.toLowerCase() || "").includes(search) ||
            (res.tableNumber?.toString() || "").includes(search)
        );
    });

    if (loading) return (
        <div className="min-h-screen bg-[#FFF7ED] flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-orange-500"></div>
        </div>
    );

    return (
        <>
            <AdminNavbar />
            <div className="p-6 bg-[#FFF7ED] min-h-screen font-sans">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
                                Reservation <span className="text-orange-500">Manager</span>
                            </h1>
                            <p className="text-gray-500 text-sm font-medium italic">Viewing all guest table assignments</p>
                        </div>

                        <div className="relative w-full md:w-80">
                            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search Name or Table..."
                                className="w-full bg-white border border-orange-100 rounded-xl py-3 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-orange-500/20 outline-none text-sm font-medium transition-all"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="bg-white rounded-3xl shadow-xl shadow-orange-900/5 border border-orange-50 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50/50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Guest Details</th>
                                        <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Table Info</th>
                                        <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Schedule</th>
                                        <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Live Status</th>
                                        <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">View/Remove</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredReservations.map((res) => (
                                        <tr key={res._id} className="hover:bg-orange-50/20 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center text-sm font-black shadow-md">
                                                        {res.name ? res.name.charAt(0).toUpperCase() : '?'}
                                                    </div>
                                                    <div>
                                                        <p className="text-base font-bold text-gray-900 leading-tight">{res.name || "Unknown Guest"}</p>
                                                        <p className="text-[11px] text-gray-400 font-medium lowercase italic">{res.email || "no email provided"}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-6">
                                                <div className="flex flex-col gap-1">
                                                    <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded-lg font-black text-[11px] w-fit border border-orange-100">
                                                        Table {res.tableNumber || 'N/A'}
                                                    </span>
                                                    <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase">
                                                        <FaMapMarkerAlt className="text-orange-300"/> {res.floor || 'Ground'}
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-6">
                                                <div className="flex flex-col gap-1 text-xs font-bold text-gray-700">
                                                    <div className="flex items-center gap-2">
                                                        <FaCalendarAlt className="text-orange-500" size={10} /> {res.date}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase">
                                                        <FaClock size={10} /> {res.time}
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-6 text-center">
                                                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border
                                                    ${res.status === 'Confirmed' ? 'bg-green-50 text-green-600 border-green-100' : 
                                                      res.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-100' : 
                                                      'bg-orange-50 text-orange-600 border-orange-100'}`}>
                                                    {res.status || 'Pending'}
                                                </span>
                                            </td>

                                            <td className="px-8 py-6">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => setSelectedBooking(res)} className="p-2 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all"><FaEye size={14}/></button>
                                                    <button onClick={() => deleteReservation(res._id)} className="p-2 bg-gray-50 text-gray-400 rounded-lg hover:bg-red-600 hover:text-white transition-all"><FaTrash size={14}/></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* DETAIL MODAL - NO ACTION BUTTONS */}
            {selectedBooking && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden border border-orange-50 animate-in zoom-in duration-200">
                        <div className="bg-gray-900 p-6 text-white flex justify-between items-center">
                            <h2 className="text-sm font-black uppercase tracking-widest">Reservation Details</h2>
                            <button onClick={() => setSelectedBooking(null)} className="text-gray-400 hover:text-white"><FaTimes /></button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="border-b border-gray-100 pb-4">
                                <p className="text-xl font-black text-gray-900">{selectedBooking.name}</p>
                                <p className="text-orange-500 font-bold text-xs lowercase italic">{selectedBooking.email}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-2xl">
                                    <p className="text-[9px] font-black uppercase text-gray-400 mb-1">Guests</p>
                                    <p className="text-sm font-bold flex items-center gap-2"><FaUsers className="text-orange-500"/> {selectedBooking.guests} People</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-2xl">
                                    <p className="text-[9px] font-black uppercase text-gray-400 mb-1">Table</p>
                                    <p className="text-sm font-bold flex items-center gap-2"><FaMapMarkerAlt className="text-orange-400"/> {selectedBooking.tableNumber}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-[10px] font-black uppercase text-gray-400 mb-2 flex items-center gap-2">
                                    <FaStickyNote className="text-blue-500"/> Guest Notes
                                </p>
                                <div className="bg-blue-50/50 p-5 rounded-2xl text-blue-900 text-sm font-medium italic leading-relaxed border border-blue-100/50">
                                    {selectedBooking.specialNotes || "No special requests provided."}
                                </div>
                            </div>

                            <div className={`py-3 rounded-xl text-center text-xs font-black uppercase tracking-widest border
                                ${selectedBooking.status === 'Confirmed' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                                Current Status: {selectedBooking.status}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}